const express = require("express");
const portfolioRouter = require("./js/api/portfolio");
const newsRouter = require("./js/api/news");

const app = express();
const port = 3000;
app.use(express.static(__dirname));

// Assigning API routers to the app instance
app.use(portfolioRouter);
app.use(newsRouter);

app.get("/", function (req, res) {
  // console.log(req);
  // console.log(res);
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server Started on Port 3000");
});
