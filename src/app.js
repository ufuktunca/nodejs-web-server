const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ufuk Barış",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    text: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.json({
      error: "You have to send address value",
    });
    return;
  }
  res.json({
    location: "İstanbul",
    forecast: 3000,
    address: req.query.address,
  });
});

app.get("/products", (req, res) => {
  res.json({
    products: [],
    query: req.query.search,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    text: "This is 404 page",
  });
});

app.listen(port, () => {
  console.log("Server is start to listen:" + port);
});
