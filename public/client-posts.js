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

  if (sessionStorage.getItem("loggedInEmail") == undefined) {
    showInfo.innerHTML += `<p style="color:red;">Must be logged<p>`;
    return;
  } else {
    (showName.value = strname.replace("Name:", "")),
      (reviewee.value = sessionStorage.getItem("loggedInEmail"));

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

function addAverageRating(averageRating) {
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
}

function editPosts() {
  let loggedEmail = sessionStorage.getItem("loggedInEmail");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseData = JSON.parse(xhttp.responseText);
      let loggedName = responseData[0].name;
      let postContainer = document.querySelectorAll(".reviewed-box");
      for (let i = 0; i < postContainer.length; i++) {
        const post = postContainer[i];
        let postcontent = post.getElementsByClassName("content-container")[0];
        let postName = postcontent.firstElementChild.innerText.replace(
          "Submited by : ",
          ""
        );
        if (loggedName == postName) {
          post.innerHTML += `<div class="post-btns">
                <button class="edit-post" onclick="editCurrentPost(this)">Edit</button>
                <button class="remove-post" onclick="removePost(this)">Remove</button>
                <button class="submit-changes" onclick="submitChanges(this)">Submit</button>
                </div>`;
        }
      }
    }
  };

  xhttp.open("POST", "/logged", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ userEmail: loggedEmail }));
}


function editCurrentPost(elm) {
  let parentDiv = elm.parentNode.parentNode;
  let reviewBox = parentDiv.querySelector("#user-review-box");
  let btnContainer = elm.parentNode;
  let arr = btnContainer.querySelectorAll('button');
  for (let i = 0; i < arr.length; i++) {
      const btn = arr[i];
      btn.style.display="block";
      
  }
  localStorage.setItem('oldReview',reviewBox.value);
  reviewBox.disabled = false;
  reviewBox.focus()
}
/**
 * removing review post from html and database
 * @param {HTMLElement} elm 
 */
function removePost(elm) {
  let parentDiv = elm.parentNode.parentNode;
  let reviewBox = parentDiv.querySelector("#user-review-box");
  let btnContainer = elm.parentNode;
  let arr = btnContainer.querySelectorAll('button');
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(xhttp.responseText);
      parentDiv.remove();
      arr[1].style.display="none";
      arr[2].style.display="none";
    }
  };

  xhttp.open("POST", "/remove", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ review: reviewBox.value }));
}
/**
 * updating changes made to review
 * @param {HTMLElement} elm 
 */
function submitChanges(elm) {
  let parentDiv = elm.parentNode.parentNode;
  let reviewBox = parentDiv.querySelector("#user-review-box");
  let btnContainer = elm.parentNode;
  let arr = btnContainer.querySelectorAll('button');
  

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(xhttp.responseText);
      reviewBox.value = res.updated;
      reviewBox.disabled=true;
      arr[1].style.display="none";
      arr[2].style.display="none";
      

    }
  };

  let oldReview = localStorage.getItem('oldReview');

  xhttp.open("POST", "/update", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ newReview: reviewBox.value ,oldReview:oldReview}));
}
