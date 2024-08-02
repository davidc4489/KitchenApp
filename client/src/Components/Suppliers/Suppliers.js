import React, { useEffect, useState } from 'react'
import './Suppliers.css'
import AddSupplier from './AddSupplier.js';
import UpdateSupplier from './UpdateSupplier.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Table from '../Input/Table.jsx';
import Dropdown from '../Input/Dropdown.jsx';

function Suppliers() {

    const { access } = useAuth();

    const [dataSuppliers, setDataSuppliers] = useState([])
    const [category, setCategory] = useState('כל הספקים')
    const [supplierToUpdate, setSupplierToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddSupplierDialog, setShowAddSupplierDialog] = useState(false)
    const [showUpdateSupplierDialog, setShowUpdateSupplierDialog] = useState(false)

    const dataCategories = [
        {id: 0, שם: 'סכו"ם'},
        {id: 1, שם: 'אוכל'},
        {id: 2, שם: 'שתיה'}
    ];

    function openAddSupplierDialog (){
        setShowAddSupplierDialog(!showAddSupplierDialog)
    }

    function openUpdateSupplierDialog (){
        setShowUpdateSupplierDialog(!showUpdateSupplierDialog)
    }

    function updateSupplier(item){
        setShowUpdateSupplierDialog(true)
        setSupplierToUpdate(item)
    }

    function updateSearch(event){
        setSearch(event.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/suppliers`)
        .then(response => response.json())
        .then(data => setDataSuppliers(data))
    }, [dataSuppliers])

    return (
        <>
            {access ?
            <div className='Suppliers-Page'>
                <div className='SuppliersPage-Buttons'>
                    <Dropdown title={"בחר סוג ספק"} keyAll={"allSuppliers"} allValue={"כל הספקים"} setter={setCategory} data={dataCategories}/>
                    <div className='Suppliers-TitlePage'>{category}</div>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddSupplierDialog(true)}>הוסף ספק</button>
                </div>
                <div className='SuppliersPage-SearchBox'>
                    <input type='text' className='SuppliersPage-SearchBox-Input' placeholder='חיפוש ספק לפי שם' value={search} onChange={updateSearch}></input>
                </div>
                {dataSuppliers.length &&
                    <Table data={dataSuppliers} values={["id", "שם", "טל", "מייל", "קטגוריה", "מוצר", "מחיר_ליחידה", "יחידה", "זמן_אספקה_בימים"]} category={category} allCategories={"כל הספקים"} search={search} updateFunction={updateSupplier} title={"עריכת ספק"}/>
                }
                {showAddSupplierDialog ? <AddSupplier OpenClose={openAddSupplierDialog}/> : null}
                {showUpdateSupplierDialog ? <UpdateSupplier OpenClose={openUpdateSupplierDialog} SupplierToUpdate={supplierToUpdate}/> : null} 

                </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </>

    );
}
export default Suppliers
