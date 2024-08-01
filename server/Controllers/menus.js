import {getAll, add, update, remove} from "./baseServer.js";
import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./database.db');

// Recupere les donnees des menus
export const getMenus = async (req, res) => {
    let menuData = [] 
    await getAll("menus").then(data => menuData = data)
     return res.send(menuData)
}

// Recupere les differentes categories de menus 
export const getCategories = async (req, res) => {
    let categoriesData = [] 
    await getAll("menuCategories").then(data => categoriesData = data)
     return res.send(categoriesData)
}

// Recupere tous les plats d'un menu
export const getDishes = async (req, res) => {
    let dishesData
    await getFewItems ('menuDishes', 'idMenu', req.params.id).then(data => dishesData = data)
    return res.send(dishesData)
  }

// Recupere plusieurs elements d'un tableau suivant les arguments recus en parametre
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

// Ajoute un nouveau menu d'apres les donnees fournies par l'utilisateur
export const addMenu = (req, res) => {
    let newData = {
        "שם": req.body.שם,
        "קטגוריה": req.body.קטגוריה,
        "כשרות": "פרווה",
        "עלות": 0
    }

    if (req.body.שם && req.body.קטגוריה){
        add('menus', newData)};
    res.send({ message: 'Data added ' });
}

// Mise a jour d'un menu d'apres les donnees fournies par l'utilisateur
export const updateMenu = async (req, res) => {
    // Récupère les nouvelles données du menu fournies par l'utilisateur
    let newData = {id:req.params.id}
    if (req.body.שם){ newData.שם = req.body.שם}
    if (req.body.קטגוריה){ newData.קטגוריה = req.body.קטגוריה}
    if (req.body.כשרות){ newData.כשרות = req.body.כשרות}
    if (req.body.עלות){ newData.עלות = req.body.עלות}
    
    if (req.body.שם && req.body.קטגוריה){
        update('menus',newData)}

    // Récupère les nouvelles données des plats du menu fournies par l'utilisateur
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
        
        // Récupère les données des ingrédients des plats de la base de données
        let menuData = []
        await getAll("menuDishes").then(data => menuData = data)
        clearingMenuDishes("menuDishes")
        
        for(let i = 0; i < newDishesData.length; i++) {
            let currentMenu = []
            currentMenu = menuData.filter(item => (item.idMenu == parseInt(req.params.id) && item.idDish == newDishesData[i].idDish))
            await add('menuDishes',newDishesData[i])
        }

        // Mise à jour de la cacherout du menu après toutes les opérations d'ajout ou de mise à jour
        updateKashrutMenu("menu", req.params.id);
    }
    
    res.send({ message: 'Data for MENUS ${id} updated successfully' });
}

const clearingMenuDishes = (collection) => {
    const clearingQuery = `DELETE FROM ${collection}`;
    db.run(clearingQuery);
}

const runKashrutQuery = (query, params, successMessage) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                console.log(successMessage);
                resolve();
            }
        });
    });
};

const updateKashrutMenu = async (collection, idMenu) => {
    try {
        // Requête pour récupérer tous les plats du menu avec idMenu
        const getDishesQuery = `SELECT * FROM menuDishes WHERE idMenu = ?`;
        const dishes = await new Promise((resolve, reject) => {
            db.all(getDishesQuery, [idMenu], (err, rows) => {
                if (err) {
                    console.error('Error fetching dishes:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        // Vérifiez si le tableau de plats est vide et initialisation de la cacherout par defaut si c'est le cas
        if (dishes.length === 0) {
            await runKashrutQuery(
                `UPDATE menus SET כשרות = ? WHERE id = ?`,
                ["פרווה", idMenu],
                `Kashrut Data for id ${idMenu} updated successfully`
            );
            console.log("Vide");
            return;
        }

        // Vérifier chaque plat
        for (let dish of dishes) {
            // Requête pour récupérer le type du plat du tableau des plats
            const getDishesQuery = `SELECT כשרות FROM dishes WHERE id = ?`;
            const currentDish = await new Promise((resolve, reject) => {
                db.get(getDishesQuery, [dish.idDish], (err, row) => {
                    if (err) {
                        console.error('Error fetching dish type:', err);
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            });

            // Vérifiez si le type de produit est "lait" ou "viande" et mise à jour du plat en conséquence
            if (currentDish && currentDish.כשרות === 'חלבי') {
                await runKashrutQuery(
                    `UPDATE menus SET כשרות = ? WHERE id = ?`,
                    ["חלבי", idMenu],
                    `Kashrut Data for id ${idMenu} updated successfully`
                );
                console.log('Type lait trouvé');
                return; // Arrête la boucle dès qu'un type lait est trouvé
            } else if (currentDish && currentDish.כשרות === 'בשרי') {
                await runKashrutQuery(
                    `UPDATE menus SET כשרות = ? WHERE id = ?`,
                    ["בשרי", idMenu],
                    `Kashrut Data for id ${idMenu} updated successfully`
                );
                console.log('Type viande trouvé');
                return; // Arrête la boucle dès qu'un type viande est trouvé
            }
        }

        // Si aucun produit de type "lait" ou "viande" n'est trouvé
        await runKashrutQuery(
            `UPDATE menus SET כשרות = ? WHERE id = ?`,
            ["פרווה", idMenu],
            `Kashrut Data for id ${idMenu} updated successfully`
        );
        console.log('Aucun ingrédient de type lait ou viande trouvé.');
    } catch (err) {
        console.error('Error updating kashrut dish:', err);
    }
};

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