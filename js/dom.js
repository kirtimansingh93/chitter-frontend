document.addEventListener("DOMContentLoaded", function () {

  let signupForm = document.getElementById('signup-form');
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    signUp();
  })

  let loginForm = document.getElementById('login-form');
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    signIn();
  })

  let postForm = document.getElementById('new-peep-form');
  postForm.addEventListener("submit", function (e) {
    e.preventDefault();
    postPeep();
  })

  if (sessionKey() != null) {
    getPeeps();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
  } else {
    document.getElementById('logout').style.display = 'none';
    document.getElementById('new-peep-form').style.display = 'none';
  }
  

});