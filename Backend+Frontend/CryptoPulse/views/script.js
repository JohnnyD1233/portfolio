const API_URL = "<%= API_URL %>";
const headers = '<%= headers %>';
const Bitcoin = "<%= Bitcoin %>";
const Etherium = "<%= Etherium %>";
const USDT = "<%= USDT %>";

function updatePrice(id, newPrice) {
const priceElement = document.getElementById(id);
const imageElement = document.getElementById(`${id}-img`);
const previousPrice = parseFloat(priceElement.textContent);

if (newPrice > previousPrice) {
priceElement.classList.remove("price-down");
priceElement.classList.add("price-up");
imageElement.src = "/images/green 2.png";
imageElement.style.display = "inline"; // Ensure the image is visible
} else if (newPrice < previousPrice) {
priceElement.classList.remove("price-up");
priceElement.classList.add("price-down");
imageElement.src = "/images/red 2.png";
imageElement.style.display = "inline"; // Ensure the image is visible
} else {
priceElement.classList.remove("price-up", "price-down");
imageElement.style.display = "none"; // Hide the image if no change
}

priceElement.textContent = newPrice.toFixed(2); // Update the price
}


async function fetchPrices() {
console.log("Fetching prices...");
try {
const headers = new Headers({
Accept: "application/json",
"X-API-Token": "799470de-8a4c-4ee5-b0a4-a6321b0e9dc2",
});

const Bresponse = await fetch(API_URL + Bitcoin, { headers });
if (!Bresponse.ok) throw new Error(`HTTP error! status: ${Bresponse.status}`);
const Bresult = await Bresponse.json();
console.log("Bitcoin data:", Bresult);
const Bprice = parseFloat(Bresult.bids[1].px);
console.log("Bitcoin price:", Bprice);

const Eresponse = await fetch(API_URL + Etherium, { headers });
if (!Eresponse.ok) throw new Error(`HTTP error! status: ${Eresponse.status}`);
const Eresult = await Eresponse.json();
console.log("Ethereum data:", Eresult);
const Eprice = parseFloat(Eresult.bids[1].px);
console.log("Ethereum price:", Eprice);

const Uresponse = await fetch(API_URL + USDT, { headers });
if (!Uresponse.ok) throw new Error(`HTTP error! status: ${Uresponse.status}`);
const Uresult = await Uresponse.json();
console.log("USDT data:", Uresult);
const Uprice = parseFloat(Uresult.bids[1].px);
console.log("USDT price:", Uprice);

updatePrice("Bprice", Bprice);
updatePrice("Eprice", Eprice);
updatePrice("Uprice", Uprice);
} catch (error) {
console.error("Error fetching prices:", error);
}
}

setInterval(fetchPrices, 3000);
fetchPrices();