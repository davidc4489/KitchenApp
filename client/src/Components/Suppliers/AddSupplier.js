import React, { useEffect, useState, } from 'react'
import './AddSupplier.css'
import Fetch from '../../Tools/Fetch';
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';

function AddSupplier(props) {

    const token = props.Token
   
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [mail, setMail] = useState("");
    const [category, setCategory] = useState("");
    const [product, setProduct] = useState("");
    const [priceForUnit, setPriceForUnit] = useState("");
    const [unit, setUnit] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");

    const unitsCategories = [{שם: 'ק"ג'},{שם: "ליטר"},{שם: "יחידה"}]
    const [dataCategories, setDataCategories] = useState([])

    const [dataStock, setDataStock] = useState([])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock`, setDataStock, token)
    }, [dataStock])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock/categories`, setDataCategories, token)
    }, [dataCategories])

    function saveData() {
        const addedValues = {
            שם: name,
            טל: tel,
            מייל: mail,
            קטגוריה: category,
            מוצר: product,
            מחיר_ליחידה: priceForUnit,
            יחידה: unit,
            זמן_אספקה_בימים: parseInt(deliveryTime)
        };
        fetch('http://localhost:4000/api/suppliers/add', {
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
        <>
            <form className='AddSupplier-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
                <div className='AddSupplier-Title'>הוסף ספק</div>
                <div className='AddSupplier-InputBox'>
                    <label className='AddSupplier-Label'>שם: </label>
                    <Input type="text" value={name} onChange={setName}/> 
                    <label className='AddSupplier-Label'>טל: </label>
                    <Input type="text" value={tel} onChange={setTel}/> 
                    <label className='AddSupplier-Label'>מייל: </label>
                    <Input type="email" value={mail} onChange={setMail}/>
                    <label className='AddSupplier-Label'>קטגוריה: </label>
                    <Select id='category' onChange={setCategory} value={category} title='בחר קטגוריה' optionValue='' optionsToMap={dataCategories} valueToMap="שם"/>
                    <label className='AddSupplier-Label'>מוצר: </label>
                    <Select id='product' onChange={setProduct} value={product} title='בחר מוצר' optionValue='' optionsToMap={dataStock} valueToMap="שם"/>
                    <label className='AddSupplier-Label'>מחיר ליחידה: </label>
                    <Input type='number' value={priceForUnit} onChange={setPriceForUnit}/>
                    <label className='AddSupplier-Label'>יחידה: </label>
                    <Select id='unit' value={unit} onChange={setUnit} title='בחר יחידה' optionValue='' optionsToMap={unitsCategories} valueToMap="שם"/>
                    <label className='AddSupplier-Label'>זמן אספקה בימים: </label>
                    <Input type='number' value={deliveryTime} onChange={setDeliveryTime}/>
                </div>
                <div className='AddSupplier-Buttons'>
                    <button className='AddDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                    <input type="submit" value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
                </div>
            </form>
        </>
    )
}

export default AddSupplier