import React, { useEffect, useState } from 'react'
import './Suppliers.css'
import AddSupplier from './AddSupplier.js';
import UpdateSupplier from './UpdateSupplier.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Table from '../../Tools/Table.jsx';
import Dropdown from '../../Tools/Dropdown.jsx';
import Fetch from '../../Tools/Fetch.jsx';
import Input from '../../Tools/Input.jsx';

function Suppliers() {

    const { access, token } = useAuth();

    const [dataSuppliers, setDataSuppliers] = useState([])
    const [category, setCategory] = useState('כל הספקים')
    const [supplierToUpdate, setSupplierToUpdate] = useState(null)
    const [search, setSearch] = useState('')
    const [dataCategories, setDataCategories] = useState([])

    const [showAddSupplierDialog, setShowAddSupplierDialog] = useState(false)
    const [showUpdateSupplierDialog, setShowUpdateSupplierDialog] = useState(false)

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock/categories`, setDataCategories, token)
    }, [dataCategories])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/suppliers`, setDataSuppliers, token)
    }, [dataSuppliers])

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

    return (
        <>
            {access ?
            <div className='Suppliers-Page'>
                <div className='SuppliersPage-Buttons'>
                    <Dropdown title={"בחר סוג ספק"} keyAll={"allSuppliers"} allValue={"כל הספקים"} setter={setCategory} data={dataCategories}/>
                    <div className='Suppliers-TitlePage'>{category}</div>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddSupplierDialog(true)}>הוסף ספק</button>
                </div>

                <Input type='text' className={"form-control w-25 p-1 mx-auto p-2"} placeholder='חיפוש ספק לפי שם' value={search} onChange={setSearch}/>
                
                {dataSuppliers.length &&
                    <Table data={dataSuppliers} values={["id", "שם", "טל", "מייל", "קטגוריה", "מוצר", "מחיר_ליחידה", "יחידה", "זמן_אספקה_בימים"]} category={category} allCategories={"כל הספקים"} search={search} updateFunction={updateSupplier} title={"עריכת ספק"}/>
                }
                {showAddSupplierDialog ? <AddSupplier OpenClose={openAddSupplierDialog} Token={token}/> : null}
                {showUpdateSupplierDialog ? <UpdateSupplier OpenClose={openUpdateSupplierDialog} SupplierToUpdate={supplierToUpdate} Token={token}/> : null} 

                </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </>

    );
}
export default Suppliers
