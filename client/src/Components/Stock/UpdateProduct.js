import React, { useEffect, useState, } from 'react'
import './UpdateProduct.css'

function UpdateProduct(props) {

    const productToUpdate = props.ProductToUpdate
    const [checked, setChecked] = useState(!productToUpdate.status)
   
    const [updateValues, setUpdateValues] = useState({
        שם_מוצר: productToUpdate.שם_מוצר,
        קטגוריה: productToUpdate.קטגוריה,
        כשרות: productToUpdate.כשרות,
        ספק:  productToUpdate.ספק,
        יצרן: productToUpdate.יצרן,
        כמות: productToUpdate.כמות,
        יחידה: productToUpdate.יחידה,
        כמות_מינימלית: productToUpdate.כמות_מינימלית
    });

    const [dataCategories, setDataCategories] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data.reverse()))
    }, [dataCategories])

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData() {
            fetch(`http://localhost:4000/api/stock/${productToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteProduct() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/stock/${productToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='UpdateProduct-box'>
            <form className='UpdateProduct-Box-Content'>
                <div className='UpdateProduct-Title'>עריכת מוצר</div>
                <div className='UpdateProduct-InputBox'>
                    <label className='UpdateProduct-Label'>שם: </label>
                    <input className='AddProductPage-Input' type="text" name='שם_מוצר' value={updateValues.שם_מוצר} onChange={updateData} required pattern=".*\S+.*" title="יש למלא השדה"/> 
                    <label className='AddProduct-Label'>קטגוריה: </label>
                    <select name='קטגוריה' value={updateValues.קטגוריה} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר קטגוריה</option>
                        {dataCategories.map((category) => 
                             <option value={category.שם}>{category.שם}</option>
                        )}
                    </select> 
                    <label className='AddProduct-Label'>כשרות: </label>
                    <select name='כשרות' value={updateValues.כשרות} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר כשרות</option> 
                        <option value='בשרי'>בשרי</option>                       
                        <option value='חלבי'>חלבי</option>
                        <option value='פרווה'>פרווה</option>                       
                    </select>
                    <label className='AddProduct-Label'>ספק: </label>
                    <input className='AddProductPage-Input' type="text" name='ספק' value={updateValues.ספק} onChange={updateData} required/>
                    <label className='AddProduct-Label'>יצרן: </label>
                    <input className='AddProductPage-Input' type="text" name='יצרן' value={updateValues.יצרן} onChange={updateData} required/>
                    <label className='AddProduct-Label'>כמות: </label>
                    <input className='AddProductPage-Input' type="number" name='כמות' value={updateValues.כמות} onChange={updateData} required/>
                    <label className='AddProduct-Label'>יחידה: </label>
                    <select name='יחידה' value={updateValues.יחידה} onChange={updateData}>
                        <option value='ק"ג'>ק"ג</option>                       
                        <option value='ליטר'>ליטר</option>
                        <option value='יחידה'>יחידה</option>                                           
                     </select>
                    <label className='AddProduct-Label'>כמות מינימלית: </label>
                    <input className='AddProductPage-Input' type="number" name='כמות_מינימלית' value={updateValues.כמות_מינימלית} onChange={updateData} required/>

                    <div className='UpdateProduct-Buttons'>
                        <button className='UpdateProduct-Button' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateProduct-Button' onClick={deleteProduct}>מחיקת מוצר</button>
                        <input type='submit' value={'שמירה'} className='UpdateProduct-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct