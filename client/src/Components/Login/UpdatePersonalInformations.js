import React, { useState, useEffect } from 'react'
import './UpdatePersonalInformations.css'
import validator from "validator";
import Input from '../../Tools/Input';
import { useUserUpdate } from '../../Context/UserToUpdateContext';

function UpdatePersonalInformations(props) {

    // Get user data from userUpdate context
    const {id, name, email, password, permission, userSetter} = useUserUpdate();
    const [nameToUpdate, setName] = useState(name);
    const [mailtoUpdate, setMail] = useState(email);
    const [passwordToUpdate, setPassword] = useState(password);
    const permissionToUpdate = permission;
    const [idToUpdate, setIdToUpdate] = useState(id)
    const token = props.Token;

    useEffect(() => {
        setName(name);
        setMail(email);
        setPassword(password);
        setIdToUpdate(parseInt(id));
    }, [id, name, email, password, idToUpdate]);

    // Function to update the database
    function saveData(event) {

        const updateValues = {
            id: idToUpdate,
            שם: nameToUpdate,
            מייל: mailtoUpdate,
            סיסמה:  passwordToUpdate,
            הרשאה: permissionToUpdate
        };

        if(!validator.isEmail(updateValues.מייל)){
            alert('כתובת מייל לא תקינה !')
        }
        else{
            userSetter(updateValues);
            fetch(`http://localhost:4000/api/users/${idToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
            }
    }

    return (
            <form className='UpdatePersonalInformations-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
                <div className='UpdateUser-Title'>עריכת משתמש</div>
                <div className='UpdateUser-InputBox'>
                    <label className='UpdateUser-Label'>שם :</label>
                    <Input type="text" value={nameToUpdate} onChange={setName} required/>
                    <label className='UpdateUser-Label'>מייל :</label>
                    <Input type="text" value={mailtoUpdate} onChange={setMail} required/>
                    <label className='UpdateUser-Label'>סיסמה :</label>
                    <Input type="text" value={passwordToUpdate} onChange={setPassword} required/>
                    <div>
                </div>
                    <div className='UpdateUser-Buttons'>
                        <button className='AddDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                        <input type='submit' value='שמירה' className='Adddish-Button btn btn-outline-primary' onClick={saveData}></input>
                    </div>
                </div>
            </form>
    )
}

export default UpdatePersonalInformations