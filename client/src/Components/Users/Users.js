import React, { useEffect, useState } from 'react'
import './Users.css'
import AddUser from './AddUser.js';
import UpdateUser from './UpdateUser.js';
import { useAuth } from '../../Context/UserContext.jsx';

function Users() {

    const { access, directionAccess } = useAuth();

    const [dataUsers, setDataUsers] = useState([])
    const [category, setCategory] = useState('כל המשתמשים')
    const [userToUpdate, setUserToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddUserDialog, setShowAddUserDialog] = useState(false)
    const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false)

    function updateSearch(event){
        setSearch(event.target.value)
    }
    
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
        fetch(`http://localhost:4000/api/users`)
        .then(response => response.json())
        .then(data => setDataUsers(data))
    }, [dataUsers])

    // console.log(showAddUserDialog)

    return (
        <div className='Users'>
            {(access && directionAccess) ?
            <div>
                <div className='UsersPage-Buttons'>
                    <button className='UsersPage-AddUser-Button' onClick={() => setShowAddUserDialog(true)}>הוסף משתמש</button>
                    <button className='UsersPage-Button' onClick={() => setCategory('מנהל')}>מנהל</button>
                    <button className='UsersPage-Button' onClick={() => setCategory('עובד מטבח')}>עובד מטבח</button>
                    <button className='UsersPage-Button' onClick={() => setCategory('מלצר')}>מלצר</button>
                    <button className='UsersPage-Button' onClick={() => setCategory('כל המשתמשים')}>כל המשתמשים</button>
                </div>
                <div className='Users-TitlePage'>{category}</div>

                <div className='UsersPage-SearchBox'>
                    <input type='text' className='UsersPage-SearchBox-Input' placeholder='חיפוש משתמש לפי שם' value={search} onChange={updateSearch}></input>
                </div>

                {dataUsers.length &&
                    <div>
                        <div className='Users-Headers'>
                            <div> הרשאה </div>
                            <div> סיסמה </div>
                            <div> מייל </div>
                            <div> שם </div>
                            <div> Id </div>
                        </div>
                            {dataUsers.map((item) => (
                                ((category === 'כל המשתמשים' || category == item.הרשאה) && (item.שם.includes(search))) &&
                            <button key={item.id} className='Users-UserRow' onClick={() => updateUser(item)}>
                                    <div className='row-field'> {item.הרשאה} </div>
                                    <div className='row-field'> {item.סיסמה} </div>
                                    <div className='row-field'> {item.מייל} </div>
                                    <div className='row-field'> {item.שם} </div>
                                    <div className='row-field'> {item.id} </div>
                            </button>
                            ))}
                            {showAddUserDialog ? <AddUser OpenClose={openAddUserDialog}/> : null}
                            {showUpdateUserDialog ? <UpdateUser OpenClose={openUpdateUserDialog} UserToUpdate={userToUpdate}/> : null} 
                    </div>}
                </div>:<div className='NoAccessUsersAlert'>נא להזדהות עבור גישה לנתונים עם הרשאת מנהל</div>}
        </div>
    );
}
export default Users