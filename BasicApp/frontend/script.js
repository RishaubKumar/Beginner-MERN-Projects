// Updated script.js to call the CRUD APIs


window.onload = loadItems;
function loadItems(){
    fetch("/api/items")
    .then(res => res.json())
    .then(data =>{
        const list = document.getElementById("itemList");
        list.innerHTML = "";
        data.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML= `${item.name} <button onclick="editItem(${item.id})"> Edit </button>
            <button onclick="deleteItem(${item.id})">Delete </button>`;
            console.log(li)
            list.appendChild(li);
        });
    });
}
// create item
function addItem() {
    const name = document.getElementById("itemInput").value;
    fetch("/api/items",{
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    })
    .then(res => res.json())
    .then(()=>{
        document.getElementById("itemInput").value = "";
        console.log(name);
        loadItems();
    });
}
// Edit Items
function editItem(id) {
    const newName = prompt("Enter new name : ");
    if(!newName)  return;
    fetch(`/api/items/${id}`,{
        method : "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: newName})
    })
    .then(res => res.json())
    .then(()=>{
        // console.log(newName);
        loadItems();
    });
}
// delete Items
function deleteItem(id) {
    fetch(`/api/items/${id}`,{
        method : "DELETE",
    })
    .then(res => res.json())
    .then(()=>{
        loadItems();
    });
}

// This is the same task as above done using axios rather than fetch 
window.onload = loadItems;
async function loadItems(){
    try{
        const res = axios.get("/api/items")
        const data = res.data; // wait for Promise to resolve and in fetch .then retrun Promise as a callback 
        const list = document.getElementById("itemList");
        list.innerHTML = "";
        data.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML= `${item.name} <button onclick="editItem(${item.id})"> Edit </button>
            <button onclick="deleteItem(${item.id})">Delete </button>`;
            console.log(li)
            list.appendChild(li);
        });
    }
    catch(err){
        console.error("loading failed",err);
    }

}
// create item
async function addItem() {
    const name = document.getElementById("itemInput").value;
    if(!name) return;
    try{
        await axios.post("/api/items",{name},
        {headers: {
            "Content-Type": "application/json"
        }});
        document.getElementById("itemInput").value = "";
        console.log(name);
        loadItems();
    }catch(err){
        console.error("Create failed :",err);
    }
}
// Edit Items
async function editItem(id) {
    const newName = prompt("Enter new name : ");
    if(!newName)  return;
    try{await axios.put(`/api/items/${id}`,
        {name:newName},
       { headers: {
            "Content-Type": "application/json"
        }}
      )

        loadItems();
    }catch(err){
        console.error("Updation Failed ! ",err);
    }
}
// delete Items
async function deleteItem(id) {
    try{
        await axios.delete(`/api/items/${id}`);
        loadItems();
    }catch(err){
        console.error("Delete Failed",err);
    }
}


// This is the section where we will test and use the API which is not commit from out backend (This is the better way to fetch rather than promise chaning)

// const dogImg = document.getElementById('img');
// const buton = document.getElementById('btn');
// const url = "https://dog.ceo/api/breeds/image/random";

// const getImage = async ()=>{
//     console.log("getting data ...")
//     let response = await fetch(url) // fetch return a promise in response : let promise = fetch(url,[options])
//     // console.log(response.status);
//     let data =  await response.json();
//     if (data.status === "success" && data.message) {
//                 dogImg.src = data.message;
//                 dogImg.alt = "A cute random dog";
//         } else {
//              throw new Error("Invalid API response");
//                 }
    
// }
// Doing the same above work using promise chaining
// const dogImg = document.getElementById('img');
// const buton = document.getElementById('btn');
// const url = "https://dog.ceo/api/breeds/image/random";
// // const { response } = require("express");


// function getImage(){
//     fetch(url)
//     .then((response)=>{   // response.json() returns a Promise that resolves to a JavaScript object (Array..).
//         return response.json();
//         // console.log(response.status) ; // here we are parsing data from json fromate to usable formate 
//     }).then((data)=>{
//                 dogImg.src = data.message;
//                 // dogImg.alt = "A cute random dog";
//     })
// }
// buton.addEventListener("click",getImage);

// this was for the basic operation usig basic app

// document.getElementById("btn").addEventListener("click",()=>{
//     document.getElementById("msg").textContent = "Button Clicked !"
// });