import React, { useEffect, useState } from 'react'
import './Suppliers.css'
import AddSupplier from './AddSupplier.js';
import UpdateSupplier from './UpdateSupplier.js';
import { useAuth } from '../../Context/UserContext.jsx';

function Suppliers() {

    const { access } = useAuth();

    const [dataSuppliers, setDataSuppliers] = useState([])
    const [category, setCategory] = useState('כל הספקים')
    const [supplierToUpdate, setSupplierToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddSupplierDialog, setShowAddSupplierDialog] = useState(false)
    const [showUpdateSupplierDialog, setShowUpdateSupplierDialog] = useState(false)

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
        <div className='Suppliers'>
            {access ?
            <div className='Stock-Page'>
                <div className='SuppliersPage-Buttons'>
                    <button className='SuppliersPage-AddSupplier-Button' onClick={() => setShowAddSupplierDialog(true)}>הוסף ספק</button>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('סכו"ם')}>סכו"ם</button>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('שתיה')}>שתיה</button>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('אוכל')}>אוכל</button>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('כל הספקים')}>כל הספקים</button>
                </div>
                <div className='Suppliers-TitlePage'>{category}</div>
                <div className='SuppliersPage-SearchBox'>
                    <input type='text' className='SuppliersPage-SearchBox-Input' placeholder='חיפוש ספק לפי שם' value={search} onChange={updateSearch}></input>
                </div>
                {dataSuppliers.length &&
                    <div>
                        <div className='Suppliers-Headers'>
                            <div className='Suppliers-Header'> זמן אספקה בימים </div>
                            <div className='Suppliers-Header'> יחידה </div>
                            <div className='Suppliers-Header'> מחיר ליחידה </div>
                            <div className='Suppliers-Header'> מוצר </div>
                            <div className='Suppliers-Header'> קטגוריה</div>
                            <div className='Suppliers-Header'> מייל </div>
                            <div className='Suppliers-Header'> טל </div>
                            <div className='Suppliers-Header'> שם </div>
                            <div className='Suppliers-Header'> Id </div>
                        </div>
                            {dataSuppliers.map((item) => (
                                ((category === 'כל הספקים' || category == item.קטגוריה) && (item.שם.includes(search))) &&
                            <button key={item.id} className='Suppliers-SupplierRow' onClick={() => updateSupplier(item)} title='עריכת ספק'>
                                <div className='Suppliers-row-field'> {item.זמן_אספקה_בימים} </div>
                                <div className='Suppliers-row-field'> {item.יחידה} </div>
                                <div className='Suppliers-row-field'> {item.מחיר_ליחידה} </div>
                                <div className='Suppliers-row-field'> {item.מוצר} </div>
                                <div className='Suppliers-row-field'> {item.קטגוריה} </div>
                                <div className='Suppliers-row-field'> {item.מייל} </div>
                                <div className='Suppliers-row-field'> {item.טל} </div>
                                <div className='Suppliers-row-field'> {item.שם} </div>
                                <div className='Suppliers-row-field'> {item.id} </div>
                            </button>))}

                            {showAddSupplierDialog ? <AddSupplier OpenClose={openAddSupplierDialog}/> : null}
                            {showUpdateSupplierDialog ? <UpdateSupplier OpenClose={openUpdateSupplierDialog} SupplierToUpdate={supplierToUpdate}/> : null} 
                    </div>}
                </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </div>

    );
}
export default Suppliers
