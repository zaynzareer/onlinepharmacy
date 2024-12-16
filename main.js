const itembox = document.getElementById("itembox");
const tableEntry = document.getElementById("carttable");
const total = document.getElementById("total");
const buybtn = document.getElementById("buynow")
let items;
let tableitems = [];
 
window.addEventListener("load", loaditems);

function loaditems(){
    fetch("medicines.json")
    .then(item => item.json())
    .then(data => processitem(data))
    .catch(error => console.error(`Error occurred: ${error}`))
}

buybtn.disabled = true;
const processitem = (data) => {
    localStorage.removeItem("item");
    items = data;
    const categories = ["Antibiotics", "Analgesics", "Antidepressants", "Antihistamines", "Antihypertensives"];
    categories.forEach(category => {
        const catsection = document.createElement("section");
        catsection.classList.add("categorySection");

        const catheader = document.createElement("h2");
        catheader.innerText = category;
        catsection.append(catheader);
        const itemSection = document.createElement("div");
        itemSection.classList.add("itemSection");

        items.filter(item => item.category == category).forEach((medicine) => {
            let itemcards = document.createElement("div");
            itemcards.classList.add("itemcard");
            itemcards.setAttribute("data-id", medicine.id);
            itemcards.innerHTML = `
            <img src=${medicine.image} alt="${medicine.name} medicine image">
            <div class="title">${medicine.name}</div>
            <div class="price">Rs. ${medicine.price}</div>
            <div class="quantitydiv">
                <button onclick="changeQuantity(${medicine.id}, '-')"> - </button>
                <span class="quantity"> 0 </span>
                <button onclick="changeQuantity(${medicine.id}, '+')"> + </button> 
            </div>
            `;
            itemSection.append(itemcards);
            catsection.append(itemSection);
        });
        itembox.append(catsection);
    });
}

function changeQuantity(medicineid, type){
    const itemdiv = document.querySelector(`.itemcard[data-id = "${medicineid}"]`);
    const qnty = itemdiv.querySelector(".quantity");
    switch(type){
        case '+':
            copyofitems = JSON.parse(JSON.stringify(items));
            if(!tableitems[medicineid]){
                tableitems[medicineid] = copyofitems.filter(item => item.id == medicineid)[0];
                tableitems[medicineid].quantity = 1;
                qnty.innerText = 1;
            }else{
                tableitems[medicineid].quantity++;
                qnty.innerText = tableitems[medicineid].quantity;
            }
            break;
        case '-':
            tableitems[medicineid].quantity--;
            qnty.innerText = tableitems[medicineid].quantity;
            if(tableitems[medicineid].quantity <= 0){
                delete tableitems[medicineid];
                qnty.innerText = 0;
                break;
            }
        default:
            break;
    }
    reloadTable();
    buybtn.disabled = false;
}

function reloadTable(){
    tableEntry.innerHTML= '';
    let totalprice = 0;
    tableitems.forEach((medicine) => {
        //totalprice = totalprice + medicine.price;
        if(medicine != null){
            let newentry = document.createElement("tr");
            let itemtotalprice = medicine.price * medicine.quantity;
            totalprice += itemtotalprice;
            newentry.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.quantity}</td>
            <td>Rs. ${medicine.price}</td>`;
            tableEntry.append(newentry);
        }
    })
    total.innerText = "Rs. " + totalprice;
    //console.log("tableitems: ", tableitems);
    addToLocalStorage();
}

function addToLocalStorage(){
    localStorage.setItem("item", JSON.stringify(tableitems));
}


const addToTavouritesbtn = document.getElementById("addToFavourites");
const applyFavouritesbtn = document.getElementById("applyFavourites");

//testing

addToTavouritesbtn.addEventListener("click", addToFavourites);
applyFavouritesbtn.addEventListener("click", applyFavourites);


function addToFavourites(){
    if(tableitems === null){
        window.alert("No Items added to Cart!");
    } else{
        let checkoutlist =  JSON.stringify(tableitems);
        localStorage.setItem("favouriteItem", checkoutlist);
        //console.log("added to favourites: ", checkoutlist);
        window.alert("Items have been added to local Storage!");
    }
}

function applyFavourites(){
    //checkoutliststrings = JSON.parse(checkoutlist);
    //checkoutitem.innerText = checkoutliststrings;
    let checkoutliststuff = JSON.parse(localStorage.getItem("favouriteItem"));
    tableitems = checkoutliststuff;

    tableEntry.innerHTML= '';
    let totalprice = 0;
    tableitems.forEach((stuff) => {
        //totalprice = totalprice + stuff.price;
        if(stuff != null){
            let newentry = document.createElement("tr");
            let itemtotalprice = stuff.price * stuff.quantity;
            totalprice += itemtotalprice;
            newentry.innerHTML = ` 
            <td>${stuff.name}</td>
            <td>${stuff.quantity}</td>
            <td>Rs. ${stuff.price}</td>`;
            tableEntry.append(newentry);
        }
    })
    total.innerText = "Rs. " + totalprice;
    //console.log("checkoutliststuff: ", checkoutliststuff);
    //console.log("tableitesm: ", tableitems);
    addToLocalStorage();
}