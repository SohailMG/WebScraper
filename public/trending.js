// gets the top rated shows and outputs the results
function getTopRated() {
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
        <p><b style="color: grey;">Name:</b>${element.title}</p>
        <p><b style="color: grey;">Ratings:</b>${element.ratings}</p>
        <p><b style="color: grey;">Genres:</b>${element.genres}</p> 
        </div>
        </div>`;
        gridContainer.innerHTML += gridItem;
      });
    }
  };
  xhttp.open("GET", "/shows", true);
  xhttp.send();
}

/**
 * makes a get request with the sort options according to
 * the current button being pressed i.e. Drama/Action/Comedy
 * and replaces the inner html with the sorted option
 * @param {HTMLElement} elm 
 */
function showGenres(elm) {

  let gridContainer = document.getElementsByClassName("grid-container")[0];
  let queryStr = elm.innerHTML;
  
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/sort?genre=${queryStr}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      shows = JSON.parse(xhr.responseText);
      gridContainer.innerHTML=""
      shows.forEach(show => {
          
          let gridItem = `<div class="grid-item">
          <img src="${show.image}" alt="">
          <div id ="show-info">
          <p><b style="color: grey;">Name :</b>${show.name}</p>
          <p><b style="color: grey;">Ratings :</b>${show.ratings}</p>
          <p><b style="color: grey;">Genres :</b>${show.genres}</p> 
          </div>
          </div>`;
          gridContainer.innerHTML += gridItem;
        });
    } else {
    }
  };
  xhr.send();
}

let header = document.getElementsByClassName("sortBtns")[0];
let btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
