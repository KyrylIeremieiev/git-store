class Login{
    constructor(name, pass, btn){
        this.name = name;
        this.pass = pass;
        this.btn = btn;
        this.btn.onclick = this.getData;
        this.cookie = this.getCookie('user')
        console.log(this.cookie)
    }

    getData = () =>{
        fetch("http://localhost:8080/api/login",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({"username": this.name.value, "pass": this.pass.value})
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
                this.data = data
                document.cookie = "user=" + data[0].cookie;
            })
    }

    getCookie = (name) =>{
        // Split all cookies into an array
        const cookies = document.cookie.split(';');
    
        // Loop through the cookies to find the one with the specified name
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim(); // Remove leading/trailing spaces
            if (cookie.startsWith(name + '=')) {
                // If the cookie starts with the specified name
                // Extract and return the cookie value
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
    
        // If the cookie with the specified name is not found, return null
        return null;
    }
}

let login = new Login(document.getElementById('username'), document.getElementById('pass'), document.getElementById('submit'))