import {getAll, add, update, remove} from "./baseServer.js";
import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./database.db');

export const getDishes = async (req, res) => {
    let dishesData = [] 
    await getAll("dishes").then(data => dishesData = data)
     return res.send(dishesData)
}

export const getCategories = async (req, res) => {
    let categoriesData = [] 
    await getAll("dishCategories").then(data => categoriesData = data)
     return res.send(categoriesData)
}

export const getIngredients = async (req, res) => {
    let ingredientsData
    await getFewItems ('dishIngredients', 'idDish', req.params.id).then(data => ingredientsData = data)
    return res.send(ingredientsData)
  }

const getFewItems = async (collection, search_column, id) => {
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

export const addDish = (req, res) => {
    let newData = {
        "שם": req.body.שם,
        "קטגוריה": req.body.קטגוריה,
        "כשרות": req.body.כשרות ? req.body.כשרות : null,
        "עלות": null
    }

    if (req.body.שם && req.body.קטגוריה){
        add('dishes', newData)};
    res.send({ message: 'Data added ' });
}

export const updateDish = async (req,res) => {

    let newData = {id:req.params.id}
    if (req.body.שם){ newData.שם = req.body.שם}
    if (req.body.קטגוריה){ newData.קטגוריה = req.body.קטגוריה}
    if (req.body.כשרות){ newData.כשרות = req.body.כשרות}
    if (req.body.עלות){ newData.עלות = req.body.עלות}
    
    if (req.body.שם && req.body.קטגוריה){
        update('dishes',newData)}

    let newIngredientsData = []
    
    if(req.body.ingredients){
        for(let i = 0; i < req.body.ingredients.length; i++) {
            let newIngredient = {}
            newIngredient.idDish = parseInt(req.params.id),
            req.body.ingredients[i].id&&
                (newIngredient.idIngredient = parseInt(req.body.ingredients[i].id)),
            newIngredient.כמות = parseInt(req.body.ingredients[i].amount),
            newIngredient.יחידה = req.body.ingredients[i].unity,
            newIngredientsData.push(newIngredient)
        }
        
        let dishData = []
        await getAll("dishIngredients").then(data => dishData = data)
        console.log(dishData)
        
        for(let i = 0; i < newIngredientsData.length; i++) {
            let currentDish = []
            currentDish = dishData.filter(item => (item.idDish == req.params.id && item.idIngredient == newIngredientsData[i].idIngredient))
            if(currentDish.length !== 0){
            updateDataIngredient('dishIngredients',newIngredientsData[i])
            }
            else{
            add('dishIngredients',newIngredientsData[i])
            }}
        }

    res.send({ message: 'Data for DISHES ${id} updated successfully' });
}

const updateDataIngredient = ( collection,data ) => {
    
    let keys = Object.keys(data)
    let values = Object.values(data)
    const query = `UPDATE ${collection} SET ${(keys.slice(1).map(key => `${key} = ?,`).join(' ').slice(0,-1))} WHERE (idDish = ? AND idIngredient = ?)`;
    
    db.run(query, [...values.slice(1),data.idDish, data.idIngredient], (err) => {
        if (err) {
            console.error('Error updating data:', err);
        } else {
            console.log(`Data for empid ${keys} updated successfully`);
        }
    });
  };

export const removeDish = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('dishes',id);
      res.status(200).send("Dish deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };