const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./mysql-connect");
const requestAPI = require("request");
const app = express();
const port = 3000;
const APIEndpoint = 'http://api.tvmaze.com/';

app.use(express.static("public"));
app.use(bodyParser.json());

let contnt;
let showInfo = [];

//Handle POST requests sent to the root of the URL
app.post("/searchQuery", (request, response) => {
  //Output the data sent to the server
  let searchQuery = request.body.URL;
  console.log(searchQuery);
  requestAPI(
    `${APIEndpoint}/singlesearch/shows?q=${searchQuery}`,
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
app.post("/shows", (request, response) => {
  //Output the data sent to the server

  let allData = db.getEmployees();
  allData.then((result) => {
    //Do something else
    let data = result;
    showInfo.push(data);
    // console.log(data);
    console.log(showInfo[0]);
    response.send("Data sent");
  })
  .catch((err) => {
    //Handle the error
    console.error(JSON.stringify(err));
  });;

});

app.get("/shows", function (req, res) {
  console.log(req.body);
  res.send(showInfo);
});

app.listen(port);
