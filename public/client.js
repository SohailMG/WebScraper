window.onload = () => {
  showInfo();
  displayReviews();
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
      location.reload();
      location.href = "#section4";
      console.log(review);
    }
  };
  xhttp.open("POST", "/review", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ reviews: review }));
}

// Get the modal
var modal = document.getElementById("review-modal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

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
      let reviews = JSON.parse(xhttp.responseText);
      // let reviews2

      let reviews2 = []

      console.log(reviews);
      reviews.forEach((elms) => {
        reviews2.push({elms : elms.title})
      
      });

      reviews2 = reviews2.filter (function (value, index, array) { 
        return reviews2.indexOf (value) == index;
      });
      
      reviews.forEach((elm) => {
        reviewGrid.innerHTML += `<div class="reviewed-box">
        <p><b style="color: brown;">Submited by : </b>${elm.name} </p>
        <img src="${elm.image}" alt="">
        <p><b style="color: brown;">Title :</b> ${elm.title}</p>
        <p><b style="color: brown;">Rating :</b> ${elm.rating}</p>
        <p id="user-review-box">${elm.review}</p>
       </div>`;
      });
    }
  };
  xhttp.open("GET", "/reviews", true);
  xhttp.send();
}
