

let user_email = document.getElementById('user-email')
let user_pass = document.getElementById('user-pass')
let user_name = document.getElementById('user-name')

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
          document.getElementsByClassName('modal')[0].style.display="none"
          document.getElementById('signin-form').style.display="block"

          
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
          
          sessionStorage.setItem('loggedInEmail',user_data.email) 
          document.getElementsByClassName('modal')[0].style.display="none" 
          checkLogin();  
      }else{
        console.log(xhttp.responseText)
      }
    }
  };
  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ userInfo: user_data }));


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

function checkLogin(){
  let headerBtns = document.getElementsByClassName('register-btns')[0];
  let logoutBtn = '<button id="logout-btn" onclick="logout()">Logout</button>';

  if (sessionStorage.getItem('loggedInEmail') != undefined) {
    
    headerBtns.innerHTML = logoutBtn;
  }

  
}

function logout(){
  sessionStorage.removeItem('loggedInEmail');
  location.reload();
}