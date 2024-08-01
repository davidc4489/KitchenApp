import React, { useEffect, useState } from 'react'
import './Dishes.css'
import AddDish from './AddDish.js';
import UpdateDish from './UpdateDish.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Input from '../Input/Input.jsx';
import Table from '../Input/Table.jsx';
import Dropdown from '../Input/Dropdown.jsx';

function Dishes() {

    const { access } = useAuth();

    const [dataDishes, setDataDishes] = useState([])
    const [category, setCategory] = useState('כל המנות')
    const [dataCategories, setDataCategories] = useState([])
    const [dishToUpdate, setDishToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddDishDialog, setShowAddDishDialog] = useState(false)
    const [showUpdateDishDialog, setShowUpdateDishDialog] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data.reverse()))
    }, [dataCategories])

    function openAddDishDialog (){
        setShowAddDishDialog(!showAddDishDialog)
    }

    function openUpdateDishDialog (){
        setShowUpdateDishDialog(!showUpdateDishDialog)
    }

    function updateDish(item){
        setShowUpdateDishDialog(true)
        setDishToUpdate(item)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes`)
        .then(response => response.json())
        .then(data => setDataDishes(data))
    }, [dataDishes])

    return (
        <>
            {access ?
            <div className='Dishes-Page'>
                <div className='DishesPage-Buttons'>
                    <Dropdown title={"בחר סוג מנה"} keyAll={"allDishes"} allValue={"כל המנות"} setter={setCategory} data={dataCategories}/>
                    <div className='Dishes-TitlePage'>{category}</div>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddDishDialog(true)}>הוסף מנה</button>
                </div>

                <Input type='text' className={"form-control w-25 p-1 mx-auto p-2"} placeholder='חיפוש מנה לפי שם או כשרות' value={search} onChange={setSearch}/>
                
                {dataDishes.length &&
                    <Table data={dataDishes} values={["שם", "קטגוריה", "כשרות", "עלות"]} category={category} allCategories={"כל המנות"} search={search} updateFunction={updateDish} title={"עריכת מנה"}/>
                }

                {showAddDishDialog ? <AddDish OpenClose={openAddDishDialog}/> : null}
                {showUpdateDishDialog ? <UpdateDish OpenClose={openUpdateDishDialog} DishToUpdate={dishToUpdate}/> : null}  

                </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </>
    );
}
export default Dishes