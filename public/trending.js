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

var header = document.getElementsByClassName("sortBtns")[0];
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
