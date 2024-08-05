import React, { useEffect, useState } from 'react'
import './Categories.css'
import AddCategory from './AddCategory.js';
import UpdateCategory from './UpdateCategory.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Fetch from '../../Tools/Fetch.jsx';
import Dropdown from '../../Tools/Dropdown.jsx';
import Input from '../../Tools/Input.jsx';
import Table from '../../Tools/Table.jsx';

function Categories() {

    const { access, token } = useAuth();

    const [dataStockCategories, setDataStockCategories] = useState([])
    const [dataMenusCategories, setDataMenusCategories] = useState([])
    const [dataDishesCategories, setDataDishesCategories] = useState([])
    const [allCategories, setAllCategories] = useState([]);
    const mainCategories = [{id: 1, שם: "קטגוריות מוצרים"}, {id: 2, שם: "קטגוריות מנות"}, {id: 3, שם: "קטגוריות תפריטים"}]

    const [category, setCategory] = useState('כל הקטגוריות')
    const [categoryToUpdate, setCategoryToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false)
    const [showUpdateCategoryDialog, setShowUpdateCategoryDialog] = useState(false)

    useEffect(() => {
        Fetch(`http://localhost:4000/api/menus/categories`, setDataMenusCategories, token)
    }, [dataMenusCategories])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock/categories`, setDataStockCategories, token)
    }, [dataStockCategories])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/dishes/categories`, setDataDishesCategories, token)
    }, [dataDishesCategories])

    useEffect(() => {
        const combinedCategories = [
            ...dataStockCategories.map(cat => ({ ...cat, id: `stock-${cat.id}`, originalId: cat.id })),
            ...dataMenusCategories.map(cat => ({ ...cat, id: `menu-${cat.id}`, originalId: cat.id })),
            ...dataDishesCategories.map(cat => ({ ...cat, id: `dish-${cat.id}`, originalId: cat.id }))
        ];

        // Using a Set to remove duplicates
        const uniqueCategories = Array.from(new Set(combinedCategories.map(cat => cat.שם)))
            .map(name => {
                return combinedCategories.find(cat => cat.שם === name);
            });

        setAllCategories(uniqueCategories);
    }, [dataStockCategories, dataMenusCategories, dataDishesCategories]);

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
        <>
            {access ?
            <div className='Categories-Page'>
                <div className='CategoriesPage-Buttons'>
                    <Dropdown title={"בחר סוג קטגוריה"} keyAll={"allCategories"} allValue={"כל הקטגוריות"} setter={setCategory} data={mainCategories}/>
                    <div className='Categories-TitlePage'>{category}</div>
                    <button className='btn btn-secondary' onClick={() => setShowAddCategoryDialog(true)}>הוסף קטגוריה</button>
                </div>

                <Input type='text' className={"form-control w-25 p-1 mx-auto p-2"} placeholder='חיפוש קטגוריה לפי שם' value={search} onChange={setSearch}/>
                
                {(dataStockCategories.length || dataDishesCategories.length || dataMenusCategories.length) &&  
                    <Table data={allCategories} values={["שם","קטגוריה"]} category={category} allCategories={"כל הקטגוריות"} search={search} updateFunction={updateCategory} title={"עריכת קטגוריה"}/>
                } 

                {showAddCategoryDialog ? <AddCategory OpenClose={openAddCategoryDialog} Token={token}/> : null}
                {showUpdateCategoryDialog ? <UpdateCategory OpenClose={openUpdateCategoryDialog} CategoryToUpdate={categoryToUpdate} Token={token}/> : null}  
                
                </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </>
    );
}
export default Categories