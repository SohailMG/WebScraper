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
  let addToCart_btn = shareBtns[i];

  addToCart_btn.addEventListener("click", submitShow);
}
function submitShow(event) {
  let reviewBox = document.getElementsByClassName("review-container")[0];
  let modal = document.getElementById("review-modal");
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
    image: imageLink.src,
  };

  let showName = document.getElementsByClassName("reviewed-show-name")[0];
  let reviewee = document.getElementsByClassName("username")[0];

  (showName.value = strname.replace("Name:", "")),
    (reviewee.value = sessionStorage.getItem("loggedInEmail"));
  console.log(show);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      reviewBox.style.display = "block";
      modal.style.display = "block";
    }
  };
  xhttp.open("POST", "/shows", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ Show: show }));
}

let customerRating;
function submitReview() {
  let reviewContainer = document.getElementsByClassName("review-container")[0];
  let showName = document.getElementsByClassName("reviewed-show-name")[0];
  let reviewee = document.getElementsByClassName("username")[0];
  let reviewBox = document.getElementsByClassName("review-box")[0];
  let reviewGrid = document.getElementsByClassName("reviews-grid")[0];

  let review = {
    show: showName.value.replace("Name:", ""),
    user: reviewee.value,
    rating: customerRating,
    content: reviewBox.value,
  };

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      var modal = document.getElementById("review-modal");
      reviewContainer.style.display = "none";
      modal.style.display = "none";
      location.href = "#section4";
      reviewGrid.innerHTML = "";
      displayReviews();
      console.log(review);
    }
  };
  xhttp.open("POST", "/review", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ reviews: review }));
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
        <div id="review-contents">
        <p><b style="color: brown;">Submited by : </b>${elm.name} </p>
        <p class="review-show-title"><b style="color: brown;">Title :</b> ${elm.title}</p>
        <p><b style="color: brown;">User Rating :</b> ${elm.rating}/5</p>
        <p class="average-review"></b>
        </div>
        <p id="user-review-box">${elm.review}</p>
        
       </div>`;
      });
      // adding average rating for each show by compare titles
      let reviewBoxTitles = document.querySelectorAll(".review-show-title");
      for (let i = 0; i < reviewBoxTitles.length; i++) {
        const boxTitle = reviewBoxTitles[i].innerText.replace("Title : ", "");
        for (let j = 0; j < averageRating.length; j++) {
          const rating = averageRating[j];
          if (rating.title == boxTitle) {
            let avgReviewBox = reviewBoxTitles[
              i
            ].parentElement.getElementsByClassName("average-review")[0];
            avgReviewBox.innerHTML = `<b style="color: brown;">Average Rating : </b>${rating.Average}`;
          }
        }
      }
      displayStarRating();
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

  // for (let i = 0; i < 5; i++) {
  //   let ratingDiv = document.getElementsByClassName('avgRating')[0];
  //   ratingDiv.innerHTML += `<span class="fa fa-star"></span>`;
  // }
  // let starsContainer = document.getElementsByClassName('avgRating')[0]
  // for (let i = 0; i < 4; i++) {
  //   let star = starsContainer.getElementsByClassName('fa-star')[i]
  //   star.classList.add('checked')

  // }
  ratingDiv.innerHTML += `</div>`;
}
