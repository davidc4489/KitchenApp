import React, { useEffect, useState } from 'react'
import './Messages.css'
import DeleteMessage from './DeleteMessage.js';
import { useAuth } from '../../Context/UserContext.jsx';
import Fetch from '../../Tools/Fetch.jsx';
import Dropdown from '../../Tools/Dropdown.jsx';

function Messages() {

    const { access } = useAuth();

    const [dataOrders, setDataOrders] = useState([])
    const [category, setCategory] = useState('כל ההודעות')
    const dataCategories = [
        {id: 1, שם: 'הודעות שלא נקראו'},
        {id: 2, שם: "הודעות שנקראו"},
        {id: 3, שם: "הודעות שנמחקו"}
    ]

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
        Fetch(`http://localhost:4000/api/suppliersOrdersCalendar/Messages`, setDataOrders)
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
        <>
            {access ?
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Dropdown title={"בחר סוג הודעה"} keyAll={"allMessages"} allValue={"כל ההודעות"} setter={setCategory} data={dataCategories} />
                    </div>
                    <h2 className="text-center">הודעות</h2>
                    {dataOrders?.length &&
                        <div>
                            <div className="row bg-primary text-white py-2 mb-2">
                                <div className="col-1">מחיקה</div>
                                <div className="col-1">קראתי</div>
                                <div className="col-10">הודעה</div>
                            </div>
                            {dataOrders.map((order, index) => (
                                ((category === 'כל ההודעות' && !order.garbage) ||
                                    (category === 'הודעות שנקראו' && order.readed && !order.garbage) ||
                                    (category === 'הודעות שלא נקראו' && !order.readed && !order.garbage) ||
                                    (category === 'הודעות שנמחקו' && order.garbage)) &&
                                <div key={order.id} className={`row py-2 mb-2 ${index % 2 === 0 ? 'bg-light' : 'bg-white'} ${!order.readed ? 'font-weight-bold' : ''}`}>
                                    <div className="col-1">
                                        <input type="checkbox" checked={order.garbage} onClick={() => deleteMessage(order)} />
                                    </div>
                                    <div className="col-1">
                                        <input type="checkbox" checked={order.readed} onChange={() => handleCheckboxChange(order)} />
                                    </div>
                                    <div className="col-10">
                                        {order.year} {order.month} {order.day}-תזכורת : יש להזמין {order.amount} {order.product} מ{order.supplier} ב
                                    </div>
                                </div>
                            ))}
                            {showMessageToDeleteDialog && <DeleteMessage OpenClose={openMessageToDeleteDialog} MessageToDelete={messageToDelete} />}
                        </div>}
                </div> :
                <div className="alert alert-warning text-center">נא להזדהות עבור גישה לנתונים</div>
            }
        </>
    );
}
export default Messages