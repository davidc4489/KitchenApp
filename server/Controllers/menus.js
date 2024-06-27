import {getAll, add, update, remove} from "./baseServer.js";
import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./database.db');

export const getMenus = async (req, res) => {
    let menuData = [] 
    await getAll("menus").then(data => menuData = data)
     return res.send(menuData)
}

export const getCategories = async (req, res) => {
    let categoriesData = [] 
    await getAll("menuCategories").then(data => categoriesData = data)
     return res.send(categoriesData)
}

export const getDishes = async (req, res) => {
    let dishesData
    await getFewItems ('menuDishes', 'idMenu', req.params.id).then(data => dishesData = data)
    return res.send(dishesData)
  }

export const getFewItems = async (collection, search_column, id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${collection} WHERE ${search_column} = ?`;
        db.all(query, id, (err, row) => {
            if (err) {
                console.error('Error fetching data:', err);
                reject(err);
            } else {
                resolve(row);
            }
        });;
    }).then(data => {
        return data
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

export const addMenu = (req, res) => {
    let newData = {
        "שם": req.body.שם,
        "קטגוריה": req.body.קטגוריה,
        "כשרות": req.body.כשרות ? req.body.כשרות : null,
        "עלות": null
    }

    if (req.body.שם && req.body.קטגוריה){
        add('menus', newData)};
    res.send({ message: 'Data added ' });
}

export const updateMenu = async(req,res) => {
    let newData = {id:req.params.id}
    if (req.body.שם){ newData.שם = req.body.שם}
    if (req.body.קטגוריה){ newData.קטגוריה = req.body.קטגוריה}
    if (req.body.כשרות){ newData.כשרות = req.body.כשרות}
    if (req.body.עלות){ newData.עלות = req.body.עלות}
    
    if (req.body.שם && req.body.קטגוריה){
        update('menus',newData)}

    let newDishesData = []

    console.log("req.body.dishes", req.body)

    if(req.body.dishes){
        for(let i = 0; i < req.body.dishes.length; i++) {
            let newDish = {}
            newDish.idMenu = parseInt(req.params.id),
            req.body.dishes[i].id&&
                (newDish.idDish = parseInt(req.body.dishes[i].id))
            newDishesData.push(newDish)
        }
        
        let menuData = []
        await getAll("menuDishes").then(data => menuData = data)
        clearingMenuDishes("menuDishes")
        
        for(let i = 0; i < newDishesData.length; i++) {
            let currentMenu = []
            currentMenu = menuData.filter(item => (item.idMenu == req.params.id && item.idDish == newDishesData[i].idDish))
            // if(currentMenu.length !== 0){
            // updateMenuDish('menuDishes',newDishesData[i])
            // }
            // else{
            add('menuDishes',newDishesData[i])
            // }
        }
        }
    
    res.send({ message: 'Data for MENUS ${id} updated successfully' });
}

const clearingMenuDishes = (collection) => {
    const clearingQuery = `DELETE FROM ${collection}`;
    db.run(clearingQuery);
}

const updateMenuDish = ( collection,data ) => {
    
    let keys = Object.keys(data)
    let values = Object.values(data)

    const query = `UPDATE ${collection} SET ${(keys.slice(1).map(key => `${key} = ?,`).join(' ').slice(0,-1))} WHERE (idMenu = ? AND idDish = ?)`;
    
    db.run(query, [...values.slice(1),data.idMenu, data.idDish], (err) => {
        if (err) {
            console.error('Error updating data:', err);
        } else {
            console.log(`Data for empid ${keys} updated successfully`);
        }
    });
  };

export const removeMenu = (req, res) => {
    const id = req.body.id;
    console.log("id to remove :", req.body.id)
    
    try {
      remove('menus',id);
      res.status(200).send("Menu deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };