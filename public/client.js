window.onload = showInfo;

function submitLink() {
  let searchQuery = document.getElementById("showTitle").value;
  let queryStr = searchQuery.replace(/\s+/g, "-").toLowerCase();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(chanelURL.value);
    }
  };
  console.log(queryStr);
  xhttp.open("POST", "/searchQuery", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ URL: queryStr }));
}
function showInfo() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let showInfo = JSON.parse(xhttp.responseText);
      showInfo[0].forEach((element) => {
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
        // let p = `<p>Name: ${element.name}</p>
        // <p>Genres: ${element.genres}</p>
        // <p>Ratings: ${element.ratings}</p>
        // <img src="${element.image}" alt="">`;
        // document.getElementsByTagName("")[0].innerHTML += p;
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
