function submitForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("User:", username);
    console.log("Pass:", password);
    axios.post("http://localhost:8080/login",
    { username, password})
    .then((response) => response.data)
    .then((data) => {
        const jwtToken = data.token;
        localStorage.setItem("jwtToken", jwtToken);
        console.log("Login working!", jwtToken);
        window.location.href = "dashboard.html";
    })
}

function logout() {
    localStorage.removeItem("jwtToken");
    window.location.href = "index.html"
}

function getDashboard() {
    let token = localStorage.getItem("jwtToken");
    console.log(token);
    axios.get("http://localhost:3555/dashboard", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.data)
    .then(data => {
        console.log(data.message);
        let userMessage = document.querySelector("#user-message");
        userMessage.innerHTML = data.message;
    })
    .catch(err => {
        window.location.href = "index.html";
    })
}
