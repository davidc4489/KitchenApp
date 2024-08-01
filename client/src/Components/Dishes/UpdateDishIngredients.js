import React, { useState, useEffect } from 'react';
import './UpdateDishIngredients.css';
import Select from '../Input/Select';
import Fetch from '../Input/Fetch.jsx';
import Input from '../Input/Input.jsx'

function UpdateDishIngredients(props) {

    const dishToUpdate = props.DishToUpdate
    const [ingredientId, setIngredientId] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState('');
    const [ingredientUnity, setIngredientUnity] = useState('גרם');
    const [dataStock, setDataStock] = useState([])
    const [dataDishIngredients, setDataDishIngredients] = useState([])
    const [updateValues, setUpdateValues] = useState({
        id: dishToUpdate?.id || '',
        שם: dishToUpdate?.שם || '',
        ingredients: []
    });

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock`, setDataStock)
    }, [])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/dishes/dishIngredients/${dishToUpdate.id}`, setDataDishIngredients)
    }, [])

    function addIngredient(event) {
        event.preventDefault()

        let updateIngredient = []
        updateIngredient = updateValues.ingredients?.filter(item => (item.id == ingredientId))
        if(updateIngredient.length>0){
            for (let i = 0; i<updateValues.ingredients.length; i++){
                if(updateValues.ingredients[i].id === ingredientId){
                    updateValues.ingredients[i].amount = ingredientAmount
                    updateValues.ingredients[i].unity = ingredientUnity
                }
            }
        }
        else {
            const newIngredient = {
                id: ingredientId,
                amount: ingredientAmount > 0 ? ingredientAmount : 0,
                unity: ingredientUnity,
            };
            setUpdateValues(prevState => ({
                ...prevState,
                ingredients: [...prevState.ingredients, newIngredient]
            }));
        }
            console.log(updateIngredient)
            setIngredientAmount('');
            setIngredientId('');
    }

    function removeIngredient(event, itemId) {
        event.preventDefault()

        setUpdateValues(prevState => ({
            ...prevState,
            ingredients: prevState.ingredients.filter(ingredient => String(ingredient.id) !== String(itemId))
        }))
    }

    function checkForTypeConflict() {
        console.log("Update Values:", updateValues);
        
        // Récupère les IDs des ingrédients de updateValues et dataDishIngredients
        const ingredientIdsUpdateValues = updateValues.ingredients.map(ingredient => parseInt(ingredient.id));
        const ingredientIdsDishIngredients = dataDishIngredients.map(ingredient => parseInt(ingredient.idIngredient));
    
        // Combine les IDs des ingrédients pour vérifier tous les ingrédients utilisés
        const allIngredientIds = new Set([...ingredientIdsUpdateValues, ...ingredientIdsDishIngredients]);
    
        // Filtre les produits dans dataStock pour ne garder que ceux qui sont dans allIngredientIds
        const products = dataStock.filter(product => allIngredientIds.has(parseInt(product.id)));
    
        console.log("Products:", products);
    
        // Vérifie s'il y a des produits de type 'חלבי' et 'בשרי'
        const hasLait = products.some(product => product.כשרות === 'חלבי');
        const hasViande = products.some(product => product.כשרות === 'בשרי');
    
        if (hasLait && hasViande) {
            console.log("Conflit de types");
            return true;
        }
        return false;
    }

    function saveData(event) {
        event.preventDefault()
        if (checkForTypeConflict()) {
            alert("מנה אינה יכולה להכיל רכיבים חלביים ובשריים ביחד")
            return;
        }
        if (updateValues.id) {
            fetch(`http://localhost:4000/api/dishes/${updateValues.id}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),  
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } 
        props.OpenClose();
    }

    return (
        <div className='UpdateDish-box'>
            <form className='UpdateDish-Box-Content'>
                <div className='UpdateDish-Title'>עריכת רכיבים</div>
                <div className='UpdateDish-InputBox'>
                    <label className='AddMenu-Label'>: רכיבים</label>
                    <Select id='category' value={updateValues.ingredients.id} onChange={setIngredientId} title='בחר רכיב' optionValue='בחר רכיב' optionsToMap={dataStock} valueToMap={"id"} valueToDisplay="שם"/>
                    <label className='AddMenu-Label' htmlFor="ingredientAmount">: כמות</label> 
                    <Input type='number' className={"form-control w-25 p-1 mx-auto p-2"} value={ingredientAmount} onChange={setIngredientAmount} minValue={0}/>
                    <label className='AddMenu-Label'>: יחידה</label>
                    <Select id='amountType' value={ingredientUnity} onChange={setIngredientUnity} title='בחר יחידה' optionValue='בחר יחידה' optionsToMap={["גרם", 'ק"ג', "יחידה", "ליטר", 'מ"ל']} valueToMap={""} valueToDisplay=""/>
                    <br></br>
                    <button className="add-ingredient-button btn btn-primary w-75" onClick={addIngredient}>הוספת \ שינוי רכיב</button>
                    <br></br>
                    <table id="ingredientsTable">
                        <tbody>
                            {dataDishIngredients.map((ingredient, idx) => (
                                <tr key={idx}>
                                    {dataStock.map((item) => (
                                        ((item.id == ingredient.idIngredient) && (ingredient.כמות>0) &&
                                        ((updateValues.ingredients?.filter(value => (value.id == ingredient.idIngredient))).length == 0)
                                        )&&
                                    <div className='ingredientItem'>
                                        <td className='ingredientItem-Name'>{item.שם} :</td>
                                        <td className='ingredientItem-Amount'>{ingredient.כמות}</td>
                                        <td className='ingredientItem-Unity'>{ingredient.יחידה}</td>
                                    </div>))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table id="ingredientsTable">
                        <tbody>
                            {updateValues.ingredients.map((ingredient, idx) => (
                                <tr key={idx}>
                                    {dataStock.map((item) => (
                                        ((item.id == ingredient.id) && (ingredient.amount>0))&&
                                    <div className='ingredientItem'>
                                        <td className='ingredientItem-Name'>{item.שם} :</td>
                                        <td className='ingredientItem-Amount'>{ingredient.amount}</td>
                                        <td className='ingredientItem-Unity'>{ingredient.unity}</td>
                                        <button className="btn btn-outline-danger btn-sm" onClick={(e) => removeIngredient(e, item.id)}>ביטול</button>
                                    </div>))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <div className='UpdateDish-Buttons'>
                        <button className='UpdateDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                        <input type='submit' value={'שמירה'} className='UpdateDish-Button btn btn-outline-primary' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default UpdateDishIngredients;