import React, { useEffect, useState, } from 'react'
import './UpdateProduct.css'
import Fetch from '../../Tools/Fetch';
import Input from '../../Tools/Input';
import Select from '../../Tools/Select';
import DeleteVerification from '../../Tools/DeleteVerification.jsx';

function UpdateProduct(props) {

    const productToUpdate = props.ProductToUpdate

    const [name, setName] = useState(productToUpdate.שם);
    const [category, setCategory] = useState(productToUpdate.קטגוריה);
    const [kashrut, setKashrut] = useState(productToUpdate.כשרות);
    const [supplier, setSupplier] = useState(productToUpdate.ספק);
    const [maker, setMaker] = useState(productToUpdate.יצרן);
    const [quantity, setQuantity] = useState(productToUpdate.כמות);
    const [unit, setUnit] = useState(productToUpdate.יחידה);
    const [minimalQuantity, setMinimalQuantity] = useState(productToUpdate.כמות_מינימלית);

    const [dataCategories, setDataCategories] = useState([])
    const kashrutCategories = [{שם: "בשרי"},{שם: "חלבי"},{שם: "פרווה"}]
    const unitsCategories = [{שם: 'ק"ג'},{שם: "ליטר"},{שם: "יחידה"}]

    const [deleteProductBox, setDeleteProductBox] = useState(false)

    useEffect(() => {
        Fetch(`http://localhost:4000/api/stock/categories`, setDataCategories)
    }, [dataCategories])

    function saveData() {
        const updateValues = {
            שם: name,
            קטגוריה: category,
            כשרות: kashrut,
            ספק: supplier,
            יצרן: maker,
            כמות: quantity,
            יחידה: unit,
            כמות_מינימלית: minimalQuantity
        };
        fetch(`http://localhost:4000/api/stock/${productToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()
    })}

    function deleteProductDisplay(event) {
        event.preventDefault();
        setDeleteProductBox(true);
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
        <>
        <form className='UpdateProduct-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
            <div className='UpdateProduct-Title'>עריכת מוצר</div>
            <div className='UpdateProduct-InputBox'>
                <label className='UpdateProduct-Label'>שם :</label>
                <Input type="text" value={name} onChange={setName}/>
                <label className='UpdateProduct-Label'>קטגוריה :</label>
                <Select id='category' value={category} onChange={setCategory} title='בחר קטגוריה' optionValue='' optionsToMap={dataCategories} valueToMap="שם"/>
                <label className='UpdateProduct-Label'>כשרות :</label>
                <Select id='kashrut' value={kashrut} onChange={setKashrut} title='בחר כשרות' optionValue='' optionsToMap={kashrutCategories} valueToMap="שם"/>
                <label className='UpdateProduct-Label'>ספק: </label>
                <Input type="text" value={supplier} onChange={setSupplier}/>
                <label className='UpdateProduct-Label'>יצרן: </label>
                <Input type="text" value={maker} onChange={setMaker}/>
                <label className='UpdateProduct-Label'>כמות: </label>
                <Input type="number" value={quantity} onChange={setQuantity}/>
                <label className='UpdateProduct-Label'>יחידה: </label>
                <Select id='unit' value={unit} onChange={setUnit} title="בחר יחידה" optionValue='' optionsToMap={unitsCategories} valueToMap="שם"/>
                <label className='UpdateProduct-Label'>כמות מינימלית: </label>
                <Input type="number" value={minimalQuantity} onChange={setMinimalQuantity}/>
            </div>
            <div className='UpdateProduct-Buttons'>
                <button className='AddDish-Button btn btn-outline-danger' onClick={deleteProductDisplay}>מחיקת מוצר</button>
                <input type='submit' value={'שמירה'} className='AddDish-Button btn btn-outline-primary' onClick={saveData}></input>
                <button className='AddDish-Button btn btn-outline-secondary' onClick={props.OpenClose}>ביטול</button>
            </div>
        </form>
        {deleteProductBox ? <DeleteVerification deleteFunction={deleteProduct} OpenClose={props.OpenClose} CloseBox={setDeleteProductBox} Text={"? למחוק את המוצר"}/> : null}
        </>
    )
}

export default UpdateProduct