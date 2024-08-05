import React, { useEffect, useState, } from 'react'
import './UpdateDish.css'
import UpdateDishIngredients from './UpdateDishIngredients.js';
import Input from '../../Tools/Input.jsx';
import Select from '../../Tools/Select.jsx';
import DeleteVerification from '../../Tools/DeleteVerification.jsx';
import Fetch from '../../Tools/Fetch.jsx';

function UpdateDish(props) {

    const dishToUpdate = props.DishToUpdate
    const token = props.Token

    const [formMode, setFormMode] = useState('edit');
    const [name, setName] = useState(dishToUpdate.שם,);
    const [category, setCategory] = useState(dishToUpdate.קטגוריה);

    const [dataCategories, setDataCategories] = useState([])
    const [dataDishIngredients, setDataDishIngredients] = useState([])
    const [showUpdateDishIngredientsDialog, setShowUpdateDishIngredientsDialog] = useState(false)
    const [dataStock, setDataStock] = useState([])
    const [deleteDishBox, setDeleteDishBox] = useState(false)

    useEffect(() => {
        if(token) {
            Fetch(`http://localhost:4000/api/stock`, setDataStock, token)
        }
    }, [])

    useEffect(() => {
        if(token) {
            Fetch(`http://localhost:4000/api/dishes/categories`, setDataCategories, token)
        }
    }, [])

    useEffect(() => {
        if(token) {
            Fetch(`http://localhost:4000/api/dishes/dishIngredients/${dishToUpdate.id}`, setDataDishIngredients, token)
        }
    }, [dataDishIngredients])

    function openUpdateDishIngredientsDialog (){
        setShowUpdateDishIngredientsDialog(!showUpdateDishIngredientsDialog)
    }

    function updateDishIngredients(){
        setShowUpdateDishIngredientsDialog(true)
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
                ...(token && { 'Authorization': `Bearer ${token}` })
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
                ...(token && { 'Authorization': `Bearer ${token}` })
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
                    <button className='UpdateDish-Ingredients-Buttons btn btn-outline-primary w-50' onClick={handleClick}>עריכת רכיבים</button>
                    <div className='UpdateDish-Buttons'>
                        <button className='UpdateDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateDish-Button btn btn-danger' onClick={deleteDishDisplay}>מחיקת מנה</button>
                        <input type='submit' value={'שמירה'} className='UpdateDish-Button btn btn-outline-primary' onClick={saveData}></input>
                    </div>
                </div>
            </form>
            {showUpdateDishIngredientsDialog ? <UpdateDishIngredients OpenClose={openUpdateDishIngredientsDialog} DishToUpdate={dishToUpdate} Token={token}/> : null} 
            {deleteDishBox ? <DeleteVerification deleteFunction={deleteDish} OpenClose={props.OpenClose} CloseBox={setDeleteDishBox} Text={"? למחוק את המנה"}/> : null}
        </>
    )
}

export default UpdateDish