import React, { useEffect, useState, } from 'react'
import './UpdateUser.css'
import validator from "validator";
import Fetch from '../../Tools/Fetch';
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';
import DeleteVerification from '../../Tools/DeleteVerification.jsx';

function UpdateUser(props) {

    const userToUpdate = props.UserToUpdate
    const permissions = [{id: 1, שם: 'מלצר'}, {id: 2, שם: 'עובד מטבח'}, {id: 3, שם: 'מנהל'}]

    const [dataUsers, setDataUsers] = useState([])

    const [name, setName] = useState(userToUpdate.שם);
    const [mail, setMail] = useState(userToUpdate.מייל);
    const [password, setPassword] = useState(userToUpdate.סיסמה);
    const [permission, setPermission] = useState(userToUpdate.הרשאה);

    const [deleteUserBox, setDeleteUserBox] = useState(false)

    function saveData() {
        const updateValues = {
            שם: name,
            מייל: mail,
            סיסמה: password,
            הרשאה: permission
        };

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

    function deleteUserDisplay(event) {
        event.preventDefault();
        setDeleteUserBox(true);
    }

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
        Fetch(`http://localhost:4000/api/users`, setDataUsers)
    }, [dataUsers])

    return (
        <>
            <form className='UpdateUser-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
                <div className='UpdateUser-Title'>עריכת משתמש</div>
                <div className='UpdateUser-InputBox'>
                    <label className='UpdateUser-Label'>שם :</label>
                    <Input type="text" value={name} onChange={setName}/> 
                    <label className='UpdateUser-Label'>מייל :</label>
                    <Input type="email" value={mail} onChange={setMail}/>
                    <label className='UpdateUser-Label'>סיסמה :</label>
                    <Input type="text" value={password} onChange={setPassword}/>
                    <label className='UpdateUser-Label'>הרשאה :</label>
                    <Select id='permission' value={permission} onChange={setPermission} title="בחר הרשאה" optionValue='' optionsToMap={permissions} valueToMap="שם"/>
                    <div>
                </div>
                <div className='UpdateUser-Buttons'>
                    <button className='AddDish-Button btn btn-outline-danger' onClick={deleteUserDisplay}>מחיקת משתמש</button>
                    <input type='submit' value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
                    <button className='AddDish-Button btn btn-outline-secondary' onClick={props.OpenClose}>ביטול</button>
                </div>
                </div>
            </form>
            {deleteUserBox ? <DeleteVerification deleteFunction={deleteUser} OpenClose={props.OpenClose} CloseBox={setDeleteUserBox} Text={"? למחוק את המוצר"}/> : null}
        </>
    )
}

export default UpdateUser