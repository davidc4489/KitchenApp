import React, { useEffect, useState } from 'react'
import './Stock.css'
import AddProduct from './AddProduct.js';
import UpdateProduct from './UpdateProduct.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Table from '../Input/Table.jsx';
import Dropdown from '../Input/Dropdown.jsx';
import Input from '../Input/Input.jsx';

function Stock() {

    const { access } = useAuth();

    const [dataStock, setDataStock] = useState([])
    const [category, setCategory] = useState('כל המוצרים')
    const [dataCategories, setDataCategories] = useState([])
    const [productToUpdate, setProductToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddProductDialog, setShowAddProductDialog] = useState(false)
    const [showUpdateProductDialog, setShowUpdateProductDialog] = useState(false)

    function openAddProductDialog (){
        setShowAddProductDialog(!showAddProductDialog)
    }

    function openUpdateProductDialog (){
        setShowUpdateProductDialog(!showUpdateProductDialog)
    }

    function updateProduct(item){
        setShowUpdateProductDialog(true)
        setProductToUpdate(item)
    }

    function updateSearch(event){
        setSearch(event.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [dataStock])

    useEffect(() => {
        fetch(`http://localhost:4000/api/menusCalendar/updateStock`)
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data))
    }, [dataCategories])


    return (
        <>
            {access ?
            <div className='Stock-Page'>
                <div className='StockPage-Buttons'>
                    <Dropdown title={"בחר סוג מוצר"} keyAll={"allProducts"} allValue={"כל המוצרים"} setter={setCategory} data={dataCategories}/>
                    <div className='Stock-TitlePage'>{category}</div>
                    <button className='StockPage-AddProduct-Button' onClick={() => setShowAddProductDialog(true)}>הוסף מוצר</button>
                </div>

                <Input type='text' className={"form-control w-25 p-1 mx-auto p-2"} placeholder='חיפוש מוצר לפי שם' value={search} onChange={setSearch}/>

                {dataStock.length &&  
                    <Table data={dataStock} values={["שם","קטגוריה", "כשרות", "ספק", "יצרן", "כמות", "יחידה", "כמות_מינימלית"]} category={category} allCategories={"כל המוצרים"} search={search} updateFunction={updateProduct} title={"עריכת מוצר"}/>
                }               
        
                {showAddProductDialog ? <AddProduct OpenClose={openAddProductDialog}/> : null}
                {showUpdateProductDialog ? <UpdateProduct OpenClose={openUpdateProductDialog} ProductToUpdate={productToUpdate}/> : null}   

            </div>:
            <div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </>

    );
}
export default Stock
