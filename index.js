const express = require("express");
const db = require("./database.js");

const app = express();

app.listen(3000, () => console.log("Listening on port 3000..."));

app.get("/", (req, res) => {
  res.send("This is the Catalog Server of Bazar.com ");
});

app.get("/catalog/search/:topic", (req, res) => {
  db.all(
    "select id, title from book where topic = ?",
    [req.params.topic],
    (err, rows) => {
      if (err) {
        res.status(400).send("Bad Request");
      } else if (!rows || rows.length == 0) {
        res.status(403).send(`Books with topic: ${req.params.topic} Not Found`);
      } else {
        res.status(200).send(JSON.stringify(rows));
      }
    }
  );
});

app.get("/catalog/info/:id", (req, res) => {
  db.get(
    "select title, price, quantity from book where id = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        res.status(400).send("Bad Request");
      } else if (!row) {
        res.status(403).send(`Book with id: ${req.params.id} Not Found`);
      } else {
        res.status(200).send(JSON.stringify(row));
      }
    }
  );
});

app.put("/catalog/update/:id", (req, res) => {
  db.run(
    "update book set quantity = quantity - 1 where id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        res
          .status(403)
          .send("something went wrong while updating book quantity");
      }
      res.status(200).send("bought book");
    }
  );
});
