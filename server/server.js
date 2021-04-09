const express = require("express");
const bodyParser = require("body-parser");
const db = require("./mysql-connect");
const url = require("url")
const request = require("request");
const app = express();
const port = 3000;
const APIEndpoint = "http://api.tvmaze.com/";
const expressSession = require("express-session");
const { Show } = require("./trending");

app.use(express.static("../public"));
app.use(bodyParser.json());


//handles post request of show data being added
app.get("/search", getSearches);
app.post("/update", updatePost);
app.post("/remove", removePost);
app.get("/reviews", displayReviews);
app.post("/shows", (request, response) => {
  //stores show data into database
  let show = request.body.Show;
  db.storeNewShow(
    show.name,
    show.Genres,
    show.Rating,
    show.image,
    show.Premiered
  );

  response.send({ message: "Show added" });
});
app.post("/register", (request, response) => {
  //stores show data into database
  let user = request.body.userInfo;
  db.storeNewUser(user.username, user.email, user.password);
  response.send({ message: "user added" });
});
app.post("/login", async (request, response) => {
  //stores show data into database
  let user = request.body.userInfo;
  console.log(user);

  const userData = await db.getUserInfo(user.email);

  if (userData[0].password == user.password) {
    response.send({ message: "Login Successfull" });
  } else {
    response.send({ message: "Login Unsuccessful" });
  }
});
app.post("/review", storeShowReview);
app.post("/logged", getLoggedName);
app.get("/sort",async function (req,res) {
  const queryObject = url.parse(req.url,true).query;
  const genre = queryObject.genre;
  
  let shows = await db.getShowByGenre(genre);
  res.send(JSON.stringify(shows))
  
})
app.get("/shows", async (request, response) => {
  //Output the data sent to the server
  let allData = await db.getAllTrending();
  let randomShows = allData.sort( () => .5 - Math.random() ).slice(0,6);
  response.send(randomShows)
});



async function displayReviews(req, res) {
  let custReviews = await db.getReviews();
  let avgRatings = await db.getAverageRatings();
  console.log(avgRatings);

  res.send({ custReviews, avgRatings });
}

/**
 * performs a get request to an API with the search
 * queries and returns all matching results with a maximum
 * of 5 searches
 * @param {JSON} req
 * @param {JSON} res
 */
function getSearches(req, res) {
  const MAX_SEARCHES = 5;
  const searchQuery = url.parse(req.url,true).query.show
  let showD = [];
  // get request to api with search query
  request(
    `${APIEndpoint}/search/shows?q=${searchQuery}`,
    function (error, response, body) {
      let data;
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
        for (let i = 0; i < MAX_SEARCHES; i++) {
          if (data[i] !== undefined) {
            if (data[i].show.image != null) {
              let newShow = new Show(
                data[i].show.name,
                data[i].show.rating.average,
                data[i].show.genres[0],
                data[i].show.premiered,
                data[i].show.image.medium
              );
              showD.push(newShow);
            } else {
            }
          }
        }
        res.send(showD);
      }
    }
  );
}

/**
 * making a get request to the API with for all shows data
 * looping through JSON data and extracting all shows that have
 * drama,action or comedy genres with rating more than 7
 * 
 */
(function getAllShows() {
  // API request to endpoint
  request(`${APIEndpoint}shows`, function (error, response, body) {
    let data;
    let drama = [];
    let Action = [];
    let Comedy = [];
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      // looping through object of shows data
      for (let i = 0; i < data.length; i++) {
        const show = data[i];
        // checking if current show is drama genre
        if (show.genres[0] == "Drama") {
          if (show.rating.average > 7) {
            // instantiating Show class contructor
            let newShow = new Show(
              show.name,
              show.rating.average,
              show.genres[0],
              show.premiered,
              show.image.medium
            );
            drama.push(newShow);
          }
        }
        // checking if current show has Action genre
        if (show.genres[0] == "Action") {
          if (show.rating.average > 7) {
            let newShow = new Show(
              show.name,
              show.rating.average,
              show.genres[0],
              show.premiered,
              show.image.medium
            );
            Action.push(newShow);
          }
        }
        // checking if current show has comedy genre
        if (show.genres[0] == "Comedy") {
          if (show.rating.average > 7) {
            let newShow = new Show(
              show.name,
              show.rating.average,
              show.genres[0],
              show.premiered,
              show.image.medium
            );
            Comedy.push(newShow);
          }
        }
      }
    }

    // decreasing the length of each array of shows to 6 shows per array
    drama.splice(0, drama.length - 6);
    Action.splice(0, Action.length - 6);
    Comedy.splice(0, Comedy.length - 6);
    // combining all arrays into one array
    let allShows = Action.concat(drama).concat(Comedy);
      db.deleteCurrentData();
      // storing all shows into database
    allShows.forEach(show => {
      db.storeTrendings(show.name,show.genre,show.rating,show.image,show.date);
      
    });

    
    
    
  });
}());

/**
 * handles post request to reviews path send from 
 * client and stores review details with show id to the 
 * review table in the database then responds to server with
 * confirmation message
 * @param {JSON} request 
 * @param {JSON} response 
 */
async function storeShowReview(request, response) {
  //stores show data into database
  let review = request.body.reviews;
  let showName = review.show;
  let userEmail = review.user;
  let customerReview = review.content;
  let rating = review.rating;

  // retrieving details of user submiting the review
  // and details of show being reviewed
  let userInfo = await db.getUserInfo(userEmail);
  let showInfo = await db.getShowInfo(showName);
  const storedShowName = showInfo[0].title;
  const storedUserEmail = userInfo[0].email;
  const show_id = showInfo[0].show_id;
  const user_id = userInfo[0].user_id;

  // checking if user matches send user and show exists
  if (storedUserEmail == userEmail && storedShowName == showName) {
    db.storeUserReview(show_id, user_id, rating, customerReview);
    response.send({ message: "Review Added" });
  }
}
/**
 * restrievees the name of the currently logged user and 
 * sends back to the client
 * @param {JSON} request 
 * @param {JSON} response 
 */
async function getLoggedName(request, response) {
  let postedEmail = request.body.userEmail;
  let loggedName = await db.getLoggedName(postedEmail);
  response.send(loggedName);
}
/**
 * handles post request of review to be removed
 * removed the review from the database
 * @param {JSON} request 
 * @param {JSON} response 
 */
async function removePost(request, response) {
  let reviewContent = request.body.review;
  let deletedRow = await db.removeReviewPost(reviewContent);
  console.log({ deletedRow });
  // response.send(loggedName)
}
/**
 * Handles post request with review being updated
 * takes old and new review and updates review table column
 * @param {*} request 
 * @param {*} response 
 */
async function updatePost(request, response) {
  let updatedContent = request.body;
  let oldReview = updatedContent.oldReview;
  let newReview = updatedContent.newReview;

   await db.updateReviewPost(newReview, oldReview);
  response.send({ updated: newReview });
}

app.listen(port);
