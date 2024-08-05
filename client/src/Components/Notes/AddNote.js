import React, { useEffect, useState, } from 'react'
import '../Menus/AddMenu.css'
import './AddNote.css'

function AddNote(props) {
   
    const token = props.Token
    
    const [addValues, setAddValues] = useState({
        כותרת: '',
        תוכן: ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
            props.OpenClose()
            fetch('http://localhost:4000/api/notes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='modal show d-block' role='dialog' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className='modal-dialog modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>הוספת הערה חדשה</h5>
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
                                    value={addValues.כותרת}
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
                                    value={addValues.תוכן}
                                    onChange={updateData}
                                    placeholder='כתוב הערה חדשה'
                                    rows='5'
                                    required
                                />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' onClick={props.OpenClose}>ביטול</button>
                            <button type='submit' className='btn btn-primary'>שמירה</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNote