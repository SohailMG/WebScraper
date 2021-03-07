

let user_email = document.getElementById('user-email')
let user_pass = document.getElementById('user-pass')
let user_name = document.getElementById('user-name')
var modal = document.getElementById("review-modal");

function sendUserData(){
    let user_data = {
        username:user_name.value,
        email:user_email.value,
        password:user_pass.value
    }

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(xhttp.responseText);
      if (res.message == 'user added') {
          let alertMsg = document.getElementById('form-info');
          alertMsg.innerHTML = "Account Added Successfuly!";
          alertMsg.style.color="lawngreen";
          user_email.value="";
          user_pass.value="";
          user_name.value="";
          modal.style.display="none";

          
      }
    }
  };



  xhttp.open("POST", "/register", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ userInfo: user_data }));


}

let login_email = document.getElementById("login-email");
let login_pass = document.getElementById("login-pass");
function sendLoginData(){
    let user_data = {
        email:login_email.value,
        password:login_pass.value
    }

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(xhttp.responseText);
      if (res.message == 'Login Successfull') {
          let alertMsg = document.getElementById('login-info');
          alertMsg.innerHTML = "Login Successfuly!";
          login_pass.value="";
          login_email.value="";
          console.log(xhttp.responseText.message);
          sessionStorage.setItem('loggedInEmail',user_data.email)    
      }else{
        console.log(xhttp.responseText)
      }
    }
  };
  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ userInfo: user_data }));


}