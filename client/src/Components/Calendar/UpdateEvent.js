import React, { useEffect, useState, } from 'react'
import './UpdateEvent.css'

function UpdateEvent (props) {

    const [dataMenus, setDataMenus] = useState([])
    const eventToUpdate = props.EventToUpdate

    const [updateValues, setUpdateValues] = useState({
        day: eventToUpdate.day,
        month: eventToUpdate.month,
        year: eventToUpdate.year
    });

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus`)
        .then(response => response.json())
        .then(data => setDataMenus(data))
    }, [])

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData() {
        fetch(`http://localhost:4000/api/menusCalendar/add`, {
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
            <form className='UpdateEvent-Box-Content'>
                <div className='UpdateEvent-Title'>עריכת תפריט</div>
                <div className='UpdateEvent-InputBox'>
                    <div className='add-menu-input'>
                    <div className='AddEventMenu-Labels'>
                        <label className='AddEventMenu-Label'>תפריט :</label>
                        <label className='AddEventMenu-Label'>כמות :</label>
                    </div>
                    <select name='menuId' className='UpdateEventPage-Input' value={updateValues.menuId} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר תפריט</option>
                        {dataMenus.map((item) => 
                             <option key={item.id} value={item.id}>{item.שם}</option>
                        )}
                    </select>
                    <input className='UpdateEventPage-Input' type="number" name='amount' value={updateValues.amount} onChange={updateData} required/>
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