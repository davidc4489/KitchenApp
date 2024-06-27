import React, { useEffect, useState, } from 'react'
import './AddCategory.css'

function AddCategory(props) {
   
    const [addValues, setAddValues] = useState({
        שם: '',
        קטגוריה: ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
            fetch('http://localhost:4000/api/categories/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddCategory-box'>
            <form className='AddCategory-Box-Content'>
                <div className='AddCategory-Title'>הוספת קטגוריה</div>
                <div className='AddCategory-InputBox'>
                    <label className='AddCategory-Label'>שם :</label>
                    <input className='AddCategoryPage-Input' type="text" name='שם' value={addValues.שם} onChange={updateData} required />
                    <label className='AddCategory-Label'>קטגוריה :</label>
                    <select name='קטגוריה' value={addValues.קטגוריה} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר קטגוריה</option>
                             <option value='קטגוריות מוצרים'>קטגוריות מוצרים</option>
                             <option value='קטגוריות מנות'>קטגוריות מנות</option>
                             <option value='קטגוריות תפריטים'>קטגוריות תפריטים</option>
                    </select>
                </div>
                    <div className='AddCategory-Buttons'>
                        <button className='AddCategory-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddCategory-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddCategory