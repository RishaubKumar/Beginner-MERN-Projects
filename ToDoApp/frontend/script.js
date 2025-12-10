window.onload = loadTasks;
function loadTasks(){
    fetch("/api/items")
    .then(res => res.json())
    .then(data =>{
        const list = document.getElementById("taskList");
        list.innerHTML = "";
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML= `${item.newTask} <button onclick="editTask(${item.id})">edit</button>
            <button onclick="removeTask(${item.id})">Delete </button>`;
            list.appendChild(li);
        });
    })
}

function createTask(){
    const newTask = document.getElementById("task").value;
    fetch('/api/items',{
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({newTask})  // Here is the task which we are adding to list fetching from body
    })
    .then(res => res.json())
    .then(()=>{
        document.getElementById("task").value = ""; // This will make the input field empty agian 
        loadTasks();  // here value of newtask is pushed to loadTasks function because second then return the value of parsed data form the first then response
    })
}
function editTask(id){
    const editedTask = prompt("Enter the new edit task ");
    fetch(`/api/items/${id}`,{
        method : "PUT",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({newTask : editedTask})
    }).then(res => res.json())
    .then(()=>{
        loadTasks();
    })
}

function removeTask(id){
    fetch(`/api/items/${id}`,{
        method : "DELETE"
    })
    .then(res => res.json())
    .then(()=>{
        loadTasks();
    })
}