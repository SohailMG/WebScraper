

function submitLink(){
    let chanelURL = document.getElementById('chanelURL');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(chanelURL.value);
      }
    };
    xhttp.open("POST", "/chanelURL", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify({URL : chanelURL.value}) );
}
function showInfo(){
    let chanelURL = document.getElementById('chanelURL');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
      }
    };
    xhttp.open("GET", "/chanelURL", true);
    xhttp.send();
}
window.onload = showInfo;