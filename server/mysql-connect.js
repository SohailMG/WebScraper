

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

async function storeNewShow(name, genres, ratings, image, premiered) {
  let shows = await getAllShows();
  // console.log(shows);

  let isDublicate;
  shows.forEach((show) => {
    console.log(show);
    if (show.title == name) {
      isDublicate = true;
    } else {
      isDublicate = false;
    }
  });
  if (!isDublicate) {
    let sql = `INSERT INTO TVShows (show_id, title, genres, ratings, premiered,image)        
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
async function getAllTrending() {
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
async function getAllShows() {
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
  let sql = `SELECT * FROM TVShows WHERE title='${showName}'`;
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
async function getReviews() {
  let sql =
    "SELECT u.name ,t.title, t.image,r.review ,r.rating FROM Users u , TVShows t , Reviews r WHERE r.user_id  = u.user_id AND r.show_id = t.show_id ";
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
async function getAverageRatings() {
  let sql =
    `SELECT r.show_id , ROUND(AVG(rating),1) AS 'Average',t.title
    FROM Reviews r,TVShows t 
    WHERE r.show_id  = t.show_id 
    GROUP BY  r.show_id `;
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

function storeUserReview(show_id, user_id, rating, review) {
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

async function getLoggedName(userEmail) {
  let sql = `SELECT u.name FROM Users u WHERE email='${userEmail}'`;
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
async function removeReviewPost(review) {
  let sql = `DELETE FROM Reviews WHERE review='${review}' ;`;
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
async function updateReviewPost(newReview,oldreview) {
  let sql = `UPDATE Reviews SET review = '${newReview}' WHERE review = '${oldreview}' ;`;
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

module.exports = {
  storeNewUser,
  storeNewShow,
  getAllTrending,
  storeTrendings,
  deleteCurrentData,
  getUserInfo,
  getShowInfo,
  storeUserReview,
  getReviews,getAverageRatings,getLoggedName,removeReviewPost,updateReviewPost
};

//Execute query and output resul
