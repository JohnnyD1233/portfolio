import express from "express";
import axios from "axios";
const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange/l2/";
const headers = {
  Accept: "application/json",
  "X-API-Token": "799470de-8a4c-4ee5-b0a4-a6321b0e9dc2",
};

app.use(express.static("public"));

const Bitcoin = "BTC-USD";
const Etherium = "ETH-USD";
const USDT = "USDT-USD";
const FUSDT = "Not in the Blockchain yet";

app.get("/", async (req, res) => {
  try {
    const Bresult = await axios.get(API_URL + Bitcoin, headers);
    const Bdata = Bresult.data;
    const BTC = Bdata.symbol;

    const Eresult = await axios.get(API_URL + Etherium, headers);
    const Edata = Eresult.data;
    const ETH = Edata.symbol;

    const Uresult = await axios.get(API_URL + USDT, headers);
    const Udata = Uresult.data;
    const USD = Udata.symbol;

    const Bprice = parseFloat(Bdata.bids[1].px);
    const Eprice = parseFloat(Edata.bids[1].px);
    const Uprice = parseFloat(Udata.bids[1].px);

    res.render("index.ejs", {
      BTC,
      ETH,
      USD,
      FUSDT,
      Bprice,
      Eprice,
      Uprice,
      API_URL,
      headers: JSON.stringify(headers),
      Bitcoin,
      Etherium,
      USDT,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});