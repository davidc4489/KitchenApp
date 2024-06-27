import React, { useEffect, useState, } from 'react'
import '../Menus/AddMenu.css'
import './AddNote.css'

function AddNote(props) {
   
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
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddNote-box'>
            <form className='AddNote-Box-Content'>
                {/* <div className='AddMenu-Title'>הוספת הערה</div> */}
                <div className='AddNote-InputBox'>
                    {/* <label className='AddMenu-Label'>שם :</label> */}
                    <input className='AddMenuPage-Input AddNotePage-Input' type="text" name='כותרת' value={addValues.כותרת} onChange={updateData} placeholder='כותרת' required />
                    {/* <label className='AddMenu-Label'>קטגוריה :</label> */}
                    <textarea name='תוכן' value={addValues.תוכן} className='AddNotePage-TextArea' onChange={updateData} placeholder='כתוב הערה חדשה'></textarea>
                </div>
                    <div className='AddNote-Buttons'>
                        <button className='AddNote-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddNote-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddNote