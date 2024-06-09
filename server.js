const express = require("express");
const portfolioRoutes = require("./js/api/portfolio");

const app = express();
const port = 3000;
app.use(express.static(__dirname));
app.use(portfolioRoutes);

app.get("/", function (req, res) {
  // console.log(req);
  // console.log(res);
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server Started on Port 3000");
});
