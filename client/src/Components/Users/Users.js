import React, { useEffect, useState } from 'react'
import './Users.css'
import AddUser from './AddUser.js';
import UpdateUser from './UpdateUser.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Fetch from '../../Tools/Fetch.jsx';
import Dropdown from '../../Tools/Dropdown.jsx';
import Input from '../../Tools/Input.jsx';
import Table from '../../Tools/Table.jsx';

function Users() {

    const { access, directionAccess, token } = useAuth();

    const [dataUsers, setDataUsers] = useState([])
    const [category, setCategory] = useState('כל המשתמשים')
    const dataCategories = [{id: 1, שם: "מנהל"},{id: 2, שם: "עובד מטבח"},{id: 3, שם: "מלצר"}]

    const [userToUpdate, setUserToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddUserDialog, setShowAddUserDialog] = useState(false)
    const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false)
    
    function openAddUserDialog (){
        setShowAddUserDialog(!showAddUserDialog)
    }

    function openUpdateUserDialog (){
        setShowUpdateUserDialog(!showUpdateUserDialog)
    }

    function updateUser(item){
        setShowUpdateUserDialog(true)
        setUserToUpdate(item)
    }

    useEffect(() => {
        Fetch(`http://localhost:4000/api/users`, setDataUsers, token)
    }, [dataUsers])

    return (
        <>
            {(access && directionAccess) ?
            <div>
                <div className='UsersPage-Buttons'>
                    <Dropdown title={"בחר סוג עובד"} keyAll={"allUsers"} allValue={"כל המשתמשים"} setter={setCategory} data={dataCategories}/>
                    <div className='Users-TitlePage'>{category}</div>
                    <button className='btn btn-secondary' onClick={() => setShowAddUserDialog(true)}>הוסף משתמש</button>
                </div>

                <Input type='text' className={"form-control w-25 p-1 mx-auto p-2"} placeholder='חיפוש משתמש לפי שם' value={search} onChange={setSearch}/>

                {dataUsers.length &&
                    <Table data={dataUsers} values={["שם","מייל", "סיסמה", "הרשאה"]} category={category} allCategories={"כל המשתמשים"} search={search} updateFunction={updateUser} title={"עריכת משתמש"}/>
                }
                {showAddUserDialog ? <AddUser OpenClose={openAddUserDialog} Token={token}/> : null}
                {showUpdateUserDialog ? <UpdateUser OpenClose={openUpdateUserDialog} UserToUpdate={userToUpdate} Token={token}/> : null} 
            </div>:
            <div className='NoAccessUsersAlert'>נא להזדהות עבור גישה לנתונים עם הרשאת מנהל</div>}
        </>
    );
}
export default Users