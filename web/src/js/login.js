class Login{
    constructor(name, pass, btn, error){
        this.error = error
        this.name = name;
        this.pass = pass;
        this.btn = btn;
        this.checkForMistake();
        this.btn.onclick = this.getData;
        this.cookie = this.getCookie('user')
        console.log(this.cookie)
    }

    checkForMistake = () =>{
        this.errorCookie = this.getCookie("error");
        if(this.errorCookie == "'true'"){
            this.error.style.display = "block";
        }else{
            this.error.style.display = "none";
        }
    }

    getData = () =>{
        fetch("http://localhost:8080/api/login",
            {
                method: "POST",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },

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
                this.data = data
                document.cookie = 'data=' + data;
                console.log(data[0])
                if(data == "[object Object]"){
                    document.cookie = "user=" + data[0].cookie;
                    document.cookie = "error='false'"
                    window.location.href = "./index.html";
                    return
                }
                    document.cookie = "error='true'"
                
                
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

let login = new Login(document.getElementById('username'), document.getElementById('pass'), document.getElementById('submit'), document.getElementById('error'))