let items = [];
let idCount = 1;

module.exports={
    getAllItems(){
        return items;
    },
    createItem(name){
        const newItem = {id: idCount++,name};
        items.push(newItem);
        return newItem;
    },
    updateItem(id,name){
        const item = items.find(i => i.id == id);
        if(!item) return null;
        item.name = name;
        return item ;
    },
    deleteItem(id){
        items = items.filter(i => i.id != id);
        return true;
    }
}