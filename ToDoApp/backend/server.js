const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const dataFile = path.join(__dirname,"data.json");

app.use(express.static(path.join(__dirname,"../frontend")))
app.use(express.json());

// let tasks = [];
let idCount = 1;

function loadData(){
    if(!fs.existsSync(dataFile)) return [];
    const json = fs.readFileSync(dataFile,"utf-8");
    return JSON.parse(json);
}

function saveData(data){
    fs.writeFileSync(dataFile,JSON.stringify(data,null,2))
}
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/index.html"))
})
// (READ) load Task to page
app.get("/api/tasks",(req,res)=>{
    const tasks = loadData();
    res.json(tasks);
})

// (CREATE) Create the item as per user input
app.post("/api/tasks",(req,res)=>{
    const tasks = loadData();
    const {name} = req.body;
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newItem = {id:nextId,name};
    tasks.push(newItem);
    saveData(tasks);
    res.json(newItem);
})

// (UPDATE) Edit the task
app.put("/api/tasks/:id",(req,res)=>{
    const tasks = loadData();
    const id = Number(req.params.id)
    const {name} = req.body
    const item = tasks.find(i => i.id === id)
    if(!item){
       return res.status(404).json({error:"task not found"});
    }
    item.name = name;
    saveData(tasks);
    res.json(item);
})
 // (DELETE) remove the task
app.delete("/api/tasks/:id",(req,res)=>{
    const tasks = loadData();
    const id = Number(req.params.id);
    const newtasks = tasks.filter(i=> i.id !== id);
    saveData(newtasks);
    res.json({message: "task removed"})
})
const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is listening at port : ${port}`)
})