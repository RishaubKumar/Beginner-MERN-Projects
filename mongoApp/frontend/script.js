
window.onload = loadName;

// Read Name
function loadName(){
    fetch("/api/names")
    .then(res => res.json())
    .then((data)=>{
        // console.log(data);
        const list = document.getElementById("nameList");
        list.innerHTML = "";
        data.forEach(item => {
            const li = document.createElement("li");
            // console.log(`${item.newName}` );
            li.innerHTML= `${item.name} 
            <button onclick="editName('${item._id}')"> Edit </button>
            <button onclick="deleteName('${item._id}')">Delete </button>`;
            // console.log(li)
            list.appendChild(li);
        });
    })
}

// CREATE Name
function addName(){
    const name  = document.getElementById("name").value ;
    fetch("/api/names",{
        method: "POST",
        headers :{
            "Content-type" : "application/json",
        },
        body : JSON.stringify({name})
    }
    ).then(res => res.json())
    .then(()=>{
        // console.log(data);
        document.getElementById("name").value = "";
        loadName();
        }
    )
}

// Update name

function editName(id){
    const editedName = prompt("Enter the edited name here: ");
    fetch(`/api/names/${id}`,{
        method: "PUT",
        headers:{
            "Content-type":"application/json",
        },
        body: JSON.stringify({name: editedName})
    })
    .then(res => res.json())
    .then(()=>{
        loadName();
    })
}
function deleteName (id){
    fetch(`/api/names/${id}`,{
        method: "DELETE",
        // headers:{
        //     "Content-type":"application/json",
        // },
        // body: JSON.stringify({newName})
    })
    .then(res => res.json())
    .then(()=>{
        loadName();
    })
}