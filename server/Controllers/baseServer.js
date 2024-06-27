import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./database.db');

const getAll = async (collection) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${collection}`;
        db.all(query, (err, rows) => { 
            if (err) {
                    console.error('Error fetching data:', err);
                reject(err);
            } else {
                resolve(rows);
            }
                    });;
                }).then(data => {
                    return data
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
};

const getItem = async (collection, search_column, id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${collection} WHERE ${search_column} = ?`;
        db.get(query, id, (err, row) => {
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
};

const add = (collection, data) => {
    let keys = Object.keys(data)
    let values = Object.values(data)
    const query = `INSERT INTO ${collection} (${keys}) VALUES (${'?,'.repeat(keys.length).slice(0, -1)})`;

    db.run(query, values, (err) => {
        if (err) {
            console.error('Error adding data:', err);
        } else {
            console.log('Data added successfully');
        }
        });
    };

const update = ( collection, data ) => {
    let keys = Object.keys(data)
    let values = Object.values(data)
    const query = `UPDATE ${collection} SET ${(keys.slice(1).map(key => `${key} = ?,`).join(' ').slice(0,-1))} WHERE id = ?`;
    
    db.run(query, [...values.slice(1),data.id], (err) => {
        if (err) {
            console.error('Error updating data:', err);
        } else {
            console.log(`Data for empid ${keys} updated successfully`);
        }
    });
};

const remove = (collection ,id) => {
    const query = `DELETE FROM ${collection} WHERE id = ? `;

    db.run(query, id, (err) => {
        if (err) {
            console.error('Error deleting data:', err);
        } else {
            console.log(`Data with id deleted successfully`);
        }
    });
};

const getOrdersStatistics = async (req, res) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT menu.name, menu.category, (
            SELECT SUM (amount) FROM OrdersList WHERE dishId = menu.id) as amount
        FROM menu`;
        db.all(query, (err, rows) => { 
            if (err) {
                    console.error('Error fetching data:', err);
                reject(err);
            } else {
                resolve(rows);
            }
                    });;
                }).then(data => {
                    console.log(data)
                    return data
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
};

const getAmount = async (req, res) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT SUM (amount) as amount FROM OrdersList`;
        db.all(query, (err, rows) => { 
            if (err) {
                    console.error('Error fetching data:', err);
                reject(err);
            } else {
                resolve(rows);
            }
                    });;
                }).then(data => {
                    console.log(data)
                    return data
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
};

export {getAll, getItem, add, update, remove, getOrdersStatistics, getAmount};