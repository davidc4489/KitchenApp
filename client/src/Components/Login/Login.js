import'./login.css'
import React, { useState } from 'react'
import UpdatePersonalInformations from './UpdatePersonalInformations.js';
import { useAuth } from '../../Context/UserContext.jsx';
import { useUserUpdate } from '../../Context/UserToUpdateContext';
import Input from '../../Tools/Input.jsx';
import Select from '../../Tools/Select.jsx';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [permission, setPermission] = useState("");

    // List of different existing authorizations
    const permissions = ['עובד', 'מנהל']
    
    const [showUpdatePersonalInformationsDialog, setShowUpdatePersonalInformationsDialog] = useState(false)

    // Retrieves data and authentication functions from user context
    const { login, logout, user, access, accessAlert, setAccessAlert } = useAuth();

    //  Get active user data from context
    const { name } = useUserUpdate();

    const submitHandler = (event) => {
        // Check the user data with the context function
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
            {/* Case where no user identified */}
            {access !== true?
            <>
                {/* Access alert is set to true by context when user data is incorrect */}
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
            // Case where user identified
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