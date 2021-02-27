window.onload = showInfo;

function submitLink() {
  let searchQuery = document.getElementById("chanelURL").value;
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
        let p = `<p>Name: ${element.name}</p>
        <p>Genres: ${element.genres}</p>
        <p>Ratings: ${element.ratings}</p>
        <img src="${element.image}" alt="">`;
        document.getElementsByTagName("body")[0].innerHTML += p;
      });
    }
  };
  xhttp.open("GET", "/shows", true);
  xhttp.send();
}
