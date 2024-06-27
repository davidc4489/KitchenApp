import React, { useEffect, useState, } from 'react'
import './UpdateCategory.css'

function UpdateCategory(props) {

    const categoryToUpdate = props.CategoryToUpdate
    const [formMode, setFormMode] = useState('edit');
   
    const [updateValues, setUpdateValues] = useState({
        שם: categoryToUpdate.שם,
        קטגוריה: categoryToUpdate.קטגוריה,
        קטגוריה_קודמת: categoryToUpdate.קטגוריה
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
        setFormMode('edit')
    }

    function saveData() {
        setFormMode('edit')
            fetch(`http://localhost:4000/api/categories/${categoryToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteCategory() {
        props.OpenClose()
        setFormMode('delete')
        fetch(`http://localhost:4000/api/categories/${categoryToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='UpdateCategory-box'>
            <form className='UpdateCategory-Box-Content'>
                <div className='UpdateCategory-Title'>עריכת קטגוריה</div>
                <div className='UpdateCategory-InputBox'>
                    <label className='UpdateCategory-Label'>שם : </label>
                    <input className='UpdateCategoryPage-Input' type="text" name='שם' value={updateValues.שם} onChange={updateData} required={formMode === 'edit'} pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateCategory-Label'>קטגוריה :</label>
                    <select name='קטגוריה' value={updateValues.קטגוריה} onChange={updateData} required={formMode === 'edit'} pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר קטגוריה</option>
                             <option value='קטגוריות מוצרים'>קטגוריות מוצרים</option>
                             <option value='קטגוריות מנות'>קטגוריות מנות</option>
                             <option value='קטגוריות תפריטים'>קטגוריות תפריטים</option>
                    </select> 
                <div></div>
                    <div className='UpdateCategory-Buttons'>
                        <button className='UpdateCategory-Button' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateCategory-Button' onClick={deleteCategory}>מחיקת קטגוריה</button>
                        <input type='submit' value={'שמירה'} className='UpdateCategory-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateCategory