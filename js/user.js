function signUp() {
  let handle = document.getElementById('handle').value;
  let signUpPassword = document.getElementById('signup-password').value;
  let url = 'https://chitter-backend-api.herokuapp.com/users';
  let signUpData = {
    user: {
      handle: handle,
      password: signUpPassword
    }
  };

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(signUpData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error))
    .then(function () {
        // document.getElementsByTagName('div').style.display = 'none';      
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('new-peep-form').style.display = 'none';
      })
    .then(alert('Now you must log in with you details.'));

}

function signIn() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let url = 'https://chitter-backend-api.herokuapp.com/sessions';
  let data = {
    session: {
      handle: username,
      password: password
    }
  };

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    // .then(response => console.log('Success:', response))
    .then(response => {
      console.log(response);
      sessionStorage.setItem('user_id', `${response['user_id']}`);
      sessionStorage.setItem('session_key', `${response['session_key']}`);
    })
    .catch(error => console.error('Incorrect login details', error))
    .then(function() {
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('logout').style.display = '';
      document.getElementById('new-peep-form').style.display = '';
    })
    .then(getPeeps());
}