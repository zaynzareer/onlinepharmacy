const checkoutitem = document.getElementById("checkoutbox");
const showTotalQnty = document.getElementById("showTotalQnty");
const showTotalPrice = document.getElementById("showTotalPrice");

function checkout(){
    //checkoutitem.innerText = "HI this is the new page";
    let checkoutList = JSON.parse(localStorage.getItem("item"));
    //let subtotal = 0;
    let grandTotal = 0;
    let totalQuantity = 0;
    if(checkoutList){
        checkoutList.forEach((item) => {
            if(item){
            let checkoutitems = document.createElement("div");
            checkoutitems.classList.add("checkoutlist");
            checkoutitems.innerHTML = `
            <div>${item.name}</div>
            <div>Rs. ${item.price}</div>
            <div>${item.quantity}</div>
            <div>Rs. ${item.price * item.quantity}</div>
            `; 
            checkoutitem.append(checkoutitems);
            grandTotal = grandTotal + (item.price * item.quantity)
            totalQuantity = totalQuantity + item.quantity;
            }
        });
    };
    showTotalQnty.innerText = totalQuantity;
    showTotalPrice.innerText = "Rs. " + grandTotal;
}
checkout();

//toggle card details on and off

const radioOptions = document.querySelectorAll("input[name='payment']");
const cardDetails = document.querySelectorAll(".carddetails");

radioOptions.forEach(radio => {
  radio.addEventListener("change", showCardDetails);
});

function showCardDetails() {
  if (this.value === "card") {
    cardDetails.forEach(div => {
      div.style.display = "block";
    });
  } else {
    cardDetails.forEach(div => {
      div.style.display = "none";
    });
  }
}


const payButton = document.getElementById("paybtn");
const popup = document.getElementById("popup")
const opacityitem = document.querySelector("#checkoutsection");

payButton.addEventListener("click", displayPopup)

function displayPopup() {
  const form = document.getElementById('userdetails');
  if (form.checkValidity()){
    popup.style.top = "30%";
    popup.style.transform = "scale(1)";
    popup.style.display = "block";
    opacityitem.style.opacity = "0.4";
  } else {
    alert('Please fill in all required fields.');
  }
};


//date function
const datetext = document.getElementById("orderDate")
function calDate(){
  date = new Date();
  date.setDate(date.getDate() + 10);
  datetext.innerText = date.toDateString();
}
calDate()