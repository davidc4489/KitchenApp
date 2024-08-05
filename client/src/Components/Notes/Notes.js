import React, { useEffect, useState } from 'react'
import './Notes.css'
import AddNote from './AddNote.js';
import UpdateNote from './UpdateNote.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Fetch from '../../Tools/Fetch.jsx';

function Notes() {

    const { access, token } = useAuth();

    const [noteToUpdate, setNoteToUpdate] = useState(null)
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
    const [showUpdateNoteDialog, setShowUpdateNoteDialog] = useState(false)

    const [dataNotes, setDataNotes] = useState([])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/notes/`, setDataNotes, token)
    }, [dataNotes])

    function openAddNoteDialog (){
        setShowAddNoteDialog(!showAddNoteDialog)
    }

    function openUpdateNoteDialog (){
        setShowUpdateNoteDialog(!showUpdateNoteDialog)
    }

    function updateNote(item){
        setShowUpdateNoteDialog(true)
        setNoteToUpdate(item)
    }

    return (
        <div className='container'>
            {access ? (
                <div className='mt-4'>
                    <div className='mb-4 text-center'>
                        <h2>הערות</h2>
                    </div>
                    <div className='text-center mb-4'>
                        <button className='btn btn-primary' onClick={() => setShowAddNoteDialog(true)}>... הערה חדשה</button>
                    </div>
                    <div className='row'>
                        {dataNotes?.map((note) => (
                            <div key={note.id} className='col-md-4 mb-4'>
                                <div className='card h-100' onClick={() => updateNote(note)}>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{note.כותרת}</h5>
                                        <p className='card-text'>{note.תוכן}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showAddNoteDialog ? <AddNote OpenClose={openAddNoteDialog} Token={token}/> : null}
                    {showUpdateNoteDialog ? <UpdateNote OpenClose={openUpdateNoteDialog} NoteToUpdate={noteToUpdate} Token={token}/> : null}
                </div>
            ) : (
                <div className='alert alert-warning text-center'>נא להזדהות עבור גישה לנתונים</div>
            )}
        </div>
    );
    
}
export default Notes