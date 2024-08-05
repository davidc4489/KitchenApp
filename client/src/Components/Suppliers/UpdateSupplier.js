import React, { useEffect, useState, } from 'react'
import './UpdateSupplier.css'
import Fetch from '../../Tools/Fetch';
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';
import DeleteVerification from '../../Tools/DeleteVerification.jsx';

function UpdateSupplier(props) {

    const supplierToUpdate = props.SupplierToUpdate
    const token = props.Token

    const [name, setName] = useState(supplierToUpdate.שם);
    const [tel, setTel] = useState(supplierToUpdate.טל);
    const [mail, setMail] = useState(supplierToUpdate.מייל);
    const [category, setCategory] = useState(supplierToUpdate.קטגוריה);
    const [product, setProduct] = useState(supplierToUpdate.מוצר);
    const [priceForUnit, setPriceForUnit] = useState(supplierToUpdate.מחיר_ליחידה);
    const [unit, setUnit] = useState(supplierToUpdate.יחידה);
    const [deliveryTime, setDeliveryTime] = useState(supplierToUpdate.זמן_אספקה_בימים);

    const [dataCategories, setDataCategories] = useState([])
    const [dataStock, setDataStock] = useState([])
    const unitsCategories = [{שם: 'ק"ג'},{שם: "ליטר"},{שם: "יחידה"}]

    const [deleteSupplierBox, setDeleteSupplierBox] = useState(false)

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock/categories`, setDataCategories, token)
    }, [dataCategories])


    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock`, setDataStock, token)
    }, [dataStock])

    function saveData() {
        const updateValues = {
            שם: name,
            טל: tel,
            מייל: mail,
            קטגוריה: category,
            מוצר: product,
            מחיר_ליחידה: priceForUnit,
            יחידה: unit,
            זמן_אספקה_בימים: deliveryTime
        };
        fetch(`http://localhost:4000/api/suppliers/${supplierToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()})
    }

    function deleteSupplierDisplay(event) {
        event.preventDefault();
        setDeleteSupplierBox(true);
    }

    function deleteSupplier() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/suppliers/${supplierToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(supplierToUpdate),
        })
            .then(response => {response.json()})
    }

    return (
        <>
            <form className='UpdateSupplier-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
                <div className='UpdateSupplier-Title'>עריכת ספק</div>
                <div className='UpdateSupplier-InputBox'>
                    <label className='UpdateSupplier-Label'>שם: </label>
                    <Input type="text" value={name} onChange={setName}/> 
                    <label className='UpdateSupplier-Label'>טל: </label>
                    <Input type="text" value={tel} onChange={setTel}/> 
                    <label className='UpdateSupplier-Label'>מייל: </label>
                    <Input type="email" value={mail} onChange={setMail}/> 
                    <label className='AddSupplier-Label'>קטגוריה: </label>
                    <Select id='product' onChange={setCategory} value={category} title='בחר קטגוריה' optionValue='' optionsToMap={dataCategories} valueToMap="שם"/>
                    <label className='AddSupplier-Label'>מוצר: </label>
                    <Select id='category' onChange={setCategory} value={category} title='בחר מוצר' optionValue='' optionsToMap={dataStock} valueToMap="שם"/>
                    <label className='UpdateSupplier-Label'>מחיר ליחידה: </label>
                    <Input type='number' value={priceForUnit} onChange={setPriceForUnit}/>
                    <label className='UpdateSupplier-Label'>יחידה: </label>
                    <Select id='unit' onChange={setUnit} value={unit} title='בחר יחידה' optionValue='' optionsToMap={unitsCategories} valueToMap="שם"/>
                    <label className='UpdateSupplier-Label'>זמן אספקה בימים: </label>
                    <Input type='number' value={deliveryTime} onChange={setDeliveryTime}/>
                </div>
                <div className='UpdateSupplier-Buttons'>
                    <button className='AddDish-Button btn btn-outline-danger' onClick={deleteSupplierDisplay}>מחיקת ספק</button>
                    <input type='submit' value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
                    <button className='AddDish-Button btn btn-outline-secondary' onClick={props.OpenClose}>ביטול</button>
                </div>
            </form>
            {deleteSupplierBox ? <DeleteVerification deleteFunction={deleteSupplier} OpenClose={props.OpenClose} CloseBox={setDeleteSupplierBox} Text={"? למחוק את המוצר"}/> : null}
        </>
    )
}

export default UpdateSupplier