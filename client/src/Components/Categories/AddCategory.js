import React, { useEffect, useState, } from 'react'
import './AddCategory.css'
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';

function AddCategory(props) {

    const token = props.Token
   
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const mainCategories = [{id: 1, שם: "קטגוריות מוצרים"}, {id: 2, שם: "קטגוריות מנות"}, {id: 3, שם: "קטגוריות תפריטים"}]

    function saveData() {
        const addedValues = {
            שם: name,
            קטגוריה: category
        };
        fetch('http://localhost:4000/api/categories/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(addedValues),
        })
            .then(response => {response.json()
    })}

    return (
        <form className='AddCategory-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
            <div className='AddCategory-Title'>הוספת קטגוריה</div>
            <div className='AddCategory-InputBox'>
                <label className='AddCategory-Label'>שם :</label>
                <Input type="text" value={name} onChange={setName}/>
                <label className='AddCategory-Label'>קטגוריה :</label>
                <Select id='category' value={category} onChange={setCategory} title='בחר קטגוריה' optionValue='' optionsToMap={mainCategories} valueToMap="שם"/>
            </div>
                <div className='AddCategory-Buttons'>
                    <button className='AddDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                    <input type="submit" value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
                </div>
        </form>
    )
}

export default AddCategory