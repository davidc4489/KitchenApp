import React, { useState, useEffect } from 'react';
import './Calendar.css';
import UpdateEvent from './UpdateEvent';
import {toJewishDate, formatJewishDateInHebrew, toHebrewJewishDate } from "jewish-date";
import {HebrewCalendar, Location} from '@hebcal/core';
import { useAuth } from '../../Context/UserContext.jsx';


function SuppliersOrdersCalendar() {

    const { access } = useAuth();
    
    const [dataSuppliersOrdersCalendar, setDataSuppliersOrdersCalendar] = useState([])
    const [dataStock, setDataStock] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/suppliersOrdersCalendar`)
        .then(response => response.json())
        .then(data => setDataSuppliersOrdersCalendar(data))
    }, [dataSuppliersOrdersCalendar])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [dataStock])

    function isMatchingDate(DataDate, CalendarDate) {
        return (
            parseInt(DataDate.day) === parseInt(CalendarDate.day) &&
            DataDate.month === CalendarDate.month &&
            parseInt(DataDate.year) === parseInt(CalendarDate.year))
    }

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [Boxes, setBoxes] = useState([]);
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'
                    ];

    const UP_MONTH = 'upmonth';
    const DOWN_MONTH = 'downmonth';

    const [eventToUpdate, setEventToUpdate] = useState(null)
    const [showUpdateEventDialog, setShowUpdateEventDialog] = useState(false)

    function openUpdateEventDialog (){
        setShowUpdateEventDialog(!showUpdateEventDialog)
    }

    function updateEvent(item){
        setShowUpdateEventDialog(true)
        setEventToUpdate(item)
    }

    useEffect(() => {
            if(access){
            const updateCalendar = () => {
            const monthNb = month + 12 * (year - 2020);
            let cld = [{ daystart: 3, length: 31, year: 2020, month: 'January' }];

            for (let i = 0; i < monthNb; i++) {
                let yearSimule = 2020 + Math.floor(i / 12);
                const monthsSimuleLength = [31, getFevrierLength(yearSimule), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                let monthSimuleIndex = (i + 1) - (yearSimule - 2020) * 12;

                cld[i + 1] = {
                    daystart: (cld[i].daystart + monthsSimuleLength[monthSimuleIndex - 1]) % 7,
                    length: monthsSimuleLength[monthSimuleIndex],
                    year: 2020 + Math.floor((i + 1) / 12),
                    month: monthName[monthSimuleIndex],
                    monthIndex: (monthSimuleIndex + 1).toString().padStart(2, '0')
                    };

                if (cld[i + 1].month === undefined) {
                    cld[i + 1].month = 'janvier';
                    cld[i + 1].monthIndex = '01';
                    cld[i + 1].length = 31;
                }
            }

            const updatedBoxes = Array.from({ length: 42 }, (_, i) => {
                const day = i + 1 - cld[cld.length - 1].daystart;
                const adjustedDay = day > 0 && day <= cld[cld.length - 1].length ? day : '';
                const options = {
                    start: new Date(cld[cld.length - 1].year, cld[cld.length - 1].monthIndex - 1, adjustedDay),
                    end: new Date(cld[cld.length - 1].year, cld[cld.length - 1].monthIndex - 1, adjustedDay),
                    isHebrewYear: false,
                    candlelighting: false,
                    location: Location.lookup('San Francisco'),
                    sedrot: true,
                    omer: true,
                    };
                    const events = HebrewCalendar.calendar(options);
                    let eventDay
                
                    for (const ev of events) {
                        const hd = ev.getDate();
                        const date = hd.greg();
                        eventDay = ev.render('he-x-NoNikud');
                    }
                    
                return adjustedDay ? {
                    day: adjustedDay,
                    month: cld[cld.length - 1].month,
                    year: cld[cld.length - 1].year,
                    monthIndex: cld[cld.length - 1].monthIndex,
                    date: new Date(cld[cld.length - 1].year, cld[cld.length - 1].monthIndex - 1, adjustedDay).toLocaleDateString(),
                    hebrewDate: formatJewishDateInHebrew(toJewishDate(new Date(cld[cld.length - 1].year, cld[cld.length - 1].monthIndex - 1, adjustedDay))),
                    event : eventDay
                } : 
                    '';
            });

            setBoxes(updatedBoxes);
            const jewishDate = toHebrewJewishDate(toJewishDate(new Date(cld[cld.length - 1].year, cld[cld.length - 1].monthIndex - 1, 1)))
            document.getElementById('cldt').innerText = `${cld[cld.length - 1].month.toLocaleUpperCase()} ${cld[cld.length - 1].year} / ${jewishDate.monthName} ${jewishDate.year}`;
        };

        updateCalendar();
    }}, [month, year]);

    const CALENDRIER_REDUCER = (action) => {
        switch (action) {
        case UP_MONTH:
            if (month < 12) setMonth(month + 1);
            else {
                setYear(year + 1);
                setMonth(1);
            }
            break;

        case DOWN_MONTH:
            if (month > 1) setMonth(month - 1);
            else {
                setYear(year - 1);
                setMonth(12);
            }
            break;

        default:
            break;
        }
    };

    const getFevrierLength = (year) => {
        if (year % 4 === 0) return 29;
        else return 28;
    };

    return (
        <div className='Calendar'>
            {access ?
            <section id="cld">
                <section id="enteteCld">
                    <h1 id="cldt">January</h1>
                    <section id="avantEtApres">
                        <button id="apres" className="cldBtn" onClick={() => CALENDRIER_REDUCER(UP_MONTH)}>&lt;</button>
                        <button id="avant" className="cldBtn" onClick={() => CALENDRIER_REDUCER(DOWN_MONTH)}>&gt;</button>
                    </section>
                </section>
                <section id="cldBoite">
                    <div id="days">
                    <div className="day">ראשון</div>
                        <div className="day">שני</div>
                        <div className="day">שלישי</div>
                        <div className="day">רביעי</div>
                        <div className="day">חמישי</div>
                        <div className="day">שישי</div>
                        <div className="day">שבת</div>
                    </div>
                    {Array.from({ length: 6 }, (_, i) => (
                        <div key={`week${i + 1}`} className="week">
                            {Boxes.slice(i * 7, (i + 1) * 7).map((value, index) => (
                                <div key={`case${i * 7 + index}`} className="case">
                                    {value.day && (
                                        <button className='case-button' onClick={() => updateEvent(value)}>
                                            <div>{value.day}</div>
                                            <div>{value.hebrewDate}</div>
                                            <div>{value.event}</div>
                                            {dataSuppliersOrdersCalendar.map((date) => (
                                                (isMatchingDate(date, value))&&
                                                (dataStock.map((product) => (
                                                    (product.id === date.idProduct)) &&
                                                        <div className='todayMenu'>{date.amount} {product.שם} {date.supplier}</div>
                                                ))))}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    {showUpdateEventDialog ? <UpdateEvent OpenClose={openUpdateEventDialog} EventToUpdate={eventToUpdate}/> : null}  
                </section>
            </section>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>
    );
    }

export default SuppliersOrdersCalendar;