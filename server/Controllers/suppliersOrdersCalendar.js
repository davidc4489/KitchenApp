import {getAll, add } from "./baseServer.js";
import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./database.db');

export const getSuppliersOrdersCalendar = async (req, res) => {
    let suppliersOrdersCalendarData = [] 
    await getAll("suppliersOrdersCalendar").then(data => suppliersOrdersCalendarData = data)
     return res.send(suppliersOrdersCalendarData)
}

export const getSuppliersOrdersMessages = async (req, res) => {
    let suppliersOrdersMessages = [] 
    const stockData = await getAll("stock");
    const suppliersData = await getAll("suppliers");
    let suppliersOrdersCalendarData = []
    await getAll("suppliersOrdersCalendar").then(data => suppliersOrdersCalendarData = data)

    suppliersOrdersCalendarData?.map(async (order) => {
        if (!order.placed){
            if (        
                new Date().getDate() === parseInt(order.day) &&
                new Date().toLocaleString('en-GB', { month: 'long' }) === order.month &&
                new Date().getFullYear() === parseInt(order.year)
                ) {
                    updateSending(order.id)
                }
            if (order.toSend == true) {
                    let newMessage = {
                        'id' : order.id,
                        'day' : order.day,
                        'month': order.month,
                        'year' : order.year,
                        'supplier' : suppliersData.find(supplier => supplier.שם === order.supplier).שם,
                        'product' : stockData.find(product => product.id === order.idProduct).שם_מוצר,
                        'amount' : order.amount,
                        'unity' : order.unity,
                        'placed' : order.placed,
                        'readed' : order.readed,
                        'garbage' : order.garbage
                    }
                    
                    suppliersOrdersMessages.push(newMessage)
                }
            }
        })
    return res.send(suppliersOrdersMessages)
}

export const addSupplierOrder = (req, res) => {
    let newData = {
        "day": req.body.day,
        "month": req.body.month,
        "year": req.body.year,
        "idProduct": req.body.idProduct,
        "amount": req.body.amount,
        "supplier": req.body.supplier
    }

    add('suppliersOrdersCalendar', newData);
    res.send({ message: 'Data added ' });
}

export const updateSupplierOrder= async (req,res) => {
    let suppliersOrdersCalendarData = [] 
    await getAll("suppliersOrdersCalendar").then(data => suppliersOrdersCalendarData = data)

    let orderToUpdate = suppliersOrdersCalendarData.find(order => order.id === parseInt(req.body.id))
    if(orderToUpdate){
        update(!orderToUpdate.readed, orderToUpdate.id, 'readed')
    }

    res.send({ message: 'Data for SUPPLIERSORDERSCALENDAR ${id} updated successfully' });
}

export const supplierOrderToGarbage= async (req,res) => {
    let suppliersOrdersCalendarData = [] 
    await getAll("suppliersOrdersCalendar").then(data => suppliersOrdersCalendarData = data)

    let orderToUpdate = suppliersOrdersCalendarData.find(order => order.id === parseInt(req.body.id))
    if(orderToUpdate){
        update(!orderToUpdate.garbage, orderToUpdate.id, 'garbage')
    }

    res.send({ message: 'Data for SUPPLIERSORDERSCALENDAR ${id} updated successfully' });
}

const update = ( readed, id, column ) => {
    const query = `UPDATE suppliersOrdersCalendar SET ${column} = ? WHERE id = ?`;
    
    db.run(query, readed, id, (err) => {
        if (err) {
            console.error('Error updating data:', err);
        } else {
            console.log(`Data updated successfully`);
        }
    });
};

const updateSending = ( id ) => {
    const query = `UPDATE suppliersOrdersCalendar SET toSend = ? WHERE id = ?`;
    
    db.run(query, true, id, (err) => {
        if (err) {
            console.error('Error updating data:', err);
        } else {
            // console.log(`Data updated successfully`);
        }
    });
};