const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE book (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            topic text, 
            price INTEGER, 
            quantity INTEGER
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO book (title, topic, price, quantity) VALUES (?,?,?,?)";
          db.run(insert, [
            "How to get a good grade in DOS in 40 minutes a day",
            "distributed systems",
            100,
            20,
          ]);
          db.run(insert, ["RPCs for Noobs", "distributed systems", 180, 30]);
          db.run(insert, [
            "Xen and the Art of Surviving Undergraduate School",
            "undergraduate school",
            200,
            10,
          ]);
          db.run(insert, [
            "Cooking for the Impatient Undergrad",
            "undergraduate school",
            150,
            40,
          ]);
        }
      }
    );
  }
});

module.exports = db;
