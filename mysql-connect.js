const { request } = require("express");

const mysql = require("mysql");

let connectionPool = mysql.createPool({
  connectionLimit: 1,
  host: "localhost",
  user: "root",
  password: "rootpass123",
  database: "scrapperApp",
  debug: false,
});

//Build query

function insertData(name, views, subs, popular) {
  let sql = `INSERT INTO creator (id, name, img, ytURL, email)        
  VALUES (4, '${name}', '${views}', '${subs}', '${popular}')`;

  connectionPool.query(sql, (err, result) => {
    if (err) {
      //Check for errors
      console.error(`Error executing query: ${JSON.stringify(err)}`);
    } else {
      console.log(JSON.stringify(result));
    }
  });
}

/* Outputs all of the employees */
function getEmployees() {
  //Build query
  let sql = "SELECT * FROM creator";

  //Execute query and output results
  connectionPool.query(sql, (err, result) => {
    if (err) {
      //Check for errors
      console.error("Error executing query: " + JSON.stringify(err));
    } else {
      //Output results in JSON format - a web service would return this string.
      console.log(JSON.stringify(result));
    }
  });
}

module.exports = { insertData, getEmployees };

//Execute query and output resul
