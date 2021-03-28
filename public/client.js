window.onload = () => {
  showInfo();
  displayReviews();
  checkLogin();
  typeWriter();
  
};
window.onscroll = function () {
  myFunction();
};

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
        <button class="share-btn">Add Review</button> 
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
        <p><b style="color: grey;">Name:</b>${element.name}</p>
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

function getTrends() {
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
  let addReviewbtns = shareBtns[i];

  addReviewBtns.addEventListener("click", submitShow);
}


const container = document.querySelector(".rating");
const items = container.querySelectorAll(".rating-item");
container.onclick = (e) => {
  const elClass = e.target.classList;
  // change the rating if the user clicks on a different star
  if (!elClass.contains("active")) {
    items.forEach(
      // reset the active class on the star
      (item) => item.classList.remove("active")
    );
    console.log(e.target.getAttribute("data-rate"));
    customerRating = e.target.getAttribute("data-rate");
    elClass.add("active"); // add active class to the clicked star
  }
};

function displayReviews() {
  let reviewGrid = document.getElementsByClassName("reviews-grid")[0];
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let reviewInfo = JSON.parse(xhttp.responseText);
      // let reviews2
      let reviews = reviewInfo.custReviews;
      let averageRating = reviewInfo.avgRatings;
      
      reviews.forEach((elm) => {
        reviewGrid.innerHTML += `<div class="reviewed-box">
        <img src="${elm.image}" alt="">
        <div id="review-contents" class="content-container">
        <p><b style="color: grey;">Submited by : </b>${elm.name} </p>
        <p class="review-show-title"><b style="color: grey;">Title :</b> ${elm.title}</p>
        <p><b style="color: grey;">User Rating :</b> ${elm.rating}/5</p>
        <p class="average-review"></b>
        </div>
        <input  id="user-review-box"  type="text" value="${elm.review}" disabled="true">
        
       </div>`;
      });
      // adding average rating for each show by compare titles
      addAverageRating(averageRating);
      displayStarRating();
      editPosts();
    }
  };
  xhttp.open("GET", "/reviews", true);
  xhttp.send();
}

var i = 0;
var txt = `Share your favourite TV Show series.
Add your thoughts on your favourite show 
and see what others said about their favourite show .
Explore the currently trending shows`;
var speed = 60;
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("home-description").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function displayStarRating() {
  let ratingDiv = `<div class="avgRating">`;
  let starsDiv = `<span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`;
  // let ratingContents = document.getElementById('review-contents');

  let reviewBox = document.querySelectorAll(".reviewed-box");
  reviewBox.forEach((element) => {
    let ratingContents = element.querySelector("#review-contents");
    ratingContents.innerHTML += ratingDiv + starsDiv;
    let currrentShowRev = ratingContents.querySelector(".average-review");
    let avgReview = Math.round(
      parseFloat(currrentShowRev.innerText.replace("Average Rating : ", ""))
    );

    let starsContainer = element.getElementsByClassName("avgRating");
    // console.log(starsContainer);
    for (let i = 0; i < starsContainer.length; i++) {
      let star = starsContainer[i].getElementsByClassName("fa-star");
      for (let j = 0; j < star.length; j++) {
        for (let k = 0; k < avgReview; k++) {
          const stars = star[k];
          stars.classList.add("checked");
        }
      }
    }
  });
  ratingDiv.innerHTML += `</div>`;
}
