import {getAll, add, update, remove} from "./baseServer.js";

export const getNotes = async (req, res) => {
    let notesData = [] 
    await getAll("notes").then(data => notesData = data)
     return res.send(notesData)
}

export const addNote = (req, res) => {
    let newData = {
        "כותרת": req.body.כותרת,
        "תוכן": req.body.תוכן
    }
    console.log(newData)
    if (req.body.תוכן || req.body.כותרת ){
        add('notes', newData)};
    res.send({ message: 'Data added ' });
}

export const updateNote = (req,res) => {
    let newData = {id:req.params.id}
    if (req.body.כותרת){ newData.כותרת = req.body.כותרת}
    if (req.body.תוכן){ newData.תוכן = req.body.תוכן}

    if (req.body.כותרת || req.body.תוכן ){
        update('notes',newData)}
    res.send({ message: 'Data for NOTES ${id} updated successfully' });
}

export const removeNote = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('notes',id);
      res.status(200).send("Note deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };