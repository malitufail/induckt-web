const express = require("express");
const path = require("path");
const { formidable } = require("formidable");
const fs = require("fs");
const { db, connect, disconnect } = require("../../db/db");

const router = express.Router();

// API endpoints for User Portfolio
router.get("/api/startups", (req, res) => {
  const query = "SELECT * FROM startups";

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ startups: result });
    }
  });
});

router.post("/api/startups", (req, res) => {
  console.log(req.body);
  const { startupType, startupName, websiteURL } = req.body;

  const query = `INSERT INTO startups (type, name, website) VALUES ('${startupType}', '${startupName}', '${websiteURL}')`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating startup");

      return;
    }

    res
      .status(201)
      .json({ message: `Startup added with ID: ${result.insertId}` });
  });

  // console.log(req);
  // const form = formidable({ multiples: true });
  // form.parse(req, (err, fields, files) => {
  //   console.log(fields);
  //   console.log(files);
  //   if (Object.keys(files).length !== 0) {
  //     const file = files.image[0];
  //     const filenameSplit = file.originalFilename.split(".");
  //     const extension = filenameSplit[filenameSplit.length - 1];
  //     const nameWithoutExtension = file.originalFilename.substring(
  //       0,
  //       file.originalFilename.length - (extension.length + 1)
  //     );

  //     const oldPath = file.filepath;
  //     const newFilename = `${Date.now()}-${nameWithoutExtension}-${
  //       Math.random() * 10000
  //     }.${extension}`;
  //     const newPath = path.join(__dirname, "/uploads/images/") + newFilename;
  //     fs.rename(oldPath, newPath, (err) => {
  //       if (err) throw err;

  //       const query = `INSERT INTO startups (type, name, website, img) VALUES ('${fields.startupType[0]}', '${fields.startupName[0]}', '${fields.websiteUrl[0]}', '${newFilename}')`;
  //       db.query(query, (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send("Error creating startup");
  //           return;
  //         }

  //         res.status(201).send(`Startup added with ID: ${result.insertId}`);
  //       });
  //     });
  //   } else {
  //     const query = `INSERT INTO startups (type, name, website) VALUES ('${fields.startupType[0]}', '${fields.startupName[0]}', '${fields.websiteUrl[0]}')`;
  //     db.query(query, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send("Error creating startup");

  //         return;
  //       }

  //       res.status(201).send(`Startup added with ID: ${result.insertId}`);
  //     });
  //   }
  // });
});

router.put("/api/startups", (req, res) => {
  const { id } = req.query;
  const { startupType, startupName, websiteURL } = req.body;

  const query = `UPDATE startups SET type='${startupType}', name='${startupName}', website='${websiteURL}' WHERE id=${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating startup");

      return;
    }

    res.json({ message: `Startup updated with ID: ${result.insertId}` });
  });

  // const form = formidable({ multiples: true });

  // form.parse(req, (err, fields, files) => {
  //   if (Object.keys(files).length !== 0) {
  //     const file = files.image[0];

  //     const filenameSplit = file.originalFilename.split(".");
  //     const extension = filenameSplit[filenameSplit.length - 1];
  //     const nameWithoutExtension = file.originalFilename.substring(
  //       0,
  //       file.originalFilename.length - (extension.length + 1)
  //     );

  //     const oldPath = file.filepath;
  //     const newFilename = `${Date.now()}-${nameWithoutExtension}-${
  //       Math.random() * 10000
  //     }.${extension}`;
  //     const newPath = path.join(__dirname, "/uploads/images/") + newFilename;
  //     fs.rename(oldPath, newPath, (err) => {
  //       if (err) throw err;

  //       const query = `UPDATE startups SET type='${fields.startupType[0]}' name='${fields.startupName[0]}' website='${fields.websiteUrl[0]}' img='${newFilename}' WHERE id=${id})`;
  //       db.query(query, (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(500).send("Error updating startup");

  //           return;
  //         }

  //         res.send(`Startup updated with ID: ${result.insertId}`);
  //       });
  //     });
  //   } else {
  // const query = `UPDATE startups SET type='${fields.startupType[0]}' name='${fields.startupName[0]}' website='${fields.websiteUrl[0]}' WHERE id=${id})`;
  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send("Error updating startup");

  //     return;
  //   }

  //   res.send(`Startup updated with ID: ${result.insertId}`);
  // });
  //   }
  // });
});

router.delete("/api/startups", (req, res) => {
  const { id } = req.query;

  const query = `DELETE FROM startups WHERE id=${id}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting startup");
      return;
    }

    res.status(204);
    res.end();
  });
});

module.exports = router;
