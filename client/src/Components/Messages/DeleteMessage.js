import React, { useEffect, useState, } from 'react'
import './DeleteMessage.css'
import '../Notes/AddNote.css'

function DeleteMessage(props) {

    const messageToDelete = props.MessageToDelete

    const garbageCheckboxChange = () => {
        let id = messageToDelete.id
        fetch(`http://localhost:4000/api/suppliersOrdersCalendar/toGarbage/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        })
            .then(response => {response.json()})
            props.OpenClose()
    };

    return (
        <div className='AddNote-box'>
            <div className='AddNote-Box-Content'>
                {(messageToDelete.garbage == false)?
                <div>למחוק את ההודעה ? במקרה של מחיקה, ההודעה תישמר במערכת במשך 7 ימים ולאחר מכן היא תימחק לצמיתות.</div>:
                <div>להחזיר ההודעה לתיבת ההודעות ?</div>}
                    <div className='AddNote-Buttons'>
                        <button className='AddNote-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddNote-Button' onClick={garbageCheckboxChange}></input>
                    </div>
            </div>
        </div>
    )
}

export default DeleteMessage