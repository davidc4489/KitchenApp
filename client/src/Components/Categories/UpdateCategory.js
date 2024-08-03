import React, { useEffect, useState, } from 'react'
import './UpdateCategory.css'
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';
import DeleteVerification from '../../Tools/DeleteVerification.jsx';

function UpdateCategory(props) {

    const categoryToUpdate = props.CategoryToUpdate

    const [name, setName] = useState(categoryToUpdate.שם);
    const [category, setCategory] = useState(categoryToUpdate.קטגוריה);
    const [previewCategory, setPreviewCategory] = useState(categoryToUpdate.קטגוריה);
    const mainCategories = [{id: 1, שם: "קטגוריות מוצרים"}, {id: 2, שם: "קטגוריות מנות"}, {id: 3, שם: "קטגוריות תפריטים"}]

    const [deleteCategoryBox, setDeleteCategoryBox] = useState(false)

    function saveData() {
        const updateValues = {
            שם: name,
            קטגוריה: category,
            קטגוריה_קודמת: previewCategory
        };
        fetch(`http://localhost:4000/api/categories/${categoryToUpdate.originalId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()
    })}

    function deleteCategoryDisplay(event) {
        event.preventDefault();
        setDeleteCategoryBox(true);
    }

    function deleteCategory() {
        props.OpenClose()
        console.log('categoryToUpdate', categoryToUpdate)
        fetch(`http://localhost:4000/api/categories/${categoryToUpdate.originalId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <>
            <form className='UpdateCategory-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
                <div className='UpdateCategory-Title'>עריכת קטגוריה</div>
                <div className='UpdateCategory-InputBox'>
                    <label className='UpdateCategory-Label'>שם : </label>
                    <Input type="text" name='שם' value={name} onChange={setName}/> 
                    <label className='UpdateCategory-Label'>קטגוריה :</label>
                    <Select id='category' value={category} onChange={setCategory} title='בחר קטגוריה' optionValue='' optionsToMap={mainCategories} valueToMap="שם"/>
                </div>
                <div className='UpdateCategory-Buttons'>
                    <button className='AddDish-Button btn btn-outline-danger' onClick={deleteCategoryDisplay}>מחיקת קטגוריה</button>
                    <input type='submit' value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
                    <button className='AddDish-Button btn btn-outline-secondary' onClick={props.OpenClose}>ביטול</button>
                </div>
            </form>
            {deleteCategoryBox ? <DeleteVerification deleteFunction={deleteCategory} OpenClose={props.OpenClose} CloseBox={setDeleteCategoryBox} Text={"? למחוק את קטגוריה"}/> : null}
        </>
    )
}

export default UpdateCategory