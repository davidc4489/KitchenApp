import React, { useEffect, useState, } from 'react'
import './UpdateDish.css'
import UpdateDishIngredients from './UpdateDishIngredients.js';
import Input from '../Input/Input.jsx';
import Select from '../Input/Select.jsx';
import DeleteVerification from '../Input/DeleteVerification.jsx';
import Fetch from '../Input/Fetch.jsx';

function UpdateDish(props) {

    const dishToUpdate = props.DishToUpdate
    const [formMode, setFormMode] = useState('edit');
    const [name, setName] = useState(dishToUpdate.שם,);
    const [category, setCategory] = useState(dishToUpdate.קטגוריה);

    const [dataCategories, setDataCategories] = useState([])
    const [dataDishIngredients, setDataDishIngredients] = useState([])
    const [showUpdateDishIngredientsDialog, setShowUpdateDishIngredientsDialog] = useState(false)
    const [dataStock, setDataStock] = useState([])
    const [deleteDishBox, setDeleteDishBox] = useState(false)

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock`, setDataStock)
    }, [])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/dishes/categories`, setDataCategories)
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes/dishIngredients/${dishToUpdate.id}`)
        .then(response => response.json())
        .then(data => setDataDishIngredients(data))
    }, [dataDishIngredients])

    function openUpdateDishIngredientsDialog (){
        setShowUpdateDishIngredientsDialog(!showUpdateDishIngredientsDialog)
    }

    function updateDishIngredients(){
        setShowUpdateDishIngredientsDialog(true)
        // setDishToUpdate(item)
    }

    function saveData() {
        setFormMode('edit')
        const updateValues = {
            שם: name,
            קטגוריה: category,
        };
        fetch(`http://localhost:4000/api/dishes/${dishToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()})
    }

    function deleteDishDisplay(event) {
        event.preventDefault();
        setDeleteDishBox(true);
    }

    function deleteDish() {
        setDeleteDishBox(false)
        setFormMode('delete')
        fetch(`http://localhost:4000/api/dishes/${dishToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishToUpdate),
        })
            .then(response => {response.json()})
    }

    const handleClick = (event) => {
      event.preventDefault()
      updateDishIngredients()
    };

    return (
        <>
            <form className='UpdateDish-Box-Content'>
                <div className='UpdateDish-Title'>עריכת מנה</div>
                <div className='UpdateDish-InputBox'>
                    <label className='UpdateDish-Label'>שם : </label>
                    <Input type="text" value={name} onChange={(setName)} required={formMode === 'edit'}/>
                    <label className='AddMenu-Label'>קטגוריה :</label>
                    <Select id='category' value={category} onChange={setCategory} title='בחר קטגוריה' optionValue='בחר קטגוריה' optionsToMap={dataCategories} valueToMap="שם"/>
                <div className='ingredients-title'>: רכיבים</div>
                    <div className='add-ingredient-input'>
                        <div className='ingredient-labels'>
                            <label className="ingredientUnity-label">יחידה</label>
                            <label className="ingredientAmount-label">כמות</label>
                            <label className='ingredientName-label'>שם</label>
                        </div>
                        {Array.from(dataDishIngredients).map((ingredient) => (
                            dataStock.map((product) => (
                                product.id == ingredient.idIngredient && ingredient.כמות !== 0
                             &&
                            <div className='ingredientsList'>
                                <div>{ingredient.יחידה}</div>
                                <div>{ingredient.כמות}</div>
                                <div>{product.שם}</div>
                            </div>
                        ))))}
                    </div>
                    {/* <div className='UpdateDish-Buttons'> */}
                        <button className='UpdateDish-Ingredients-Buttons btn btn-outline-primary w-50' onClick={handleClick}>עריכת רכיבים</button>
                    {/* </div> */}
                    <div className='UpdateDish-Buttons'>
                        <button className='UpdateDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateDish-Button btn btn-danger' onClick={deleteDishDisplay}>מחיקת מנה</button>
                        <input type='submit' value={'שמירה'} className='UpdateDish-Button btn btn-outline-primary' onClick={saveData}></input>
                    </div>
                </div>
            </form>
            {showUpdateDishIngredientsDialog ? <UpdateDishIngredients OpenClose={openUpdateDishIngredientsDialog} DishToUpdate={dishToUpdate}/> : null} 
            {deleteDishBox ? <DeleteVerification deleteFunction={deleteDish} OpenClose={props.OpenClose} CloseBox={setDeleteDishBox} Text={"? למחוק את המנה"}/> : null}
        </>
    )
}

export default UpdateDish