import React, { useEffect, useState, } from 'react'
import './UpdateEvent.css'

function UpdateEvent (props) {

    const [dataStock, setDataStock] = useState([])
    const eventToUpdate = props.EventToUpdate

    const [updateValues, setUpdateValues] = useState({
        day: eventToUpdate.day,
        month: eventToUpdate.month,
        year: eventToUpdate.year
    });

    const [dataSuppliers, setDataSuppliers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/suppliers`)
        .then(response => response.json())
        .then(data => setDataSuppliers(data))
    }, [dataSuppliers])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [])

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/suppliersOrdersCalendar/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()})
    }

    return (
        <div className='UpdateEvent-box'>
            <form className='UpdateSupplierOrder-Box-Content'>
                <div className='UpdateEvent-Title'>עריכת הזמנה</div>
                <div className='UpdateEvent-InputBox'>
                    <div className='add-menu-input'>
                    <div className='AddEventMenu-Labels'>
                        <label className='AddEventMenu-Label'>מוצר :</label>
                        <label className='AddEventMenu-Label'>כמות :</label>
                        <label className='AddEventMenu-Label'>ספק :</label>
                    </div>
                    <select name='idProduct' className='UpdateEventPage-Input' value={updateValues.idProduct} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר מוצר</option>
                        {dataStock.map((item) => 
                             <option key={item.id} value={item.id}>{item.שם_מוצר}</option>
                        )}
                    </select>
                    <input className='UpdateEventPage-Input' type="number" name='amount' value={updateValues.amount} onChange={updateData} required/>
                    <select name='supplier' className='UpdateEventPage-Input' value={updateValues.supplier} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר ספק</option>
                        {dataSuppliers.map((item) => 
                             <option key={item.id} value={item.שם}>{item.שם}</option>
                        )}
                    </select>
                    </div>
                    <div className='UpdateEvent-Buttons'>
                        <button className='UpdateEvent-Button' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateEvent-Button' >מחיקת תפריט</button>
                        <input type='submit' value={'שמירה'} className='UpdateEvent-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateEvent