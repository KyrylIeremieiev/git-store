class Signup{
    constructor(name, pass, btn){
        this.name = name;
        this.pass = pass;
        this.btn = btn;
        console.log(btn)
        this.btn.onclick = this.getData;
    }

    getData = () =>{
        this.cookie = Math.floor(Math.random() * 99999)
        fetch("http://localhost:8080/api/createAccount",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"cookie":this.cookie, "username": this.name.value, "pass": this.pass.value})
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
        document.cookie = `user=` + this.cookie;
        console.log(document.cookie);
        window.location.href = "./index.html";
    }
}

let signup = new Signup(document.getElementById('username'), document.getElementById('pass'), document.getElementById('submit'))
