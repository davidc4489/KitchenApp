import React, { useState, useEffect } from 'react';
import './UpdateMenuDishes.css';
import Select from '../Input/Select';

function UpdateMenuDishes(props) {

    const menuToUpdate = props.MenuToUpdate
    const [dishId, setDishId] = useState('');
    const [dataDishes, setDataDishes] = useState([])
    const [dataMenuDishes, setDataMenuDishes] = useState([])
    const [updateValues, setUpdateValues] = useState({
        id: menuToUpdate?.id || '',
        שם: menuToUpdate?.שם || '',
        dishes: []
    });

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes`)
        .then(response => response.json())
        .then(data => setDataDishes(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus/menuDishes/${menuToUpdate.id}`)
        .then(response => response.json())
        .then(data => setDataMenuDishes(data))
    }, [])

    function addDish(event) {
        event.preventDefault()

        const newDish = {
            id: dishId
        };

        const isDishAlreadyAdded = updateValues.dishes.some(dish => dish.id === newDish.id);
        if(!isDishAlreadyAdded){
            setUpdateValues(prevState => ({
                ...prevState,
                dishes: [...prevState.dishes, newDish]
        }))}
    }

    function removeDish(event, itemId) {
        event.preventDefault()

        setUpdateValues(prevState => ({
            ...prevState,
            dishes: prevState.dishes.filter(dish => String(dish.id) !== String(itemId))
        }))
    }

    function removeDishFromData(event, itemId) {
        event.preventDefault()
        const filteredData = dataMenuDishes.filter(item => String(item.idDish) !== String(itemId));
        setDataMenuDishes(filteredData)
    }

    function saveData(event) {
        event.preventDefault()
        const newDishes = dataMenuDishes
            .filter(item => !updateValues.dishes.some(dish => dish.id === item.idDish))
            .map(item => ({ id: parseInt(item.idDish) }));

        let updatedFirstObject = {
            ...updateValues,
            dishes: [...updateValues.dishes, ...newDishes.map(dish => ({ id: dish.id.toString() }))]
        };

        if (updatedFirstObject.id) {
            fetch(`http://localhost:4000/api/menus/${updatedFirstObject.id}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFirstObject),  
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
            <form className='UpdateMenuDishes-Box-Content'>
                <div className='UpdateDish-Title'>עריכת מנות</div>
                <div className='UpdateDish-InputBox'>
                    <label className='AddMenu-Label'>: מנות</label>
                    <Select onChange={setDishId} value={dishId} required={true} optionValue="" title="בחר מנה" optionsToMap={dataDishes} valueToMap="id" valueToDisplay="שם"/> 
                    <br></br>
                    <button className="add-ingredient-button btn btn-primary w-75" onClick={addDish}>הוספת מנה</button>
                    <br></br>
                    <table id="ingredientsTable" className="table">
                        <tbody className="table-group-divider">
                            {dataMenuDishes?.map((dish, idx) => (
                                <tr key={idx} className="table-secondary">
                                    {dataDishes.map((item) => (
                                        ((item.id == dish.idDish)  &&
                                        ((updateValues.dishes?.filter(value => (value.id == dish.idDish))).length == 0)
                                        )&&
                                    <div className='ingredientItem'>
                                        <td className='ingredientItem-Name'>{item.שם} :</td>
                                        <td className='ingredientItem-Name'>{item.קטגוריה}</td>
                                        <button className="btn btn-outline-danger btn-sm" onClick={(e) => removeDishFromData(e, item.id)}>ביטול</button>
                                    </div>))}
                                </tr>
                            ))}
                            {updateValues.dishes.map((dish, idx) => (
                                <tr key={idx} className="table-secondary">
                                    {dataDishes.map((item) => (
                                        ((item.id == dish.id))&&
                                    <div className='ingredientItem'>
                                        <td className='ingredientItem-Name'>{item.שם} :</td>
                                        <td className='ingredientItem-Name'>{item.קטגוריה}</td>
                                        <button className="btn btn-outline-danger btn-sm" onClick={(e) => removeDish(e, item.id)}>ביטול</button>
                                    </div>))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <div className='UpdateMenuDishes-Buttons'>
                        <button className='UpdateDish-Button btn btn-danger' onClick={props.OpenClose}>ביטול</button>
                        <input type='submit' value={'שמירה'} className='UpdateDish-Button btn btn-outline-primary' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default UpdateMenuDishes;