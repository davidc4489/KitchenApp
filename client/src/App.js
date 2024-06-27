import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import './App.css'
import Home from './Components/Home/Home.js';
import Login from "./Components/Login/Login.js";
import Stock from "./Components/Stock/Stock.js";
import Suppliers from "./Components/Suppliers/Suppliers.js";
import Menus from "./Components/Menus/Menus.js";
import Dishes from "./Components/Dishes/Dishes.js";
import Categories from "./Components/Categories/Categories.js";
import Calendar from "./Components/Calendar/Calendar.js";
import Users from "./Components/Users/Users.js";
import SuppliersOrdersCalendar from "./Components/SuppliersOrdersCalendar/Calendar.js";
import Messages from "./Components/Messages/Messages.js";
import Notes from "./Components/Notes/Notes.js";
import Settings from "./Components/Settings/Settings.js";
import { AuthProvider } from "./Context/UserContext.jsx";
import { UpdateUserProvider } from "./Context/UserToUpdateContext.jsx";
import Sidebar from "./Components/SideBar/SideBar.js";

function App() {

  const Layout = () => {
    return(
      <div className="layout-container">
      <Sidebar />
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
    )
  } 

  return (
    <div className="App">
      <UpdateUserProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Stock' element={<Stock/>}/>
            <Route path='/Suppliers' element={<Suppliers/>}/>
            <Route path='/Menus' element={<Menus/>}/>
            <Route path='/Dishes' element={<Dishes/>}/>
            <Route path='/Categories' element={<Categories/>}/>
            <Route path='/Calendar' element={<Calendar/>}/>
            <Route path='/SuppliersOrdersCalendar' element={<SuppliersOrdersCalendar/>}/>
            <Route path='/Users' element={<Users/>}/>
            <Route path='/Messages' element={<Messages/>}/>
            <Route path='/Notes' element={<Notes/>}/>
            <Route path='/Settings' element={<Settings/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
      </UpdateUserProvider>
    </div>
  );
}

export default App;