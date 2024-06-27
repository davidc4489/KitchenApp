import {getAll, add, update, remove} from "./baseServer.js";
import {getFewItems} from "./menus.js";

export const getMenusCalendar = async (req, res) => {
    let menusCalendarData = [] 
    await getAll("menusCalendar").then(data => menusCalendarData = data)
     return res.send(menusCalendarData)
}

export const addEvent = (req, res) => {
    let newData = {
        "day": req.body.day,
        "month": req.body.month,
        "year": req.body.year,
        "idMenu": req.body.menuId,
        "amount": req.body.amount
    }

    console.log(newData)
    add('menusCalendar', newData);
    res.send({ message: 'Data added ' });
}

export const updateStock = async (req, res) => {
    try {
        const menusCalendarData = await getAll("menusCalendar");
        const menuData = await getAll("menus");
        const dishesData = await getAll("dishes");
        const stockData = await getAll("STOCK");

        let dishesMenuData = [];
        let ingredientsDishData;

        await Promise.all(
            menusCalendarData.map(async (date) => {
            if (        
                new Date().getDate() === parseInt(date.day) &&
                new Date().toLocaleString('en-GB', { month: 'long' }) === date.month &&
                new Date().getFullYear() === parseInt(date.year)
                ) {
                    let currentMenu = menuData.find(menu => menu.id === date.idMenu)
                    if(currentMenu){
                        dishesMenuData = await getFewItems ('menuDishes', 'idMenu', currentMenu.id).then(data => dishesMenuData = data)
                        if(dishesMenuData){
                            await Promise.all(
                            dishesMenuData.map(async (dishMenu) => {
                                let currentDish = dishesData.find(dish => dish.id === parseInt(dishMenu.idDish))
                                if(currentDish){
                                    ingredientsDishData = await getFewItems ('dishIngredients', 'idDish', currentDish.id).then(data => ingredientsDishData = data)
                                    if(ingredientsDishData){
                                        ingredientsDishData.map((dishIngredient) => {
                                            let currentProduct = stockData.find(product => product.id === dishIngredient.idIngredient)
                                            if((currentProduct) && (date.used == false)) {
                                                currentProduct.כמות -= dishIngredient.כמות * date.amount
                                                date.used = true
                                                update('menusCalendar', date)
                                                stockData.map(product => update("STOCK", currentProduct))
                                            }
                                        })
                                    }
                                }
                            }))
                        }
                    }
                }})
            )
            
            

        res.send({ message: 'Stock updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
