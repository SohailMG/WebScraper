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

function storeNewShow(name, genres, ratings, image, premiered) {
  let sql = `INSERT INTO TVShows (show_id, name, genres, ratings, premiered,image)        
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

function deleteCurrentData() {
  //Delete all customers with the address "Mountain 21":
  var sql = "DELETE FROM Trending";
  connectionPool.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
}
/* Outputs all of the employees */

/* Returns a promise to get employees. */
async function getAllShows() {
  //Build query
  let sql = "SELECT * FROM Trending";
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
  });
}

function storeNewUser(name, email, password) {
  let sql = `INSERT INTO Users (user_id, name, email, password)        
  VALUES (default, '${name}', '${email}', '${password}')`;

  connectionPool.query(sql, (err, result) => {
    if (err) {
      //Check for errors
      console.error(`Error executing query: ${JSON.stringify(err)}`);
    } else {
      console.log(JSON.stringify(result));
    }
  });
}

async function getUserInfo(username) {
  let sql = `SELECT * FROM Users WHERE email='${username}'`;
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
  });
}
async function getShowInfo(showName) {
  let sql = `SELECT * FROM TVShows WHERE name='${showName}'`;
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
  });
}

function storeUserReview(show_id, user_id,rating,review) {
  let sql = `INSERT INTO Reviews (review_id,show_id, user_id, rating,review)        
  VALUES (default, '${show_id}', '${user_id}','${rating}','${review}')`;

  connectionPool.query(sql, (err, result) => {
    if (err) {
      //Check for errors
      console.error(`Error executing query: ${JSON.stringify(err)}`);
    } else {
      console.log(JSON.stringify(result));
    }
  });
}




module.exports = {
  storeNewUser,
  storeNewShow,
  getAllShows,
  storeTrendings,
  deleteCurrentData,
  getUserInfo,
  getShowInfo,
  storeUserReview
};

//Execute query and output resul
