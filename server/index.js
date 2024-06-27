import  express  from "express";
import cors from "cors" 
import bodyParser from 'body-parser';
import stockRoutes from './Routes/stock.js'
import suppliersRoutes from './Routes/suppliers.js'
import menusRoutes from './Routes/menus.js'
import dishesRoutes from './Routes/dishes.js'
import categoriesRoutes from './Routes/categories.js'
import menusCalendarRoutes from './Routes/menusCalendar.js'
import suppliersOrdersCalendarRoutes from './Routes/suppliersOrdersCalendar.js'
import usersRoutes from './Routes/users.js'
import notesRoutes from './Routes/notes.js'

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api/stock', stockRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/menus', menusRoutes);
app.use('/api/dishes', dishesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/menusCalendar', menusCalendarRoutes);
app.use('/api/suppliersOrdersCalendar', suppliersOrdersCalendarRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/notes', notesRoutes);

app.listen(4000, () =>{
    console.log("server running on port 4000");
});

// Error : SyntaxError: Cannot use import statement outside a module
// Solution : "type": "module" in package.json

// Error : Failed to fetch
// Solution : import cors from "cors"  // app.use(cors());