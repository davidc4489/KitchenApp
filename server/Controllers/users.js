import {getAll, add, update, remove} from "./baseServer.js";

export const getUsers = async (req, res) => {
    let usersData = [] 
    await getAll("users").then(data => usersData = data)
     return res.send(usersData)
}

export const addUser = (req, res) => {
    let newData = {
        "שם": req.body.שם,
        "מייל": req.body.מייל,
        "סיסמה": req.body.סיסמה,
        "הרשאה": req.body.הרשאה
    }

    if (req.body.שם && req.body.מייל && req.body.סיסמה && req.body.הרשאה){
        add('users', newData)};
    res.send({ message: 'Data added ' });
}

export const updateUser = (req,res) => {
    let newData = {id:req.params.id}
    console.log("new name : ", req.body.שם)
    console.log("new mail : ", req.body.מייל)
    console.log("new password : ", req.body.סיסמה)
    console.log("new permission : ", req.body.הרשאה)
    console.log("id : ", req.body.idUpdate)
    console.log("id params: ", req.params.idToUpdate)
    if (req.body.שם){ newData.שם = req.body.שם}
    if (req.body.מייל){ newData.מייל = req.body.מייל}
    if (req.body.סיסמה){ newData.סיסמה = req.body.סיסמה}
    if (req.body.הרשאה){ newData.הרשאה = req.body.הרשאה}

    if (req.body.שם && req.body.מייל && req.body.סיסמה && req.body.הרשאה){
        update('users',newData)
        res.send({ message: 'Data for USERS ${id} updated successfully' });
    }
}

export const removeUser = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('users',id);
      res.status(200).send("User deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };