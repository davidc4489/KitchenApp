import React, { useEffect, useState } from 'react'
import '../Messages/Messages.css'
import { useAuth } from '../../Context/UserContext.jsx';

function Settings() {

    const { access } = useAuth();

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

                <div className='Messages-TitlePage'>הגדרות משתמש</div>
                    <div>
                        <label className='AddProduct-Label'>עבור כל הזמנה, לשלוח הודעת תזכורת </label>
                        <input className='AddProductPage-Input' type="number" name='כמות'  required/>
                        <label className='AddProduct-Label'>ימים לפני מועד ההזמנה </label>
                    </div>
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>
    );
}
export default Settings