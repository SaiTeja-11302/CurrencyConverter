// app.js
// Base API URL for exchange rates (static data from GitHub)
const Base_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

// DOM Elements
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// currency dropdowns with options
for(let select of dropdowns){
    for (currCode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currCode;
        newoption.value = currCode;
        
        // Set default selections
        if(select.name == "from" && currCode == "USD"){
            newoption.selected = "selected";
        }else if(select.name == "to" && currCode == "INR"){
            newoption.selected = "selected";
        }

        select.append(newoption);
    }
    // Update flag when currency changes
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Fetch exchange rate and update result
const updateExchangeRate = async ()=>{
    // Get and validate input amount
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1"; 
    }
    
    // Construct API URL with selected currencies
    const URL = `${Base_URL}/${toCurr.value}_${fromCurr.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rate;
    console.log(rate);

    // Calculate and display converted amount
    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `

}

// Update flag image when currency changes
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Event Listeners
btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

// Initial load handler
window.addEventListener("load", ()=>{
    updateExchangeRate();
})
