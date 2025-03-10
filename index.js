const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Pranay",
        content: "I Love Coding"
    },
    {
        id: uuidv4(),
        username: "Pranay1",
        content: "I also Love Coding"
    }
]

app.get("/", (req, res) => {
    res.send("working")
})

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs")

})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    console.log(post);
    res.render("show.ejs", { post });

})

app.post("/posts", (req, res) => {

    let { username, content } = req.body
    let id = uuidv4()
    posts.push({ id,username, content })
    res.redirect("/posts")
})

app.listen(port, () => {
    console.log("Listining on port ", port)
})