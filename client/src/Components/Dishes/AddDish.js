import React, { useEffect, useState, } from 'react'
import './AddDish.css'
import Input from '../../Tools/Input.jsx';
import Select from '../../Tools/Select.jsx';
import Fetch from '../../Tools/Fetch.jsx';

function AddDish(props) {
   
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [dataCategories, setDataCategories] = useState([])

    // useEffect(() => {
    //     fetch(`http://localhost:4000/api/dishes/categories`)
    //     .then(response => response.json())
    //     .then(data => setDataCategories(data))
    // }, [dataCategories])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/dishes/categories`, setDataCategories)
    }, [dataCategories])

    function saveData() {
        const addedValues = {
            שם: name,
            קטגוריה: category
        };
        fetch('http://localhost:4000/api/dishes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addedValues),
        })
            .then(response => {response.json()
    })}

    return (
            <form className='AddDish-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
                <div className='AddDish-Title'>הוסף מנה</div>
                <div className='AddDish-InputBox'>
                    <label className='AddDish-Label'>שם :</label>
                    <Input type="text" value={name} onChange={setName}/>
                    <label className='AddMenu-Label'>קטגוריה :</label>
                    <Select id='permission' value={category} onChange={setCategory} title='בחר קטגוריה' optionValue='' optionsToMap={dataCategories} valueToMap="שם"/>
                </div>
                    <div className='AddDish-Buttons'>
                        <button className='AddDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
                    </div>
            </form>
    )
}

export default AddDish