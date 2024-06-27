import React, { useEffect, useState, } from 'react'
import './UpdateUser.css'
import validator from "validator";

function UpdateUser(props) {

    const userToUpdate = props.UserToUpdate
    const permissions = ['מלצר', 'עובד מטבח', 'מנהל']

    const [dataUsers, setDataUsers] = useState([])
   
    const [updateValues, setUpdateValues] = useState({
        שם: userToUpdate.שם,
        מייל: userToUpdate.מייל,
        סיסמה:  userToUpdate.סיסמה,
        הרשאה: userToUpdate.הרשאה
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })}

    function saveData() {
        if (dataUsers.find(user => (user.שם === updateValues.שם && userToUpdate.שם !== updateValues.שם))){
            alert("שם משתמש כבר קיים")
        }
        else if(!validator.isEmail(updateValues.מייל)){alert('כתובת מייל לא תקינה !')}
        else{
            fetch(`http://localhost:4000/api/users/${userToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }}

    function deleteUser() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/users/${userToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToUpdate),
        })
            .then(response => {response.json()})
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/users`)
        .then(response => response.json())
        .then(data => setDataUsers(data))
    }, [dataUsers])

    return (
        <div className='UpdateUser-box'>
            <form className='UpdateUser-Box-Content'>
                <div className='UpdateUser-Title'>עריכת משתמש</div>
                <div className='UpdateUser-InputBox'>
                    <label className='UpdateUser-Label'>שם :</label>
                    <input className='UpdateUserPage-Input' type="text" name='שם' value={updateValues.שם} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateUser-Label'>מייל :</label>
                    <input className='UpdateUserPage-Input' type="email" name='מייל' value={updateValues.מייל} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateUser-Label'>סיסמה :</label>
                    <input className='UpdateUserPage-Input' name='סיסמה' value={updateValues.סיסמה} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateUser-Label'>הרשאה :</label>
                   <select name='permission' value={updateValues.permission} onChange={updateData}>
                        <option value=''>בחר הרשאה</option>
                        {permissions.map((permission) => 
                            <option value={permission}>{permission}</option>
                        )}
                    </select>
                    <div>
                </div>

                    <div className='UpdateUser-Buttons'>
                        <button className='UpdateUser-Button' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateUser-Button' onClick={deleteUser}>מחיקת משתמש</button>
                        <input type='submit' value={'שמירה'} className='UpdateUser-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser