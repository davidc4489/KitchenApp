import React, { useEffect, useState } from 'react'
import './Messages.css'
import DeleteMessage from './DeleteMessage.js';
import { useAuth } from '../../Context/UserContext.jsx';

function Messages() {

    const { access } = useAuth();

    const [dataOrders, setDataOrders] = useState([])
    const [category, setCategory] = useState('כל ההודעות')

    const [messageToDelete, setMessageToDelete] = useState(null)
    const [showMessageToDeleteDialog, setShowMessageToDeleteDialog] = useState(false)

    function openMessageToDeleteDialog (){
        setShowMessageToDeleteDialog(!showMessageToDeleteDialog)
    }

    function deleteMessage(item){
        setShowMessageToDeleteDialog(true)
        setMessageToDelete(item)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/suppliersOrdersCalendar/Messages`)
        .then(response => response.json())
        .then(data => setDataOrders(data))
    }, [dataOrders])

    const handleCheckboxChange = (order) => {
        let id = order.id
        fetch(`http://localhost:4000/api/suppliersOrdersCalendar/readed`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        })
            .then(response => {response.json()})
    };

    return (
        <div className='Messages'>
            {access ?
            <div className='Messages-Page'>
                <div className='MenusPage-Buttons'>
                    <button className='MenusPage-Button' onClick={() => setCategory('הודעות שנמחקו')}>הודעות שנמחקו </button> 
                    <button className='MenusPage-Button' onClick={() => setCategory('הודעות שלא נקראו')}>הודעות שלא נקראו </button>
                    <button className='MenusPage-Button' onClick={() => setCategory('הודעות שנקראו')}>הודעות שנקראו </button>
                    <button className='MenusPage-Button' onClick={() => setCategory('כל ההודעות')}>כל ההודעות </button>
                </div>
                <div className='Messages-TitlePage'>הודעות</div>
                {dataOrders?.length &&
                    <div>
                        <div className='Messages-Headers'>
                            <div className='Messages-Header-Readed'> מחיקה </div>
                            <div className='Messages-Header-Readed'> קראתי </div>
                            <div className='Messages-Header-Messages'> הודעה </div>
                        </div>
                            {dataOrders.map((order) => (
                                ((category === 'כל ההודעות') && ((order.garbage) == false) ||
                                (category === 'הודעות שנקראו' && (order.readed) == true && (order.garbage) == false) ||
                                (category === 'הודעות שלא נקראו' && (order.readed) == false && (order.garbage) == false) ||
                                (category === 'הודעות שנמחקו' && (order.garbage) == true))
                                &&
                            <div key={order.id} className={`Messages-MessageRow ${!order.readed ? 'bold-text' : ''}`} title='פרטי המנות \ עריכת תפריט'>
                                    <input className='Messages-MessageRow-Checkbox' type="checkbox" name={`checkbox-${order.id}`} checked={order.garbage} onClick={() => deleteMessage(order)} />
                                    <input className='Messages-MessageRow-Checkbox' type="checkbox" name={`checkbox-${order.id}`} checked={order.readed} onChange={() => handleCheckboxChange(order)} />
                                    <div className='Messages-MessageRow-Message'>{order.year} {order.month} {order.day}-תזכורת : יש להזמין {order.amount} {order.product} מ{order.supplier} ב</div>
                            </div>
                            ))}
                            {showMessageToDeleteDialog ? <DeleteMessage OpenClose={openMessageToDeleteDialog} MessageToDelete={messageToDelete}/> : null} 
                    </div>}
                </div>:<div className='NoAccessAlert'>נא להזדהות עבור גישה לנתונים</div>}
        </div>
    );
}
export default Messages