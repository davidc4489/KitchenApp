import React, { useEffect, useState, } from 'react'
import './AddProduct.css'

function AddProduct(props) {
   
    const [addValues, setAddValues] = useState({
        שם_מוצר: '',
        קטגוריה: '',
        ספק: '',
        יצרן: '',
        כמות: '',
        יחידה: '',
        כמות_מינימלית: ''
    });

    const [dataCategories, setDataCategories] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data.reverse()))
    }, [dataCategories])

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
            fetch('http://localhost:4000/api/stock/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddProduct-box'>
            <form className='AddProduct-Box-Content'>
                <div className='AddProduct-Title'>הוסף מוצר</div>
                <div className='AddProduct-InputBox'>
                    <label className='AddProduct-Label'>שם: </label>
                    <input className='AddProductPage-Input' type="text" name='שם_מוצר' value={addValues.שם_מוצר} onChange={updateData} required /> 
                    </div>
                    <label className='AddProduct-Label'>קטגוריה: </label>
                    <select name='קטגוריה' value={addValues.קטגוריה} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר קטגוריה</option>
                        {dataCategories.map((category) => 
                             <option value={category.שם}>{category.שם}</option>
                        )}
                    </select> 
                    <label className='AddProduct-Label'>כשרות: </label>
                    <select name='כשרות' value={addValues.כשרות} onChange={updateData}>
                        <option value=''>בחר כשרות</option> 
                        <option value='בשרי'>בשרי</option>                       
                        <option value='חלבי'>חלבי</option>
                        <option value='פרווה'>פרווה</option>                       
                    </select>
                     <label className='AddProduct-Label'>ספק: </label>
                    <input className='AddProductPage-Input' type="text" name='ספק' value={addValues.ספק} onChange={updateData} required/>
                    <label className='AddProduct-Label'>יצרן: </label>
                    <input className='AddProductPage-Input' type="text" name='יצרן' value={addValues.יצרן} onChange={updateData} required/>
                    <label className='AddProduct-Label'>כמות: </label>
                    <input className='AddProductPage-Input' type="number" name='כמות' value={addValues.כמות} onChange={updateData} required/>
                    <label className='AddProduct-Label'>יחידה: </label>
                    <select name='יחידה' value={addValues.יחידה} onChange={updateData} required pattern=".*\S+.*" title="יש למלא השדה">
                        <option value=''>בחר יחידה</option> 
                        <option value='ק"ג'>ק"ג</option>                       
                        <option value='ליטר'>ליטר</option>
                        <option value='יחידה'>יחידה</option>                                           
                     </select>
                    
                    <label className='AddProduct-Label'>כמות מינימלית: </label>
                    <input className='AddProductPage-Input' type="number" name='כמות_מינימלית' value={addValues.כמות_מינימלית} onChange={updateData} required/>
                

                    <div className='AddProduct-Buttons'>
                        <button className='AddProduct-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddProduct-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddProduct