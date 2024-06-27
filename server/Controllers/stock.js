import {getAll, add, update, remove} from "./baseServer.js";

export const getStock = async (req, res) => {
    let stockData = [] 
    await getAll("STOCK").then(data => stockData = data)
     return res.send(stockData)
}

export const getCategories = async (req, res) => {
    let categoriesData = [] 
    await getAll("stockCategories").then(data => categoriesData = data)
     return res.send(categoriesData)
}

export const addProduct = (req, res) => {
    let newData = {
        "שם_מוצר": req.body.שם_מוצר,
        "קטגוריה": req.body.קטגוריה,
        "כשרות": req.body.כשרות,
        "ספק": req.body.ספק,
        "יצרן": req.body.יצרן,
        "כמות": req.body.כמות,
        "יחידה": req.body.יחידה,
        "כמות_מינימלית": req.body.כמות_מינימלית
    }
    console.log(newData)
    if (req.body.שם_מוצר && req.body.קטגוריה && req.body.כשרות && req.body.ספק && req.body.יצרן && req.body.כמות && req.body.יחידה && req.body.כמות_מינימלית){
        add('stock', newData)};
    res.send({ message: 'Data added ' });
}

export const updateProduct= (req,res) => {
    let newData = {id:req.params.id}
    if (req.body.שם_מוצר){ newData.שם_מוצר = req.body.שם_מוצר}
    if (req.body.קטגוריה){ newData.קטגוריה = req.body.קטגוריה}
    if (req.body.כשרות){ newData.כשרות = req.body.כשרות}
    if (req.body.ספק){ newData.ספק = req.body.ספק}
    if (req.body.יצרן){ newData.יצרן = req.body.יצרן}
    if (req.body.כמות){ newData.כמות = req.body.כמות}
    if (req.body.יחידה){ newData.יחידה = req.body.יחידה}
    if (req.body.כמות_מינימלית){ newData.כמות_מינימלית = req.body.כמות_מינימלית}

    if (req.body.שם_מוצר && req.body.קטגוריה && req.body.כשרות && req.body.ספק && req.body.יצרן && req.body.כמות && req.body.יחידה && req.body.כמות_מינימלית){
        update('stock',newData)}
    res.send({ message: 'Data for STOCK ${id} updated successfully' });
}

export const removeProduct = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('stock',id);
      res.status(200).send("Course deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };