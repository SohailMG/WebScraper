const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const scrappers = require("./scrapper");
const db = require("./mysql-connect");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

let contnt;


//Handle POST requests sent to the root of the URL
app.post("/chanelURL", (request, response) => {
  //Output the data sent to the server
  let chanelURL = request.body.URL;
  const info = JSON.stringify(scrappers(chanelURL).then(result =>{

      console.log("Data received: " + JSON.stringify(result));
      contnt = JSON.stringify(result);
      db.insertData(result.name,result.subs,result.views,result.popular)
      //Finish off the interaction.
      response.send({ message: "Data received." });
      db.getEmployees()
    }));
});

app.get("/chanelURL", function (req, res) {

    console.log(req.body);
    res.send(contnt);
  });

app.listen(port);
