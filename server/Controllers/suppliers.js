import {getAll, add, update, remove} from "./baseServer.js";

export const getSuppliers = async (req, res) => {

    let suppliersData = [] 
    await getAll("SUPPLIERS").then(data => suppliersData = data)
     return res.send(suppliersData)
}

export const addSupplier = (req, res) => {
    let newData = {
        "שם": req.body.שם,
        "טל": req.body.טל,
        "מייל": req.body.מייל,
        "קטגוריה": req.body.קטגוריה,
        "מוצר": req.body.מוצר,
        "מחיר_ליחידה": req.body.מחיר_ליחידה,
        "יחידה": req.body.יחידה,
        "זמן_אספקה_בימים": req.body.זמן_אספקה
    }

    if (req.body.שם && req.body.טל && req.body.מייל && req.body.קטגוריה && req.body.מוצר && req.body.מחיר_ליחידה && req.body.יחידה && req.body.זמן_אספקה_בימים){
        add('suppliers', newData)};
    res.send({ message: 'Data added ' });
}

export const updateSupplier= (req,res) => {
    let newData = {id:req.params.id}
    if (req.body.שם){ newData.שם = req.body.שם}
    if (req.body.טל){ newData.טל = req.body.טל}
    if (req.body.מייל){ newData.מייל = req.body.מייל}
    if (req.body.קטגוריה){ newData.קטגוריה = req.body.קטגוריה}
    if (req.body.מוצר){ newData.מוצר = req.body.מוצר}
    if (req.body.מחיר_ליחידה){ newData.מחיר_ליחידה = req.body.מחיר_ליחידה}
    if (req.body.יחידה){ newData.יחידה = req.body.יחידה}
    if (req.body.זמן_אספקה){ newData.זמן_אספקה = req.body.זמן_אספקה_בימים}
    
    if (req.body.שם && req.body.טל && req.body.מייל && req.body.קטגוריה && req.body.מוצר && req.body.מחיר_ליחידה && req.body.יחידה && req.body.זמן_אספקה_בימים){
        update('suppliers',newData)}
    res.send({ message: 'Data for SUPPLIERS ${id} updated successfully' });
}

export const removeSupplier = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('suppliers',id);
      res.status(200).send("Course deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };