import React, { useEffect, useState, } from 'react'
import './AddUser.css'
import Fetch from '../../Tools/Fetch';
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';

function AddUser(props) {

    const token = props.Token

    const permissions = [{id: 1, שם: 'מלצר'}, {id: 2, שם: 'עובד מטבח'}, {id: 3, שם: 'מנהל'}]

    const [dataUsers, setDataUsers] = useState([])

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [permission, setPermission] = useState("");

    const [alert, setAlert] = useState(null);

    function saveData(event) {
        event.preventDefault();
        
        const addedValues = {
            שם: name,
            מייל: mail,
            סיסמה: password,
            הרשאה: permission
        };
        if (dataUsers.find(user => user.שם === addedValues.שם)){
            setAlert({ message: "שם משתמש כבר קיים", type: "danger" });
        }
        else{
            fetch('http://localhost:4000/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(addedValues),
            })
                .then(response => {response.json()
            })
            props.OpenClose()
        }
    }

    useEffect(() => {
        Fetch(`http://localhost:4000/api/users`, setDataUsers, token)
    }, [dataUsers])

    function handleCloseAlert() {
        setAlert(null);
    }

    return (
        <form className='AddUser-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
            <div className='AddUser-Title'>הוספת משתמש</div>
            {alert && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAlert}></button>
                </div>
            )}
            <div className='AddUser-InputBox'>
                <label className='AddUser-Label'>שם: </label>
                <Input type="text" value={name} onChange={setName}/> 
                <label className='AddUser-Label'>מייל: </label>
                <Input type="email" value={mail} onChange={setMail}/>
                <label className='AddUser-Label'>סיסמה: </label>
                <Input type="text" value={password} onChange={setPassword}/>
                <label className='AddUser-Label'>הרשאה :</label>
                <Select id='permission' value={permission} onChange={setPermission} title="בחר הרשאה" optionValue='' optionsToMap={permissions} valueToMap="שם"/>
            </div>
            <div className='AddUser-Buttons'>
                <button className='AddDish-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                <button type="submit" value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}>שמירה</button>

            </div>
        </form>
    )
}

export default AddUser