const express = require("express");
const path = require("path");
const { formidable } = require("formidable");
const fs = require("fs");
const { db, connect, disconnect } = require("../../db/db");

const router = express.Router();

// API endpoints for User Portfolio
router.get("/api/startups", (req, res) => {
  const query = "SELECT * FROM startups";

  const dbConnected = connect();
  if (dbConnected) {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ startups: result });
      }
    });
    disconnect();
  } else {
    res.status(500).send("Database connection failed");
  }
});

router.post("/api/startups", (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    const file = files.image[0];
    const filenameSplit = file.originalFilename.split(".");
    const extension = filenameSplit[filenameSplit.length - 1];
    const nameWithoutExtension = file.originalFilename.substring(
      0,
      file.originalFilename.length - (extension.length + 1)
    );

    const oldPath = file.filepath;
    const newFilename = `${Date.now()}-${nameWithoutExtension}-${
      Math.random() * 10000
    }.${extension}`;
    const newPath = path.join(__dirname, "/uploads/images/") + newFilename;
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;

      const dbConnected = connect();

      if (dbConnected) {
        const query = `INSERT INTO startups (type, name, website, img) VALUES ('${fields.startupType[0]}', '${fields.startupName[0]}', '${fields.websiteUrl[0]}', '${newFilename}')`;
        db.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error creating startup");
            disconnect();
            return;
          }

          res.status(201).send(`Startup added with ID: ${result.insertId}`);
          disconnect();
        });
      } else {
        res.status(500).send("Database connection failed");
      }
    });
  });
});

router.put("/api/startups", (req, res) => {
  const { id } = req.query;

  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (Object.keys(files).length !== 0) {
      const file = files.image[0];

      const filenameSplit = file.originalFilename.split(".");
      const extension = filenameSplit[filenameSplit.length - 1];
      const nameWithoutExtension = file.originalFilename.substring(
        0,
        file.originalFilename.length - (extension.length + 1)
      );

      const oldPath = file.filepath;
      const newFilename = `${Date.now()}-${nameWithoutExtension}-${
        Math.random() * 10000
      }.${extension}`;
      const newPath = path.join(__dirname, "/uploads/images/") + newFilename;
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;

        const dbConnected = connect();

        if (dbConnected) {
          const query = `UPDATE startups SET type='${fields.startupType[0]}' name='${fields.startupName[0]}' website='${fields.websiteUrl[0]}' img='${newFilename}' WHERE id=${id})`;
          db.query(query, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error updating startup");
              disconnect();
              return;
            }

            res.send(`Startup updated with ID: ${result.insertId}`);
            disconnect();
          });
        } else {
          res.status(500).send("Database connection failed");
        }
      });
    } else {
      const dbConnected = connect();

      if (dbConnected) {
        const query = `UPDATE startups SET type='${fields.startupType[0]}' name='${fields.startupName[0]}' website='${fields.websiteUrl[0]}' WHERE id=${id})`;
        db.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error updating startup");
            disconnect();
            return;
          }

          res.send(`Startup updated with ID: ${result.insertId}`);
          disconnect();
        });
      } else {
        res.status(500).send("Database connection failed");
      }
    }
  });
});

router.delete("/api/startups", (req, res) => {
  const { id } = req.query;

  const dbConnected = connect();

  if (dbConnected) {
    const query = `DELETE FROM startups WHERE id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting startup");
        disconnect();
        return;
      }

      res.status(204);
      res.end();
      disconnect();
    });
  }
});

module.exports = router;
