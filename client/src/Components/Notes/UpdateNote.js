import React, { useEffect, useState, } from 'react'
import '../Menus/UpdateMenu.css'
import DeleteVerification from '../../Tools/DeleteVerification.jsx';

function UpdateNote(props) {

    const noteToUpdate = props.NoteToUpdate
    const token = props.Token
   
    const [updateValues, setUpdateValues] = useState({
        כותרת: noteToUpdate.כותרת,
        תוכן: noteToUpdate.תוכן
    });

    const [deleteNoteBox, setDeleteNoteBox] = useState(false)

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData() {
        fetch(`http://localhost:4000/api/notes/${noteToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()})
            props.OpenClose()
    }

    function deleteNoteDisplay(event) {
        event.preventDefault();
        setDeleteNoteBox(true);
    }

    function deleteNote() {
        setDeleteNoteBox(false)
        fetch(`http://localhost:4000/api/notes/${noteToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(noteToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='modal show d-block' role='dialog' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className='modal-dialog modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>עדכון הערה</h5>
                        <button type='button' className='close' onClick={props.OpenClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form onSubmit={saveData}>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <label htmlFor='title'>כותרת</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='title'
                                    name='כותרת'
                                    value={updateValues.כותרת}
                                    onChange={updateData}
                                    placeholder='כותרת'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='content'>תוכן</label>
                                <textarea
                                    className='form-control'
                                    id='content'
                                    name='תוכן'
                                    value={updateValues.תוכן}
                                    onChange={updateData}
                                    placeholder='כתוב הערה חדשה'
                                    rows='5'
                                    required
                                />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' onClick={props.OpenClose}>ביטול</button>
                            <button type='button' className='btn btn-danger' onClick={deleteNoteDisplay}>מחק הערה</button>
                            <button type='submit' className='btn btn-primary'>שמירה</button>
                        </div>
                    </form>
                </div>
            </div>
            {deleteNoteBox ? <DeleteVerification deleteFunction={deleteNote} OpenClose={props.OpenClose} CloseBox={setDeleteNoteBox} Text={"? למחוק את ההערה"}/> : null}
        </div>
    )
}

export default UpdateNote