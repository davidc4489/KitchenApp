import React, { useEffect, useState, } from 'react'
import './AddSupplier.css'

function AddSupplier(props) {
   
    const [addValues, setAddValues] = useState({
        שם: '',
        טל: '',
        מייל: '',
        קטגוריה: '',
        מוצר: '',
        מחיר_ליחידה: '',
        יחידה: '',
        זמן_אספקה_בימים:  ''
    });

    const [dataStock, setDataStock] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [dataStock])

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
            fetch('http://localhost:4000/api/suppliers/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddSupplier-box'>
            <form className='AddSupplier-Box-Content'>
                <div className='AddSupplier-Title'>הוסף ספק</div>
                <div className='AddSupplier-InputBox'>
                    <label className='AddSupplier-Label'>שם: </label>
                    <input className='AddSupplierPage-Input' type="text" name='שם' value={addValues.שם} onChange={updateData} required /> 
                    <label className='AddSupplier-Label'>טל: </label>
                    <input className='AddSupplierPage-Input' type="text" name='טל' value={addValues.טל} onChange={updateData} required /> 
                    <label className='AddSupplier-Label'>מייל: </label>
                    <input className='AddSupplierPage-Input' type="email" name='מייל' value={addValues.מייל} onChange={updateData} required /> 
                    <label className='AddSupplier-Label'>מוצר: </label>
                    <select name='מוצר' className='user-select-input' onChange={updateData} value={addValues.מוצר} >
                        <option value="">בחר מוצר</option>
                        {dataStock?.map((item) => (
                            <option key={item.id} value={item.שם_מוצר}>
                                {item.שם_מוצר}
                            </option> 
                        ))}
                    </select>
                    <label className='AddSupplier-Label'>מחיר ליחידה: </label>
                    <input className='AddSupplierPage-Input' type='number' name='מחיר_ליחידה' value={addValues.מחיר_ליחידה} onChange={updateData}/>
                    <label className='AddSupplier-Label'>יחידה: </label>
                    <select name='יחידה' value={addValues.יחידה} onChange={updateData} required pattern=".*\S+.*" title="יש למלא השדה">
                        <option value=''>בחר יחידה</option> 
                        <option value='ק"ג'>ק"ג</option>                       
                        <option value='ליטר'>ליטר</option>
                        <option value='יחידה'>יחידה</option>                                           
                     </select>
                    <label className='AddSupplier-Label'>זמן אספקה בימים: </label>
                    <input className='AddSupplierPage-Input' type='number' name='זמן_אספקה_בימים' value={addValues.זמן_אספקה_בימים} onChange={updateData}/>
                </div>

                    <div className='AddSupplier-Buttons'>
                        <button className='AddSupplier-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddSupplier-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddSupplier