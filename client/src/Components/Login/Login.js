import'./login.css'
import React, { useState } from 'react'
import UpdatePersonalInformations from './UpdatePersonalInformations.js';
import { useAuth } from '../../Context/UserContext.jsx';
import { useUserUpdate } from '../../Context/UserToUpdateContext';
import Input from '../Input/Input.jsx';
import Select from '../Input/Select.jsx';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [permission, setPermission] = useState("");
    const permissions = ['עובד', 'מנהל']
    
    const [showUpdatePersonalInformationsDialog, setShowUpdatePersonalInformationsDialog] = useState(false)

    const { login, logout, user, access, accessAlert, setAccessAlert } = useAuth();
    const { name } = useUserUpdate();

    const submitHandler = (event) => {
        login(email, password, permission)
        setEmail("");
        setPassword("");
        setPermission("");
    }

    function openUpdatePersonalInformationsDialog (){
        setShowUpdatePersonalInformationsDialog(!showUpdatePersonalInformationsDialog)
    }

    function updatePersonalInformations(){
        setShowUpdatePersonalInformationsDialog(true)
    }

    function logoutHandler (){
        setAccessAlert(false)
        logout()
    }

    return (
        <>
        {showUpdatePersonalInformationsDialog ? <UpdatePersonalInformations OpenClose={openUpdatePersonalInformationsDialog}/> : null}  
        <div className='loginbox shadow-lg p-3 mb-5 bg-body rounded'>
            {access !== true?
            <>
                {(accessAlert) &&
                    <div className="alert alert-danger" role="alert">
                        שם משתמש או סיסמה לא תקין !
                    </div>
                }
                <div className='titlelogin'>כניסת משתמש</div>
                <form onSubmit={submitHandler}className='position-relative py-3'>
                    <Input value={email} onChange={setEmail} placeholder=" מייל" type='email' id='email' required={true}/>
                    <Input value={password} onChange={setPassword} placeholder=" סיסמה" type='password' id='password' required={true}/>
                    <Select id='permission' value={permission} onChange={setPermission} title='בחר הרשאה' optionValue='' optionsToMap={permissions}/>
                    <button type="submit" className="btn btn-outline-primary position-absolute bottom-0 start-50 translate-middle-x">כניסה</button>
                </form>
            </>
        :        
            <>
                    {(name !== null) &&
                        <div className="alert alert-success" role="alert">
                            שלום {name} !
                        </div>
                    }
                    <button className='btn btn-outline-secondary' onClick={() => updatePersonalInformations()}>Change Email or Password</button>
                    <button className='btn btn-outline-secondary me-3' onClick={logoutHandler}>Logout</button>
            </>}
        </div>
        </>

    )
}

export default Login