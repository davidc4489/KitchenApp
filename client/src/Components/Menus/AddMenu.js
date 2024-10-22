import React, { useEffect, useState, } from 'react'
import './AddMenu.css'
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';
import Fetch from '../../Tools/Fetch';

function AddMenu(props) {

    const token = props.Token

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [dataCategories, setDataCategories] = useState([])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock/categories`, setDataCategories, token)
    }, [dataCategories])

    function saveData() {
        const addedValues = {
            שם: name,
            קטגוריה: category
        };
        
        props.OpenClose()
            fetch('http://localhost:4000/api/menus/add', {
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
        <form className='AddMenu-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
            <div className='AddMenu-Title'>הוספת תפריט</div>
            <div className='AddMenu-InputBox'>
                <label className='AddMenu-Label'>שם :</label>
                <Input type="text" value={name} onChange={setName}/>
                <label className='AddMenu-Label'>קטגוריה :</label>
                <Select id='permission' value={category} onChange={setCategory} title='בחר קטגוריה' optionValue='' optionsToMap={dataCategories} valueToMap="שם"/>
            </div>
                <div className='AddMenu-Buttons'>
                    <button className='AddMenu-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                    <input type="submit" value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
                </div>
        </form>
    )
}

export default AddMenu