const express = require("express");
const portfolioRouter = require("./js/api/portfolio");
const newsRouter = require("./js/api/news");
const { connect, disconnect } = require("./db/db");

const app = express();
const port = 3000;
app.use(express.static(__dirname));
app.use(express.json());

// Assigning API routers to the app instance
app.use(portfolioRouter);
app.use(newsRouter);

app.get("/", function (req, res) {
  // console.log(req);
  // console.log(res);
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
  connect();
});

const handleShutdown = (signal) => {
  console.log(
    `Received ${signal}. Closing server and disconnecting from the database...`
  );
  server.close(() => {
    console.log("Server closed");
    disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);
