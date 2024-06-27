import {add, update, remove} from "./baseServer.js";

export const addCategory = (req, res) => {
    let newData = {
        "שם": req.body.שם,
        "קטגוריה": req.body.קטגוריה
    }

    if (req.body.שם && req.body.קטגוריה){
        if (req.body.קטגוריה === 'קטגוריות מוצרים') {
            add('stockCategories', newData)}
        else if (req.body.קטגוריה === 'קטגוריות מנות') {
            add('dishCategories', newData)}
        else if (req.body.קטגוריה === 'קטגוריות תפריטים') {
            add('menusCategories', newData)}};
    res.send({ message: 'Category added ' });
}

export const updateCategory = (req,res) => {
    let newData = {id:req.params.id}
    const id = req.params.id;
    if (req.body.שם){ newData.שם = req.body.שם}
    if (req.body.קטגוריה){ newData.קטגוריה = req.body.קטגוריה}
    
    if (req.body.שם && req.body.קטגוריה){
        if (req.body.קטגוריה === req.body.קטגוריה_קודמת){
            if (req.body.קטגוריה === 'קטגוריות מוצרים') {
                update('stockCategories', newData)}
            else if (req.body.קטגוריה === 'קטגוריות מנות') {
                update('dishCategories', newData)}
            else if (req.body.קטגוריה === 'קטגוריות תפריטים') {
                update('menusCategories', newData)}}
        else if (req.body.קטגוריה !== req.body.קטגוריה_קודמת) {
            if (req.body.קטגוריה_קודמת === 'קטגוריות מוצרים') {
                remove('stockCategories', id)}
            else if (req.body.קטגוריה_קודמת === 'קטגוריות מנות') {
                remove('dishCategories', id)}
            else if (req.body.קטגוריה_קודמת === 'קטגוריות תפריטים') {
                remove('menusCategories', id)}
            if (req.body.קטגוריה === 'קטגוריות מוצרים') {
                add('stockCategories', newData)}
            else if (req.body.קטגוריה === 'קטגוריות מנות') {
                add('dishCategories', newData)}
            else if (req.body.קטגוריה === 'קטגוריות תפריטים') {
                add('menusCategories', newData)}
        }
            }
    res.send({ message: 'Data for CATEGORIES ${id} updated successfully' });
}

export const removeCategory = (req, res) => {
    const id = req.body.id;
    
    try {
        if (req.body.קטגוריה === 'קטגוריות מוצרים') {
            remove('stockCategories', id)}
        else if (req.body.קטגוריה === 'קטגוריות מנות') {
            remove('dishCategories', id)}
        else if (req.body.קטגוריה === 'קטגוריות תפריטים') {
            remove('menusCategories', id)}
      res.status(200).send("Category deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };