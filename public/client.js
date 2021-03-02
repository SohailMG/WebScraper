window.onload = showInfo;

function submitLink() {
  let gridContainer = document.getElementsByClassName("searches-container")[0];
  let searchQuery = document.getElementById("showTitle").value;
  let queryStr = searchQuery.replace(/\s+/g, "-").toLowerCase();

  gridContainer.innerHTML = "";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let searches = JSON.parse(xhttp.responseText);

      searches.forEach((element) => {
        let gridItem = `<div class="search-item">
        <img src="${element.image}" alt="">
        <div id ="show-info">
        <p><b>Name:</b>${element.name}</p>
        <p><b>Ratings:</b>${element.ratings}</p>
        <p><b>Genres:</b>${element.genres}</p>
        <p><b>Premiered:</b>${element.premiered}</p>
        <button class="share-btn">Share</button> 
        </div>
        </div>`;
        gridContainer.innerHTML += gridItem;
      });

      let shareBtns = document.getElementsByClassName("share-btn");
      for (let i = 0; i < shareBtns.length; i++) {
        let addToCart_btn = shareBtns[i];

        addToCart_btn.addEventListener("click", submitShow);
      }
    }
  };

  console.log(queryStr);
  xhttp.open("POST", "/search", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ Title: queryStr }));
}
function showInfo() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let showInfo = JSON.parse(xhttp.responseText);
      showInfo.forEach((element) => {
        let gridContainer = document.getElementsByClassName(
          "grid-container"
        )[0];
        let gridItem = `<div class="grid-item">
        <img src="${element.image}" alt="">
        <div id ="show-info">
        <p><b>Name:</b>${element.name}</p>
        <p><b>Ratings:</b>${element.ratings}</p>
        <p><b>Genres:</b>${element.genres}</p> 
        </div>
        </div>`;
        gridContainer.innerHTML += gridItem;
      });
    }
  };
  xhttp.open("GET", "/shows", true);
  xhttp.send();
}

window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementsByClassName("navbar")[0];
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function showGlow() {
  let inputFiled = document.getElementById("showTitle");
  inputFiled.style.boxShadow = " 0  0 10px cyan";
}
function hideGlow() {
  let inputFiled = document.getElementById("showTitle");
  inputFiled.style.boxShadow = " 0  0 10px black";
}

async function getTrends() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let showInfo = JSON.parse(xhttp.responseText);
      console.log(showInfo);
    }
  };
  xhttp.open("GET", "/home", true);
  xhttp.send();
}

let shareBtns = document.getElementsByClassName("share-btn");
for (let i = 0; i < shareBtns.length; i++) {
  let addToCart_btn = shareBtns[i];

  addToCart_btn.addEventListener("click", submitShow);
}
function submitShow(event) {
  let btn = event.target;
  let showInfo = btn.parentElement;

  let strname = showInfo.getElementsByTagName("p")[0].innerText;
  let strRating = showInfo.getElementsByTagName("p")[1].innerText;
  let strGenres = showInfo.getElementsByTagName("p")[2].innerText;
  let strPremiered = showInfo.getElementsByTagName("p")[3].innerText;
  let imageLink = showInfo.parentElement.getElementsByTagName("img")[0];

  let show = {
    name: strname.replace("Name:", ""),
    Rating: strRating.replace("Ratings:", ""),
    Genres: strGenres.replace("Genres:", ""),
    Premiered: strPremiered.replace("Premiered:", ""),
    image: imageLink.src
  };
  console.log(show)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      location.href="#section4"
    }
  };
    xhttp.open("POST", "/shows", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ Show: show }));
}
