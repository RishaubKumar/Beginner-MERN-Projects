        const jokes = document.getElementById("jokes");
        fetch("https://official-joke-api.appspot.com/random_joke")
        .then(res => res.json())
        .then((data)=>{
            jokes.innerHTML = `<strong> ${data.setup} </strong> </br> ${data.punchline}`
        })
        .catch(err => {
      jokes.textContent = "Failed to load joke 😢";
      console.error(err);
        });