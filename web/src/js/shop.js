
class SendToShoppingCart{
    constructor(){
        this.buyBtns = document.getElementsByClassName("product__button");
        this.btnCheck()

    }

    btnCheck(){
        for(let i = 0; i < this.buyBtns.length; i++){
            this.buyBtns[i].onclick = (e) =>{
                let accountCheck = this.getCookie("user")
                if(accountCheck !== null){
                    this.SendData(e.target)
                }
                else{
                    window.location.href = "./login.html";
                }
                
            }
        }
    }

    SendData = (btn) =>{
        if(btn.classList.contains("green")){
            this.cartData("avatarGreen")
        }
        if(btn.classList.contains("purple")){
            this.cartData("avatarPurple")
        }
        if(btn.classList.contains("blue")){
            this.cartData("avatarBlue")
        }
    }

    cartData(dataValue){
        this.cookie = this.getCookie('user');
        fetch("http://localhost:8080/api/CartIn",
        {
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"cookie":this.cookie, "item": dataValue})
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
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

class Cart{
    constructor(cartIconId, closeId, cartId){
        this.cart = document.getElementById(cartId);
        this.cartIcon = document.getElementById(cartIconId);
        this.close = document.getElementById(closeId);

        this.cartIcon.onclick = this.openCart;
        this.close.onclick = this.closeCart;
    }

    openCart = () =>{
        this.cart.style.display = "flex";
    }

    closeCart = () =>{
        this.cart.style.display = "none";
    }
}

const send = new SendToShoppingCart()
const cart = new Cart("openCart", "close", "cart")