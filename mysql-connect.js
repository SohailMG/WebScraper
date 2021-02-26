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

function insertData(id,name, genres, ratings,image,premiered) {
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

/* Outputs all of the employees */
function getEmployees() {
  //Build query
  let sql = "SELECT * FROM TVShows";
  let data ;

  //Execute query and output results
  connectionPool.query(sql, (err, result) => {
    if (err) {
      //Check for errors
      console.error("Error executing query: " + JSON.stringify(err));
    } else {
      //Output results in JSON format - a web service would return this string.
      console.log(JSON.stringify(result));
      data = JSON.stringify(result);
      // return JSON.stringify(data);
    }
  });
  return data;
}

module.exports = { insertData, getEmployees };

//Execute query and output resul
