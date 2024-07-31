import React from 'react'
import './Home.css'
import { useAuth } from '../../Context/UserContext.jsx';

export default function Home(){

    const { access } = useAuth();

    return (
        <div className="position-relative">
            <div className="Home-Titles">
                <div className="Home-FirstTitle">ברוכים הבאים לאיזי<span className="Home-LogoTitle">קיטשן</span> אפליקציה</div>
                <div className="Home-SecondTitle">האפליקציה המובילה לניהול מטבח</div>
                {/* If the user is not connected, message warning that access to data is not permitted */}
                {access === false && <div className="Home-ThirdTitle">נא להזדהות עבור גישה לנתונים</div>}
            </div>
        </div>
    )
}