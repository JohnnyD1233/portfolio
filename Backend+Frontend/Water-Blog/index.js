import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let postId = 1;

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/profile", (req, res) => {
  res.render("profile.ejs", { posts });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id));
  res.render("content.ejs", { post });
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const post = { id: postId++, title, content };
  posts.push(post);
  res.redirect("/");
  console.log(post.content, post.title);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
