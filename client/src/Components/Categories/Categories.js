import React, { useEffect, useState } from 'react'
import './Categories.css'
import AddCategory from './AddCategory.js';
import UpdateCategory from './UpdateCategory.js';
import { useAuth } from '../../Context/UserContext.jsx';

function Categories() {

    const { access } = useAuth();

    const [dataStockCategories, setDataStockCategories] = useState([])
    const [dataMenusCategories, setDataMenusCategories] = useState([])
    const [dataDishesCategories, setDataDishesCategories] = useState([])
    const [category, setCategory] = useState('כל הקטגוריות')
    const [categoryToUpdate, setCategoryToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false)
    const [showUpdateCategoryDialog, setShowUpdateCategoryDialog] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus/categories`)
        .then(response => response.json())
        .then(data => setDataMenusCategories(data))
    }, [dataMenusCategories])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock/categories`)
        .then(response => response.json())
        .then(data => setDataStockCategories(data))
    }, [dataStockCategories])

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes/categories`)
        .then(response => response.json())
        .then(data => setDataDishesCategories(data))
    }, [dataDishesCategories])


    function updateSearch(event){
        setSearch(event.target.value)
    }

    function openAddCategoryDialog (){
        setShowAddCategoryDialog(!showAddCategoryDialog)
    }

    function openUpdateCategoryDialog (){
        setShowUpdateCategoryDialog(!showUpdateCategoryDialog)
    }

    function updateCategory(item){
        setShowUpdateCategoryDialog(true)
        setCategoryToUpdate(item)
    }

    return (
        <div className='Categories'>
            {access ?
            <div className='Categories-Page'>
                <div className='CategoriesPage-Buttons'>
                    <button className='CategoriesPage-AddCategory-Button' onClick={() => setShowAddCategoryDialog(true)}>הוסף קטגוריה</button>
                    <button className='CategoriesPage-Button' onClick={() => setCategory('קטגוריות מוצרים')}>קטגוריות מוצרים</button>
                    <button className='CategoriesPage-Button' onClick={() => setCategory('קטגוריות מנות')}>קטגוריות מנות</button>
                    <button className='CategoriesPage-Button' onClick={() => setCategory('קטגוריות תפריטים')}>קטגוריות תפריטים</button>
                    <button className='CategoriesPage-Button' onClick={() => setCategory('כל הקטגוריות')}>כל הקטגוריות</button>
                </div>
                <div className='Categories-TitlePage'>{category}</div>

                <div className='CategoriesPage-SearchBox'>
                    <input type='text' className='CategoriesPage-SearchBox-Input' placeholder='חיפוש קטגוריה לפי שם' value={search} onChange={updateSearch}></input>
                </div>
                {(dataStockCategories.length || dataDishesCategories.length || dataMenusCategories.length) &&
                    <div>
                        <div className='Categories-Headers'>
                            <div className='Categories-Header'> קטגוריה </div>
                            <div className='Categories-Header'> שם </div>
                        </div>
                            {dataStockCategories.map((item) => (
                                ((category === 'כל הקטגוריות' || category == item.קטגוריה) && (item.שם.includes(search))) &&
                            <button key={item.id} className='Categories-CategoryRow StockRow' onClick={() => updateCategory(item)}>
                                    <div className='Category-row-field'> {item.קטגוריה} </div>
                                    <div className='Category-row-field'> {item.שם} </div>
                            </button>
                            ))}
                            {dataDishesCategories.map((item) => (
                                ((category === 'כל הקטגוריות' || category == item.קטגוריה) && (item.שם.includes(search))) &&
                            <button key={item.id} className='Categories-CategoryRow DishRow' onClick={() => updateCategory(item)}>
                                    <div className='Category-row-field'> {item.קטגוריה} </div>
                                    <div className='Category-row-field'> {item.שם} </div>
                            </button>
                            ))}
                            {dataMenusCategories.map((item) => (
                                ((category === 'כל הקטגוריות' || category == item.קטגוריה) && (item.שם.includes(search))) &&
                            <button key={item.id} className='Categories-CategoryRow MenuRow' onClick={() => updateCategory(item)}>
                                    <div className='Category-row-field'> {item.קטגוריה} </div>
                                    <div className='Category-row-field'> {item.שם} </div>
                            </button>
                            ))}

                            {showAddCategoryDialog ? <AddCategory OpenClose={openAddCategoryDialog}/> : null}
                            {showUpdateCategoryDialog ? <UpdateCategory OpenClose={openUpdateCategoryDialog} CategoryToUpdate={categoryToUpdate}/> : null}                 
                    </div>}
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>
    );
}
export default Categories