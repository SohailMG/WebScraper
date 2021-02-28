const request = require("express");
const xhttp = require("http");
const axios = require("axios");

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

function storeNewShow(id, name, genres, ratings, image, premiered) {
  let sql = `INSERT INTO TVShows (id, name, genres, ratings, premiered,image)        
  VALUES (default, '${name}', '${genres}', '${ratings}', '${premiered}', '${image}')`;

  connectionPool.query(sql, (err, result) => {
    if (err) {
      //Check for errors
      console.error(`Error executing query: ${JSON.stringify(err)}`);
    } else {
      console.log(JSON.stringify(result));
    }
  });
}

function storeTrendings(id, name, genres, ratings, image, premiered) {
  let sql = `INSERT INTO Trending (id, name, genres, ratings, premiered,image)        
  VALUES (default, '${name}', '${genres}', '${ratings}', '${premiered}', '${image}')`;

  connectionPool.query(sql, (err, result) => {
    if (err) {
      //Check for errors
      console.error(`Error executing query: ${JSON.stringify(err)}`);
    } else {
      console.log(JSON.stringify(result));
    }
  });
}

function deleteCurrentData(){
    //Delete all customers with the address "Mountain 21":
    var sql = "DELETE FROM Trending"
    connectionPool.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
}
/* Outputs all of the employees */

/* Returns a promise to get employees. */
async function getEmployees() {
  //Build query
  let sql = "SELECT * FROM TVShows";
  //Wrap the execution of the query in a promise
  return new Promise((resolve, reject) => {
    connectionPool.query(sql, (err, result) => {
      if (err) {
        //Check for errors
        reject("Error executing query: " + JSON.stringify(err));
      } else {
        //Resolve promise with results
        resolve(result);
      }
    });
  })
}

module.exports = { storeNewShow, getEmployees ,storeTrendings,deleteCurrentData};

//Execute query and output resul
