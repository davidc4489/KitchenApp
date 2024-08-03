import React, { useEffect, useState, } from 'react'
import './AddProduct.css'
import Fetch from '../../Tools/Fetch';
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';

function AddProduct(props) {
   
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [kashrut, setKashrut] = useState("");
    const [supplier, setSupplier] = useState("");
    const [maker, setMaker] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [minimalQuantity, setMinimalQuantity] = useState("");

    const [dataCategories, setDataCategories] = useState([])
    const kashrutCategories = [{שם: "בשרי"},{שם: "חלבי"},{שם: "פרווה"}]
    const unitsCategories = [{שם: 'ק"ג'},{שם: "ליטר"},{שם: "יחידה"}]

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock/categories`, setDataCategories)
    }, [dataCategories])

    function saveData() {
        const addedValues = {
            שם: name,
            קטגוריה: category,
            כשרות: kashrut,
            ספק: supplier,
            יצרן: maker,
            כמות: quantity,
            יחידה: unit,
            כמות_מינימלית: minimalQuantity
        };
        fetch('http://localhost:4000/api/stock/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addedValues),
        })
            .then(response => {response.json()
    })}

    return (
        <form className='AddProduct-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
            <div className='AddProduct-Title'>הוסף מוצר</div>
            <div className='AddProduct-InputBox'>
                <label className='AddProduct-Label'>שם :</label>
                <Input type="text" value={name} onChange={setName}/>
                <label className='AddProduct-Label'>קטגוריה :</label>
                <Select id='category' value={category} onChange={setCategory} title='בחר קטגוריה' optionValue='' optionsToMap={dataCategories} valueToMap="שם"/>
                <label className='AddProduct-Label'>כשרות :</label>
                <Select id='kashrut' value={kashrut} onChange={setKashrut} title='בחר כשרות' optionValue='' optionsToMap={kashrutCategories} valueToMap="שם"/>
                <label className='AddProduct-Label'>ספק: </label>
                <Input type="text" value={supplier} onChange={setSupplier}/>
                <label className='AddProduct-Label'>יצרן: </label>
                <Input type="text" value={maker} onChange={setMaker}/>
                <label className='AddProduct-Label'>כמות: </label>
                <Input type="number" value={quantity} onChange={setQuantity}/>
                <label className='AddProduct-Label'>יחידה: </label>
                <Select id='unit' value={unit} onChange={setUnit} title="בחר יחידה" optionValue='' optionsToMap={unitsCategories} valueToMap="שם"/>
                <label className='AddProduct-Label'>כמות מינימלית: </label>
                <Input type="number" value={minimalQuantity} onChange={setMinimalQuantity}/>
            </div>
            <div className='AddProduct-Buttons'>
                <button className='AddDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                <input type='submit' value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
            </div>
        </form>
    )
}

export default AddProduct