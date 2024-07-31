import './SideBar.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import home_icon from '../../Images/home.png'
import login_icon from '../../Images/login.gif'
import customers_icon from '../../Images/customers.png'
import menus_icon from '../../Images/menus.png'
import dishes_icon from '../../Images/dishes.png'
import categories_icon from '../../Images/categories.png'
import stock_icon from '../../Images/stock.png'
import suppliers_icon from '../../Images/suppliers.png'
import employees_icon from '../../Images/employees.png'
import users_icon from '../../Images/users.png'
import statistics_icon from '../../Images/statistics.gif'
import alert_icon from '../../Images/alert.png'
import calendar_icon from '../../Images/calendar.png'
import messages_icon from '../../Images/messages.png'
import notes_icon from '../../Images/notes.png'

export default function Sidebar() {

    const navigate = useNavigate(); 

    const [dataStock, setDataStock] = useState([])
    const [dataSuppliersOrdersCalendar, setDataSuppliersOrdersCalendar] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/suppliersOrdersCalendar`)
        .then(response => response.json())
        .then(data => setDataSuppliersOrdersCalendar(data))
    }, [dataSuppliersOrdersCalendar])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [])

    function goToHome() {
        navigate('/');
      }

    function goToLogin() {
        navigate('/Login');
    }

    function goToTables() {
        navigate('/Tables');
      }
    
    function goToCustomers() {
        navigate('/Customers');
    }

    function goToStock() {
        navigate('/Stock');
      }

    function goToCategories() {
        navigate('/Categories');
      }

    function goToSuppliers() {
        navigate('/Suppliers');
    }

    function goToEmployees() {
        navigate('/Employees');
    }

    function goToMenus() {
        navigate('/Menus');
    }

    function goToUsers() {
        navigate('/Users');
    }

    function goToDishes() {
        navigate('/Dishes');
    }

    function goToStatistics() {
        navigate('/Statistics');
    }

    function goToCalendar() {
        navigate('/Calendar');
    }

    function goToMessages() {
        navigate('/Messages');
    }

    function goToNotes() {
        navigate('/Notes');
    }

    function goToSuppliersOrdersCalendar() {
        navigate('/SuppliersOrdersCalendar');
    }

    function goToSettings() {
        navigate('/Settings');
    }

    const alert = dataStock.find((product) =>  product.כמות < product.כמות_מינימלית);
    const messageAlert = dataSuppliersOrdersCalendar.find((message) =>  (message.readed == false) && (message.garbage == false) && (message.toSend == true));

    return(
        <div className='SideBar'>
            <div className='SideBar-Logo'>
                <span className='SideBar-Logo-Restaurant'>איזי</span><span className='SideBar-Logo-Easy'>קיטשן</span>
            </div>
            <button onClick={goToHome} className='SideBar-Button'><img className='SideBar-Icon' src={home_icon} /><span className='SideBar-Title'>עמוד ראשי</span></button>
            <button onClick={goToLogin} className='SideBar-Button'><img className='SideBar-Icon' src={login_icon} /><span className='SideBar-Title'>כניסה\יציאה</span></button>
            <button onClick={goToMenus} className='SideBar-Button'><img className='SideBar-Icon' src={menus_icon} /><span className='SideBar-Title'>תפריטים</span></button>
            <button onClick={goToDishes} className='SideBar-Button'><img className='SideBar-Icon' src={dishes_icon} /><span className='SideBar-Title'>מנות</span></button>
            <button onClick={goToStock} className='SideBar-Button'><img className='SideBar-Icon' src={stock_icon} /><span className='SideBar-Title'>מלאי</span>{alert &&<img className='alert-icon' src={alert_icon} title='מחסור במלאי !'/>}</button>
            <button onClick={goToCategories} className='SideBar-Button'><img className='SideBar-Icon' src={categories_icon} /><span className='SideBar-Title'>קטגוריות</span></button>
            <button onClick={goToSuppliers} className='SideBar-Button'><img className='SideBar-Icon' src={suppliers_icon} /><span className='SideBar-Title'>ספקים</span></button>
            <button onClick={goToCalendar} className='SideBar-Button'><img className='SideBar-Icon' src={calendar_icon} /><span className='SideBar-Title'>לוח תפריטים</span></button>
            <button onClick={goToSuppliersOrdersCalendar} className='SideBar-Button'><img className='SideBar-Icon' src={calendar_icon} /><span className='SideBar-Title'>לוח הזמנות</span></button>
            <button onClick={goToUsers} className='SideBar-Button'><img className='SideBar-Icon' src={users_icon} /><span className='SideBar-Title'>משתמשים</span></button>
            <button onClick={goToMessages} className='SideBar-Button'><img className='SideBar-Icon' src={messages_icon} /><span className='SideBar-Title'>הודעות</span>{messageAlert &&<img className='alert-icon' src={alert_icon} />}</button>
            <button onClick={goToNotes} className='SideBar-Button'><img className='SideBar-Icon' src={notes_icon} /><span className='SideBar-Title'>הערות</span></button>
            <button onClick={goToSettings} className='SideBar-Button'><img className='SideBar-Icon' src={customers_icon} /><span className='SideBar-Title'>הגדרות משתמש</span></button>
            <button onClick={goToEmployees} className='SideBar-Button'><img className='SideBar-Icon' src={employees_icon} /><span className='SideBar-Title'>Employees</span></button>
            <button onClick={goToStatistics} className='SideBar-Button'><img className='SideBar-Icon' src={statistics_icon} /><span className='SideBar-Title'>Statistics</span></button>
        </div>
    )
}