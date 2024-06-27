import React, { useEffect, useState, } from 'react'
import './AddUser.css'

function AddUser(props) {

    const permissions = ['מלצר', 'עובד מטבח', 'מנהל']

    const [dataUsers, setDataUsers] = useState([])
   
    const [addValues, setAddValues] = useState({
        שם: '',
        מייל: '',
        סיסמה:  '',
        הרשאה:  ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
        if (dataUsers.find(user => user.שם === addValues.שם)){
            alert("שם משתמש כבר קיים !")
        }
        else{
            fetch('http://localhost:4000/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}}

    useEffect(() => {
        fetch(`http://localhost:4000/api/users`)
        .then(response => response.json())
        .then(data => setDataUsers(data))
    }, [dataUsers])

    return (
        <div className='AddUser-box'>
            <form className='AddUser-Box-Content'>
                <div className='AddUser-Title'>הוספת משתמש</div>
                <div className='AddUser-InputBox'>
                    <label className='AddUser-Label'>שם: </label>
                    <input className='AddUserPage-Input' type="text" name='שם' value={addValues.שם} onChange={updateData} required /> 
                    <label className='AddUser-Label'>מייל: </label>
                    <input className='AddUserPage-Input' type="email" name='מייל' value={addValues.מייל} onChange={updateData} required/>
                    <label className='AddUser-Label'>סיסמה: </label>
                    <input className='AddUserPage-Input' type="text" name='סיסמה' value={addValues.סיסמה} onChange={updateData} required/>
                    <label className='AddUser-Label'>הרשאה :</label>
                    <select name='permission' value={addValues.הרשאה} onChange={updateData} required>
                        <option value=''>בחר הרשאה</option>
                        {permissions.map((permission) => 
                             <option value={permission}>{permission}</option>
                        )}
                    </select> 
                </div>

                    <div className='AddUser-Buttons'>
                        <button className='AddUser-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddUser-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddUser