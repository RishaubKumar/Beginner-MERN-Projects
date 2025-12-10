const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const dataFile = path.join(__dirname,"data.json");

// Read Json file 
function loadData(){
    if(!fs.existsSync(dataFile)) return []; // If there is no data file create and return and empty array
    const json = fs.readFileSync(dataFile,"utf-8")
    return JSON.parse(json);
}
 // write JSON file
function saveData(data){
    fs.writeFileSync(dataFile,JSON.stringify(data,null,2));
}
// let items = [];
let idcount = 1;
// '/' should be reserve to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
})
app.post('/api/items', (req, res) => {
    const items = loadData();
    const { newTask } = req.body;
    const newItem = { id: idcount++, newTask }; // here we are creating and element giving it a new Id and name as per the task 
    items.push(newItem); // pushing the task to the array we made
    saveData(items);
    res.json(newItem);
})
app.get('/api/items', (req, res) => {
    const items = loadData();
    res.json(items);
})
app.put('/api/items/:id', (req, res) => {
    const items = loadData();
    const id = Number(req.params.id);
    const {newTask} = req.body;
    // items = items.find(i => i.id === id);
    // filter() - Creates new array with elements passing the test ; i - Each item in items array (current element) ; i.id === id - Test: "Does this item's ID match the target ID?" ;Result: New array with only items where test returns true
    const item = items.find(i => i.id === id);
if (item) {
    item.newTask = newTask;
    saveData(items);
    res.json(item);
} else {
    res.status(404).json({ error: "Item not found" });
}
    // res.json(items);
})
app.delete('/api/items/:id', (req, res) => {
    // console.log(req.params);
    let items = loadData();
    const id  = Number(req.params.id);
    console.log(id);
    items = items.filter(i => i.id !== id);
    saveData(items);
    res.json({ message: "task removed" });
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});