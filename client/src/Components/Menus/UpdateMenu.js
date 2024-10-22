import React, { useEffect, useState, } from 'react'
import './UpdateMenu.css'
import UpdateMenuDishes from './UpdateMenuDishes.js';
import Input from '../../Tools/Input.jsx';
import Select from '../../Tools/Select.jsx';
import DeleteVerification from '../../Tools/DeleteVerification.jsx';
import Fetch from '../../Tools/Fetch.jsx';

function UpdateMenu(props) {

    const menuToUpdate = props.MenuToUpdate
    const token = props.Token

    const [formMode, setFormMode] = useState('edit');
    const [name, setName] = useState(menuToUpdate.שם,);
    const [category, setCategory] = useState(menuToUpdate.קטגוריה);

    const [dataCategories, setDataCategories] = useState([])
    const [dataMenuDishes, setDataMenuDishes] = useState([])
    const [showUpdateMenuDishesDialog, setShowUpdateMenuDishesDialog] = useState(false)
    const [dataDishes, setDataDishes] = useState([])
    const [deleteMenuBox, setDeleteMenuBox] = useState(false)

    useEffect(() => {
        Fetch(`http://localhost:4000/api/dishes`, setDataDishes, token)
    }, [])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/menus/categories`, setDataCategories, token)
    }, [dataCategories])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/menus/menuDishes/${menuToUpdate.id}`, setDataMenuDishes, token)
    }, [dataMenuDishes])

    function openUpdateMenuDishesDialog (){
        setShowUpdateMenuDishesDialog(!showUpdateMenuDishesDialog)
    }

    function updateMenuDishes(){
        setShowUpdateMenuDishesDialog(true)
        // setDishToUpdate(item)
    }

    function saveData() {
        setFormMode('edit')
        const updateValues = {
            שם: name,
            קטגוריה: category,
        };
        fetch(`http://localhost:4000/api/menus/${menuToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()})
    }

    function deleteMenuDisplay(event) {
        event.preventDefault();
        setDeleteMenuBox(true);
    }

    function deleteMenu() {
        setDeleteMenuBox(false)
        setFormMode('delete')
        fetch(`http://localhost:4000/api/menus/${menuToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(menuToUpdate),
        })
            .then(response => {response.json()})
    }

    const handleClick = (event) => {
        event.preventDefault()
        updateMenuDishes()
    }

    return (
        <>
            <form className='UpdateMenu-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
                <div className='UpdateMenu-Title'>עריכת תפריט</div>
                <div className='UpdateMenu-InputBox'>
                    <label className='UpdateMenu-Label'>שם : </label>
                    <Input type="text" value={name} onChange={(setName)} required={formMode === 'edit'}/>
                    <label className='UpdateMenu-Label'>קטגוריה :</label>
                    <Select id='category' value={category} onChange={setCategory} title='בחר קטגוריה' optionValue='בחר קטגוריה' optionsToMap={dataCategories} valueToMap="שם"/>
                    <div className='ingredients-title'>: מנות</div>
                    <div className='add-ingredient-input'>
                        <div className='ingredient-labels'>
                        </div>
                        {Array.from(dataMenuDishes).map((dish) => (
                            dataDishes.map((product) => (
                                product.id == dish.idDish
                             &&
                            <div className='ingredientsList'>
                                <div>{product.קטגוריה}</div>
                                <div>{product.שם}</div>
                            </div>
                        ))))}
                    </div>
                        <button className='UpdateDish-Button btn btn-outline-primary w-50' onClick={handleClick}>עריכת מנות</button>
                    <div className='UpdateMenu-Buttons'>
                        <button className='UpdateMenu-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateMenu-Button btn btn-danger' onClick={deleteMenuDisplay}>מחיקת תפריט</button>
                        <input type='submit' value={'שמירה'} className='UpdateMenu-Button btn btn-outline-primary' onClick={saveData}></input>
                    </div>
                </div>
            </form>
            {showUpdateMenuDishesDialog ? <UpdateMenuDishes OpenClose={openUpdateMenuDishesDialog} MenuToUpdate={menuToUpdate} Token={token}/> : null} 
            {deleteMenuBox ? <DeleteVerification deleteFunction={deleteMenu} OpenClose={props.OpenClose} CloseBox={setDeleteMenuBox} Text={"? למחוק את התפריט"}/> : null}
        </>
    )
}

export default UpdateMenu