import React, { useEffect, useState, } from 'react'
import './UpdateSupplier.css'

function UpdateSupplier(props) {

    const supplierToUpdate = props.SupplierToUpdate
    const [dataSuppliers, setDataSuppliers] = useState([])
   
    const [updateValues, setUpdateValues] = useState({
        שם: supplierToUpdate.שם,
        טל: supplierToUpdate.טל,
        מייל:  supplierToUpdate.מייל,
        קטגוריה: supplierToUpdate.קטגוריה,
        מוצר: supplierToUpdate.מוצר,
        מחיר_ליחידה: supplierToUpdate.מחיר_ליחידה,
        יחידה: supplierToUpdate.יחידה,
        זמן_אספקה_בימים: supplierToUpdate.זמן_אספקה_בימים
    });

    const [dataStock, setDataStock] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [dataStock])

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData() {
            fetch(`http://localhost:4000/api/suppliers/${supplierToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteSupplier() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/suppliers/${supplierToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='UpdateSupplier-box'>
            <form className='UpdateSupplier-Box-Content'>
                <div className='UpdateSupplier-Title'>עריכת ספק</div>
                <div className='UpdateSupplier-InputBox'>
                <label className='UpdateSupplier-Label'>שם: </label>
                    <input className='UpdateSupplierPage-Input' type="text" name='שם' value={updateValues.שם} onChange={updateData} required /> 
                    <label className='UpdateSupplier-Label'>טל: </label>
                    <input className='UpdateSupplierPage-Input' type="text" name='טל' value={updateValues.טל} onChange={updateData} required /> 
                    <label className='UpdateSupplier-Label'>מייל: </label>
                    <input className='UpdateSupplierPage-Input' type="email" name='מייל' value={updateValues.מייל} onChange={updateData} required /> 
                    <label className='AddSupplier-Label'>מוצר: </label>
                    <select name='מוצר' className='user-select-input' onChange={updateData} value={updateValues.מוצר} >
                        <option value="">בחר מוצר</option>
                        {dataStock?.map((item) => (
                            <option key={item.id} value={item.שם_מוצר}>
                                {item.שם_מוצר}
                            </option> 
                        ))}
                    </select>
                    <label className='UpdateSupplier-Label'>מחיר ליחידה: </label>
                    <input className='UpdateSupplierPage-Input' type='number' name='מחיר_ליחידה' value={updateValues.מחיר_ליחידה} onChange={updateData}/>
                    <label className='UpdateSupplier-Label'>יחידה: </label>
                    <select name='יחידה' value={updateValues.יחידה} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר יחידה</option> 
                        <option value='ק"ג'>ק"ג</option>                       
                        <option value='ליטר'>ליטר</option>
                        <option value='יחידה'>יחידה</option>                                           
                     </select>
                    <label className='UpdateSupplier-Label'>זמן אספקה בימים: </label>
                    <input className='UpdateSupplierPage-Input' type='number' name='זמן_אספקה_בימים' value={updateValues.זמן_אספקה_בימים} onChange={updateData}/>

                    <div className='UpdateSupplier-Buttons'>
                        <button className='UpdateSupplier-Button' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateSupplier-Button' onClick={deleteSupplier}>מחיקת ספק</button>
                        <input type='submit' value={'שמירה'} className='UpdateSupplier-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateSupplier