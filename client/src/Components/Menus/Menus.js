import React, { useEffect, useState } from 'react'
import './Menus.css'
import AddMenu from './AddMenu.js';
import UpdateMenu from './UpdateMenu.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Input from '../../Tools/Input.jsx';
import Table from '../../Tools/Table.jsx';
import Dropdown from '../../Tools/Dropdown.jsx';
import Fetch from '../../Tools/Fetch.jsx';

function Menus() {

    const { access, token } = useAuth();

    const [dataMenus, setDataMenus] = useState([])
    const [category, setCategory] = useState('כל התפריטים')
    const [dataCategories, setDataCategories] = useState([])
    const [menuToUpdate, setMenuToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddMenuDialog, setShowAddMenuDialog] = useState(false)
    const [showUpdateMenuDialog, setShowUpdateMenuDialog] = useState(false)

    function openAddMenuDialog (){
        setShowAddMenuDialog(!showAddMenuDialog)
    }

    function openUpdateMenuDialog (){
        setShowUpdateMenuDialog(!showUpdateMenuDialog)
    }

    function updateMenu(item){
        setShowUpdateMenuDialog(true)
        setMenuToUpdate(item)
    }

    useEffect(() => {
        Fetch(`http://localhost:4000/api/menus`, setDataMenus, token)
    }, [dataMenus])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/menus/categories`, setDataCategories, token)
    }, [dataMenus])

    return (
        <>
            {access ?
            <div className='Menus-Page'>
                <div className='MenusPage-Buttons'>
                    <Dropdown title={"בחר סוג תפריט"} keyAll={"allMenus"} allValue={"כל התפריטים"} setter={setCategory} data={dataCategories}/>
                    <div className='Menus-TitlePage'>{category}</div>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddMenuDialog(true)}>הוסף תפריט</button>
                </div>
                
                <Input type='text' className={"form-control w-25 p-1 mx-auto p-2"} placeholder='חיפוש תפריט לפי שם או כשרות' value={search} onChange={setSearch}/>

                {dataMenus.length &&
                    <Table data={dataMenus} values={["שם", "קטגוריה", "כשרות", "עלות"]} category={category} allCategories={"כל התפריטים"} search={search} updateFunction={updateMenu} />
                }

                {showAddMenuDialog ? <AddMenu OpenClose={openAddMenuDialog} Token={token}/> : null}
                {showUpdateMenuDialog ? <UpdateMenu OpenClose={openUpdateMenuDialog} MenuToUpdate={menuToUpdate} Token={token}/> : null}                 
                    
            </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </>
    );
}
export default Menus