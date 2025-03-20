const Base_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for(let select of dropdowns){
    for (currCode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currCode;
        newoption.value = currCode;
        if(select.name == "from" && currCode == "USD"){
            newoption.selected = "selected";
        }else if(select.name == "to" && currCode == "INR"){
            newoption.selected = "selected";
        }

        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = `${Base_URL}/${toCurr.value}_${fromCurr.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rate;
    console.log(rate);

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `

}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});


window.addEventListener("load", ()=>{
    updateExchangeRate();
})
