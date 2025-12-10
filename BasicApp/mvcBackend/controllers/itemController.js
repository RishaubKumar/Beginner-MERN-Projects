const ItemModel = require("../models/itemModel");

module.exports = {
    //READ 
    getItems(req,res){
        res.json(ItemModel.getAllItems());
    },
    // CREATE
    addItem(req,res){
        const {name} = req.body;
        const item = ItemModel.createItem(name);
        res.json(item);
    },
    //UPDATE
    updateItem(req,res){
        const {id} = req.params;
        const {name} = req.body;
        const updated = ItemModel.updateItem(id,name);
        if(!updated) return res.status(404).json({error: "Item not found"});
        res.json(updated);
    },
    //DELETE
    deleteItem(req,res){
        const {id} = req.params;
        ItemModel.deleteItem(id);
        res.json({message: "Item deleted"});
    }
};