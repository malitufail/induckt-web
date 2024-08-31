const mysql = require("mysql2");

// const host = "bscvmt8i12ludoap3nyr-mysql.services.clever-cloud.com";
// const user = "upxdtbft2x2o4qxg";
// const password = "vpdBQzMl3Cf3hyk8kKxP";
// const database = "bscvmt8i12ludoap3nyr";

const host = "localhost";
const user = "root";
const password = "Wh0isthis??";
const port = 3306;
const database = "wormos";

const db = mysql.createConnection({
  host,
  user,
  password,
  port,
  database
});

const connect = () => {
  try {
    db.connect();
    console.log("Database connected");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const disconnect = () => {
  try {
    db.end();
    console.log("Database disconnected");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { db, connect, disconnect };
