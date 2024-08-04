import React, { useEffect, useState, } from 'react'
import './UpdateEvent.css'
import Input from '../../Tools/Input.jsx';
import Select from '../../Tools/Select.jsx';
import DeleteVerification from '../../Tools/DeleteVerification.jsx';
import Fetch from '../../Tools/Fetch.jsx';

function UpdateEvent (props) {

    const [dataMenus, setDataMenus] = useState([])
    const [dataMenusCalendar, setDataMenusCalendar] = useState([])

    const eventToUpdate = props.EventToUpdate

    const [day, setDay] = useState(eventToUpdate.day,);
    const [month, setMonth] = useState(eventToUpdate.month);
    const [year, setYear] = useState(eventToUpdate.year);
    const [idMenu, setIdMenu] = useState(0);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        Fetch(`http://localhost:4000/api/menus`, setDataMenus)
    }, [])

    useEffect(() => {
        Fetch(`http://localhost:4000/api/menusCalendar`, setDataMenusCalendar)
    }, [dataMenusCalendar])

    console.log("dataMenusCalendar", dataMenusCalendar)

    function saveData() {
        const updateValues = {
            day: day,
            month: month,
            year: year,
            idMenu: idMenu,
            amount: amount
        };

        // Vérifier si un élément similaire existe déjà
        const menuExists = dataMenusCalendar.some(menu => 
            menu.day == updateValues.day &&
            menu.month == updateValues.month &&
            menu.year == updateValues.year &&
            menu.idMenu == updateValues.idMenu &&
            menu.amount == updateValues.amount
        );

        // Si un élément similaire existe, ne rien faire
        if (menuExists) {
            console.log('No update required, identical element already exists.');
            return;
        }
        
        else {
            fetch(`http://localhost:4000/api/menusCalendar/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
        }
    }

    return (
        <>
            <form className='UpdateEvent-Box-Content shadow-lg p-3 mb-5 bg-body rounded'>
                <div className='UpdateEvent-Title'>עריכת תפריטי היום</div>
                <div className='UpdateEvent-InputBox'>
                    <label className='UpdateMenu-Label'>תפריט : </label>
                    <Select id='menu' value={idMenu} onChange={setIdMenu} title='בחר תפריט' optionValue='בחר תפריט' optionsToMap={dataMenus} valueToMap="id" valueToDisplay="שם"/>
                    <label className='UpdateMenu-Label'>כמות :</label>
                    <Input type="number" value={amount} onChange={setAmount}/>
                    <div className='menus-title'>: תפריטים</div>
                    <div className='add-ingredient-input'>
                        <table className='ingredient-table'>
                            <thead>
                                <tr>
                                    <th>תפריט</th>
                                    <th>כמות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from(dataMenusCalendar).map((currentMenu) => (
                                    dataMenus.map((menu) => (
                                        menu.id == currentMenu.idMenu && eventToUpdate.day == currentMenu.day &&
                                        eventToUpdate.month == currentMenu.month && eventToUpdate.year == currentMenu.year && (
                                            <tr className='menusList' key={currentMenu.idMenu}>
                                                <td>{menu.שם}</td>
                                                <td>{currentMenu.amount}</td>
                                            </tr>
                                        )
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='UpdateEvent-Buttons'>
                        <button className='UpdateMenu-Button btn btn-outline-danger' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateMenu-Button btn btn-danger' >מחיקת תפריט</button>
                        <input type='submit' value={'שמירה'} className='UpdateMenu-Button btn btn-outline-primary' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </>
    )
}

export default UpdateEvent