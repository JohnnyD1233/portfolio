import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const db = new pg.Client({

  user:"postgres",
  host: "localhost",
  database: "World",
  password: "YonBM221101",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

app.get("/",async (req, res) => {
  const result = await db.query("SELECT * FROM items")
  let items = result.rows
  // console.log(items[0].id)
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add",async (req, res) => {
  try {
    const item = req.body.newItem;
    console.log(item)
    await db.query("INSERT INTO items (title) VALUES ($1)",[item])
    // items.push({ title: item });
    res.redirect("/");
  } catch (error){
    console.log(err.stack)
  }
});

app.post("/edit/",async (req, res) => {
  try {
    const itemID = req.body.updatedItemId
    // console.log(itemID)
    const itemTitle = req.body.updatedItemTitle
    // console.log(itemTitle)
    await db.query("UPDATE items SET title = $1 WHERE id = $2",[itemTitle,itemID])
    res.redirect("/");
  } catch (error) {
    console.log(err.stack)
  }
});

app.post("/delete",async (req, res) => {
  try {
    const itemID = req.body.deleteItemId
    console.log(itemID)
    await db.query("DELETE FROM items WHERE id = $1",[itemID])
    res.redirect("/");

  } catch (error) {
    console.log(err.stack)
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
