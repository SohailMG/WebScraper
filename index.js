const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const scrappers = require("./scrapper");
const db = require("./mysql-connect");
const requestAPI = require("request");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

let contnt;

//Handle POST requests sent to the root of the URL
app.post("/chanelURL", (request, response) => {
  //Output the data sent to the server
  let searchQuery = request.body.URL;
  requestAPI(
    `http://api.tvmaze.com/singlesearch/shows?q=${searchQuery}`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
        // console.log(JSON.parse(body));
      }
      db.insertData(data.id,
        data.name,
        data.genres,
        data.rating.average,
        data.image.medium,
        data.premiered);
    }
  );
  //Finish off the interaction.
  let data;
  response.send({ message: "Data received." });
});
app.post("/chanels", (request, response) => {
  //Output the data sent to the server

  // let allData = db.getEmployees();
  console.log(allData);
  response.send({ message: "allData" });
});

app.get("/chanelURL", function (req, res) {
  console.log(req.body);
  res.send(contnt);
});

app.listen(port);
