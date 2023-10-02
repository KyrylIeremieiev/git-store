
class App{
    constructor(){
        this.buyBtns = document.getElementsByClassName("product__button");
        this.cookie = this.getCookie("user");
        const cart = new Cart("openCart", "close", "cart", this.cookie);
        cart.start().then(()=>{
            this.btnCheck();
            const profile = new Profile(cart.equipData, document.getElementById('avatar'))
        })
        
    }

    btnCheck(){
        for(let i = 0; i < this.buyBtns.length; i++){
            this.buyBtns[i].onclick = (e) =>{
                
                if(this.cookie !== null){
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

class Profile{
    constructor(data, avatarElement){
        this.avatarElement = avatarElement
        console.log(data)
        for(let i = 0; i < data.length; i++){
            if(data[i].equiped == 1){
                this.avatarElement.src = './src/img/avatars/' + data[i].item + '.png'
            }
        }
    }
}

class Cart{
    constructor(cartIconId, closeId, cartId, cookie){
        this.cart = document.getElementById(cartId);
        this.cartIcon = document.getElementById(cartIconId);
        this.close = document.getElementById(closeId);
        this.cookie = cookie;
        
    }

    async start(){
        const data = new Data()
        await data.getData(this.cookie).then(()=>{
            this.cartData = data.cartData;
            this.equipData = data.equipData;
            this.renderEquip();
            this.renderCart();
            this.cartIcon.onclick = this.openCart;
            this.close.onclick = this.closeCart;
        })
    }

    openCart = () =>{
        this.cart.style.display = "flex";
    }

    closeCart = () =>{
        this.cart.style.display = "none";
    }
    
    renderCart = () =>{
        this.appendingElementCart = document.getElementById("buy");
        for(let i = 0; i < this.cartData.length; i++){
            this.createCartItem(this.cartData[i].item, this.cartData[i].item, i)
            this.appendingElementCart.appendChild(this.cartSection);
        }
    }

    renderEquip = () =>{
        this.appendingElementEquip = document.getElementById("equip");
        for(let i = 0; i < this.equipData.length; i++){
            this.createEquipItem(this.equipData[i].item, this.equipData[i].item)
            this.appendingElementEquip.appendChild(this.equipSection);
        }
    }

    createCartItem = (avatar, text) =>{
        this.cartText = document.createElement("p");
        this.cartText.innerText = text;
        this.cartButton = document.createElement("button");
        this.cartButton.classList = "cartMenu__btn";
        this.cartButton.onclick = ()=>{
            this.transfer(text)}
        this.cartButton.innerHTML = "buy"

        this.cartArticle = document.createElement("article");
        this.cartArticle.classList = "cartMenu__dis"
        this.cartArticle.appendChild(this.cartText);
        this.cartArticle.appendChild(this.cartButton);

        this.cartImg = document.createElement("img")
        this.cartImg.classList = "cartMenu__img"
        this.cartImg.src = "./src/img/avatars/" + avatar + ".png";

        this.cartSection = document.createElement("section");
        this.cartSection.classList = "cartMenu__item"
        this.cartSection.appendChild(this.cartImg)
        this.cartSection.appendChild(this.cartArticle)
    }

    createEquipItem = (avatar, text) =>{
        this.equipText = document.createElement("p");
        this.equipText.innerText = text;
        this.equipButton = document.createElement("button");
        this.equipButton.classList = "cartMenu__btn";
        this.equipButton.onclick = ()=>{
            this.transfer(text)}

        this.equipButton.innerText = "equip"

        this.equipArticle = document.createElement("article");
        this.equipArticle.classList = "cartMenu__dis"
        this.equipArticle.appendChild(this.equipText);
        this.equipArticle.appendChild(this.equipButton);

        this.equipImg = document.createElement("img")
        this.equipImg.classList = 'cartMenu__img';
        this.equipImg.src = "./src/img/avatars/" + avatar + ".png";

        this.equipSection = document.createElement("section");
        this.equipSection.classList = "cartMenu__item"
        this.equipSection.appendChild(this.equipImg)
        this.equipSection.appendChild(this.equipArticle)
    }

    transfer = (Item)=>{
        fetch("http://localhost:8080/api/transfer",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"cookie":this.cookie, "item": Item})
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }

    EquipAvatar= (Item)=>{
        fetch("http://localhost:8080/api/equipAvatar",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"cookie":this.cookie, "item": Item})
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }
}

class Data{
    async getData(cookie){
        await fetch('http://localhost:8080/api/cart/' + cookie,{
            mode:"cors"
            })
            .then(response =>{
                return response.json();
                }).then(data =>{
                    this.cartData = data;
                });
        await fetch('http://localhost:8080/api/equip/' + cookie,{
            mode:"cors"
            })
            .then(response =>{
                return response.json();
                }).then(data =>{
                    this.equipData = data;
                });
    }
}

const app = new App()