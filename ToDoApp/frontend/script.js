window.onload = loadTask;

function loadTask(){
    fetch("/api/tasks")
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load tasks");
      if (!Array.isArray(data)) throw new Error("API did not return an array");
      return data;
    })
    .then((data)=>{
        const list = document.getElementById("taskList");
        list.innerHTML = "";
        data.forEach(item =>{
            const li = document.createElement("li");
            li.innerHTML= `${item.name}
             <button onclick = "editTask(${item.id})">Edit Task </button>
            <button onclick="removeTask(${item.id})">RemoveTask </button>`;
            list.appendChild(li);
        })
    })}

function addTask(){
    const name = document.getElementById("task").value ;
    fetch("/api/tasks",{
        method:"POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({name})
    })
    .then(res => res.json())
    .then(()=>{
        document.getElementById("task").value = "";
        loadTask();
    })
}

function editTask(id){
    const newName = prompt("Enter the complete edited task : ");
    fetch(`/api/tasks/${id}`,{
        method: "PUT",
        headers:{
            "Content-type" : "application/json"
        },
        body: JSON.stringify({name:newName})
    })
    .then(res => res.json())
    .then(()=>{ 
        loadTask()
    } )
}

function removeTask(id){
    fetch(`/api/tasks/${id}`,{
        method: 'DELETE',
        headers:{
            "Content-type" : "application/json"
        }
    }).then(res => res.json())
    .then(()=>{
        loadTask()
    })
}