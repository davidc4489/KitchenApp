import React, { useEffect, useState, } from 'react'
import '../Menus/UpdateMenu.css'

function UpdateNote(props) {

    const noteToUpdate = props.NoteToUpdate
   
    const [updateValues, setUpdateValues] = useState({
        כותרת: noteToUpdate.כותרת,
        תוכן: noteToUpdate.תוכן
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData(event) {
        
        fetch(`http://localhost:4000/api/notes/${noteToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()})
            props.OpenClose()
    }

    function deleteNote() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/notes/${noteToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='AddNote-box'>
            <form className='AddNote-Box-Content'>
                <div className='AddNote-InputBox'>
                    <input className='AddMenuPage-Input AddNotePage-Input' type="text" name='כותרת' value={updateValues.כותרת} onChange={updateData} placeholder='כותרת' required />
                    <textarea name='תוכן' value={updateValues.תוכן} className='AddNotePage-TextArea' onChange={updateData} placeholder='כתוב הערה חדשה'></textarea>
                </div>
                    <div className='AddNote-Buttons'>
                        <button className='AddNote-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddNote-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default UpdateNote