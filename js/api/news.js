const express = require("express");
const path = require("path");
const { formidable } = require("formidable");
const fs = require("fs");
const { db, connect, disconnect } = require("../../db/db");

const router = express.Router();

// API endpoints for News
router.get("/api/news", (req, res) => {
  const query = `SELECT * FROM news`;

  const dbConnected = connect();
  if (dbConnected) {
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
    disconnect();
  } else {
    res.status(500).send("Database connection failed");
  }
});

router.post("/api/news", (req, res) => {
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
          const query = `INSERT INTO news (headline, description, url, img) VALUES ('${fields.headline[0]}', '${fields.description[0]}', '${fields.url[0]}', '${newFilename}')`;
          db.query(query, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error creating news");
              disconnect();
              return;
            }

            res.status(201).send(`News added with ID: ${result.insertId}`);
            disconnect();
          });
        } else {
          res.status(500).send("Database connection failed");
        }
      });
    } else {
      const dbConnected = connect();

      if (dbConnected) {
        const query = `INSERT INTO news (headline, description, url) VALUES ('${fields.headline[0]}', '${fields.description[0]}', '${fields.url[0]}')`;
        db.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error creating news");
            disconnect();
            return;
          }

          res.status(201).send(`News added with ID: ${result.insertId}`);
          disconnect();
        });
      } else {
        res.status(500).send("Database connection failed");
      }
    }
  });
});

router.put("/api/news", (req, res) => {
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
          const query = `UPDATE news SET headline='${fields.headline[0]}' description='${fields.description[0]}' url='${fields.url[0]}' img='${newFilename}' WHERE id=${id})`;
          db.query(query, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error updating news");
              disconnect();
              return;
            }

            res.send(`News updated with ID: ${result.insertId}`);
            disconnect();
          });
        } else {
          res.status(500).send("Database connection failed");
        }
      });
    } else {
      const dbConnected = connect();

      if (dbConnected) {
        const query = `UPDATE news SET headline='${fields.headline[0]}' description='${fields.description[0]}' url='${fields.url[0]}' WHERE id=${id})`;
        db.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error updating news");
            disconnect();
            return;
          }

          res.send(`News updated with ID: ${result.insertId}`);
          disconnect();
        });
      } else {
        res.status(500).send("Database connection failed");
      }
    }
  });
});

router.delete("/api/news", (req, res) => {
  const { id } = req.query;

  const dbConnected = connect();

  if (dbConnected) {
    const query = `DELETE FROM news WHERE id=${id}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting news");
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
