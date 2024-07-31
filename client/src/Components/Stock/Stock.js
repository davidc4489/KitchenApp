import React, { useEffect, useState } from 'react'
import './Stock.css'
import AddProduct from './AddProduct.js';
import UpdateProduct from './UpdateProduct.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Table from '../Input/Table.jsx';

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
        <div className='Stock'>
            {access ?
            <div className='Stock-Page'>
                <div className='StockPage-Buttons'>
                    <button className='StockPage-AddProduct-Button' onClick={() => setShowAddProductDialog(true)}>הוסף מוצר</button>
                    {dataCategories?.map((item) => (
                            <button key={item.id} className='StockPage-Button' onClick={() => setCategory(item.שם)}>
                                {item.שם}
                            </button> 
                        ))}
                    <button className='StockPage-Button' onClick={() => setCategory('כל המוצרים')}>כל המוצרים</button>
                </div>
                <div className='Stock-TitlePage'>{category}</div>
                <div className='StockPage-SearchBox'>
                    <input type='text' className='StockPage-SearchBox-Input' placeholder='חיפוש מוצר לפי שם' value={search} onChange={updateSearch}></input>
                </div>
                {dataStock.length &&
                    <>     
                    <Table data={dataStock} values={["כמות_מינימלית", "יחידה", "כמות", "יצרן", "ספק", "כשרות", "קטגוריה", "שם"]} category={category} allCategories={"כל המוצרים"} search={search} updateFunction={updateProduct} />
                                
                    <div>
                        {showAddProductDialog ? <AddProduct OpenClose={openAddProductDialog}/> : null}
                        {showUpdateProductDialog ? <UpdateProduct OpenClose={openUpdateProductDialog} ProductToUpdate={productToUpdate}/> : null}   
                    </div>
                    </>
                    }
                </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </div>

    );
}
export default Stock
