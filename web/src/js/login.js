class Login{
    constructor(name, pass, btn){
        this.name = name;
        this.pass = pass;
        this.btn = btn;
        console.log(btn)
        this.btn.onclick = this.getData;
    }

    getData = () =>{
        fetch("http://localhost:8080/api/login",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({"username": "bogus", "pass": "bogus"})
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request failed');
                }
            })
            .then(data => {
                // Handle the response data (query results) as needed
                console.log(data);
            })
    }
}

let signup = new Login(document.getElementById('username'), document.getElementById('pass'), document.getElementById('submit'))
