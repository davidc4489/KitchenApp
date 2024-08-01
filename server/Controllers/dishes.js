import {getAll, add, update, remove} from "./baseServer.js";
import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./database.db');

// Recupere les donnees des plats
export const getDishes = async (req, res) => {
    let dishesData = [] 
    await getAll("dishes").then(data => dishesData = data)
     return res.send(dishesData)
}

// Recupere les differentes categories de plats 
export const getCategories = async (req, res) => {
    let categoriesData = [] 
    await getAll("dishCategories").then(data => categoriesData = data)
     return res.send(categoriesData)
}

// Recupere tous les ingredients d'un plat
export const getIngredients = async (req, res) => {
    let ingredientsData
    await getFewItems ('dishIngredients', 'idDish', req.params.id).then(data => ingredientsData = data)
    return res.send(ingredientsData)
  }

// Recupere plusieurs elements d'un tableau suivant les arguments recus en parametre
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

// Ajoute un nouveau plat d'apres les donnees fournies par l'utilisateur
export const addDish = (req, res) => {
    let newData = {
        "שם": req.body.שם,
        "קטגוריה": req.body.קטגוריה,
        "כשרות": "פרווה", // Valeur par defaut a l'initialisation
        "עלות": 0 // Valeur par defaut a l'initialisation
    }

    if (req.body.שם && req.body.קטגוריה){
        add('dishes', newData)};
    res.send({ message: 'Data added ' });
}

// Mise a jour d'un plat d'apres les donnees fournies par l'utilisateur
export const updateDish = async (req, res) => {
    try {
        // Récupère les nouvelles données du plat fournies par l'utilisateur
        let newData = { id: req.params.id };
        if (req.body.שם) { newData.שם = req.body.שם; }
        if (req.body.קטגוריה) { newData.קטגוריה = req.body.קטגוריה; }
        if (req.body.כשרות) { newData.כשרות = req.body.כשרות; }
        if (req.body.עלות) { newData.עלות = req.body.עלות; }

        if (req.body.שם && req.body.קטגוריה) {
            update('dishes', newData);
        }

        // Récupère les nouvelles données des ingrédients du plat fournies par l'utilisateur
        let newIngredientsData = [];

        if (req.body.ingredients) {
            for (let i = 0; i < req.body.ingredients.length; i++) {
                let newIngredient = {};
                newIngredient.idDish = parseInt(req.params.id);
                req.body.ingredients[i].id &&
                    (newIngredient.idIngredient = parseInt(req.body.ingredients[i].id));
                newIngredient.כמות = parseInt(req.body.ingredients[i].amount);
                newIngredient.יחידה = req.body.ingredients[i].unity;
                newIngredientsData.push(newIngredient);
            }

            // Récupère les données des ingrédients des plats de la base de données
            let dishData = await getAll("dishIngredients");

            // Récupère les données des ingrédients de la base de données
            let stockData = await getAll("stock", { where: { קטגוריה: ['אוכל', 'שתיה'] } });

            // Ajout ou modification de chaque ingrédient dans le plat
            for (let i = 0; i < newIngredientsData.length; i++) {
                let currentDish = dishData.filter(item => (item.idDish == req.params.id && item.idIngredient == newIngredientsData[i].idIngredient));

                if (currentDish.length !== 0) {
                    await updateDataIngredient('dishIngredients', newIngredientsData[i]);
                } else {
                    await add('dishIngredients', newIngredientsData[i]);
                }
            }

            // Mise à jour de la cacherout du plat après toutes les opérations d'ajout ou de mise à jour
            updateKashrutDish("dishes", req.params.id);
        }

        res.send({ message: `Data for DISHES ${req.params.id} updated successfully` });
    } catch (err) {
        console.error('Error updating dish:', err);
        res.status(500).send({ error: 'Failed to update dish' });
    }
};

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

const updateKashrutDish = async (collection, idDish) => {
    try {
        // Requête pour récupérer tous les ingrédients du plat avec idDish
        const getIngredientsQuery = `SELECT * FROM dishIngredients WHERE idDish = ?`;
        const ingredients = await new Promise((resolve, reject) => {
            db.all(getIngredientsQuery, [idDish], (err, rows) => {
                if (err) {
                    console.error('Error fetching ingredients:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        // Vérifiez si le tableau d'ingrédients est vide et initialisation de la cacherout par defaut si c'est le cas
        if (ingredients.length === 0) {
            await runKashrutQuery(
                `UPDATE dishes SET כשרות = ? WHERE id = ?`,
                ["פרווה", idDish],
                `Kashrut Data for id ${idDish} updated successfully`
            );
            console.log("Vide");
            return;
        }

        // Vérifier chaque ingrédient
        for (let ingredient of ingredients) {
            // Requête pour récupérer le type de l'ingrédient du stock
            const getProductQuery = `SELECT כשרות FROM stock WHERE id = ?`;
            const product = await new Promise((resolve, reject) => {
                db.get(getProductQuery, [ingredient.idIngredient], (err, row) => {
                    if (err) {
                        console.error('Error fetching product type:', err);
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            });

            // Vérifiez si le type de produit est "lait" ou "viande" et mise à jour du plat en conséquence
            if (product && product.כשרות === 'חלבי') {
                await runKashrutQuery(
                    `UPDATE dishes SET כשרות = ? WHERE id = ?`,
                    ["חלבי", idDish],
                    `Kashrut Data for id ${idDish} updated successfully`
                );
                console.log('Type lait trouvé');
                return; // Arrête la boucle dès qu'un type lait est trouvé
            } else if (product && product.כשרות === 'בשרי') {
                await runKashrutQuery(
                    `UPDATE dishes SET כשרות = ? WHERE id = ?`,
                    ["בשרי", idDish],
                    `Kashrut Data for id ${idDish} updated successfully`
                );
                console.log('Type viande trouvé');
                return; // Arrête la boucle dès qu'un type viande est trouvé
            }
        }

        // Si aucun produit de type "lait" ou "viande" n'est trouvé
        await runKashrutQuery(
            `UPDATE dishes SET כשרות = ? WHERE id = ?`,
            ["פרווה", idDish],
            `Kashrut Data for id ${idDish} updated successfully`
        );
        console.log('Aucun ingrédient de type lait ou viande trouvé.');
    } catch (err) {
        console.error('Error updating kashrut dish:', err);
    }
};

const updateDataIngredient = (collection, data) => {
    return new Promise((resolve, reject) => {
        let keys = Object.keys(data);
        let values = Object.values(data);
        const query = `UPDATE ${collection} SET ${keys.slice(1).map(key => `${key} = ?`).join(', ')} WHERE idDish = ? AND idIngredient = ?`;

        // Exécuter la requête de mise à jour
        db.run(query, [...values.slice(1), data.idDish, data.idIngredient], function (err) {
            if (err) {
                console.error('Error updating data:', err);
                return reject(err); // Rejeter la promesse en cas d'erreur
            }
            
            console.log(`Data for ${keys} updated successfully`);

            // Requête de suppression des éléments avec quantité = 0
            const deleteQuery = `DELETE FROM ${collection} WHERE כמות = 0`;

            db.run(deleteQuery, function (err) {
                if (err) {
                    console.error('Error deleting data:', err);
                    return reject(err); // Rejeter la promesse en cas d'erreur
                }
                
                console.log('Items with quantity = 0 were successfully deleted.');
                resolve(); // Résoudre la promesse lorsque la suppression est réussie
            });
        });
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