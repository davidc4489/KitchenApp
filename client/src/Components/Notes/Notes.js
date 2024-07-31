import React, { useEffect, useState } from 'react'
import './Notes.css'
import AddNote from './AddNote.js';
import UpdateNote from './UpdateNote.js';
import { useAuth } from '../../Context/UserContext.jsx';

function Notes() {

    const { access } = useAuth();

    const [noteToUpdate, setNoteToUpdate] = useState(null)
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
    const [showUpdateNoteDialog, setShowUpdateNoteDialog] = useState(false)

    const [dataNotes, setDataNotes] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/notes/`)
        .then(response => response.json())
        .then(data => setDataNotes(data))
    }, [dataNotes])

    // function updateSearch(event){
    //     setSearch(event.target.value)
    // }

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
        <div className='Messages'>
            {access ?
            <div className='Messages-Page'>
                <div className='Messages-TitlePage'>הערות</div>
            <div className='Notes-NewNote-Button-Container'>
                <button className='Notes-NewNote-Button' onClick={() => setShowAddNoteDialog(true)}>... הערה חדשה</button>
            </div>
            <div className='Notes-Container'>
                {dataNotes?.map((note) => (
                            <button key={note.id} className='Note-Case' onClick={() => updateNote(note)}>
                                <div className='Note-Title'>{note.כותרת}</div><div className='Note-Content'>{note.תוכן}</div>
                            </button> 
                        ))}
            </div>

            {showAddNoteDialog ? <AddNote OpenClose={openAddNoteDialog}/> : null}
            {showUpdateNoteDialog ? <UpdateNote OpenClose={openUpdateNoteDialog} NoteToUpdate={noteToUpdate}/> : null}   
                
                </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </div>
    );
    
}
export default Notes