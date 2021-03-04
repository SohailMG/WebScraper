const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./mysql-connect");
const requestAPI = require("request");
const app = express();
const port = 3000;
const APIEndpoint = "http://api.tvmaze.com/";
const scrapeTrending = require("./scrapper");

app.use(express.static("public"));
app.use(bodyParser.json());

let showInfo = [];

//handles post request of show data being added
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

/**
 * scrapes website titles of top 5 shows currently trending
 * then makes get request for api on info for each title
 */
(async function getTrendingShows() {
  db.deleteCurrentData();
  const showsArr = await scrapeTrending();
  showsArr.forEach((showTitle) => {
    requestAPI(
      `${APIEndpoint}/singlesearch/shows?q=${showTitle}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          data = JSON.parse(body);
          // console.log(JSON.parse(body));
        }
        // storing show details into database
        db.storeTrendings(
          data.id,
          data.name,
          data.genres,
          data.rating.average,
          data.image.medium,
          data.premiered
        );
      }
    );
  });
})();

app.get("/shows", (request, response) => {
  //Output the data sent to the server
  let allData = db.getEmployees();
  allData
    .then((result) => {
      //Do something else
      let data = result;
      showInfo.push(data.slice(0, 6));
      // console.log(data);
      // console.log(showInfo[0]);
      response.send(showInfo[1]);
    })
    .catch((err) => {
      //Handle the error
      console.error(JSON.stringify(err));
    });
});


app.post("/search", getSearches);

/**
 * performs a get request to an API with the search
 * queries and returns all matching results with a maximum
 * of 5 searches
 * @param {JSON} req 
 * @param {JSON} res 
 */
function getSearches(req, res) {
  const MAX_SEARCHES = 5;
  let searchQuery = req.body.Title;
  let showD = [];
  // get request to api with search query
  requestAPI(
    `${APIEndpoint}/search/shows?q=${searchQuery}`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
        for (let i = 0; i < MAX_SEARCHES; i++) {
          if (data[i] != undefined) {
            if (data[i].show.image != null) {
              let shows = {
                name: data[i].show.name,
                genres: data[i].show.genres,
                ratings: data[i].show.rating.average,
                premiered: data[i].show.premiered,
                image: data[i].show.image.medium,
              };
              showD.push(shows);
            } else {
            }
          }
        }
        res.send(showD);
      }
    }
  );
}

app.listen(port);
