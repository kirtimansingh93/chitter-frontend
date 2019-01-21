const peepsContainer = document.getElementById('peeps');

function getPeeps() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://chitter-backend-api.herokuapp.com/peeps', true);
  xhr.onload = function () {
    if (this.status == 200) {
      try {
        const resObjData = JSON.parse(this.responseText);
        renderDataToHTML(resObjData);
      } catch (e) {
        console.warn('There was an error in the JSON. Could not parse!');
      }
    } else {
      console.warn('Did not receive 200 OK from response!');
    }
  };
  xhr.send();
}


function renderDataToHTML(data) {
  let peepsDivHTML = '';

  for (let i = 0; i < data.length; i++) {
    peepsDivHTML += `<p><strong>${data[i].user.handle}</strong>: ${data[i].body} <em>(created at ${data[i].created_at.slice(11, 16)} on ${data[i].created_at.slice(0, 10)})</em></p>`
  }
  document.getElementById('peeps').innerHTML = peepsDivHTML;
}

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
    .then(getPeeps())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

}

function signIn() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let url = 'https://chitter-backend-api.herokuapp.com/sessions';
  let data = { session: { handle: username, password: password } };

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(getPeeps())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    
}

// function postPeep(peep) {
//   let url = 'https://chitter-backend-api.herokuapp.com/peeps';
//   let data = `{ "session": { "handle": "${username}", "${password}": "mypassword" } }`;

//   fetch(url, {
//     method: 'POST', // or 'PUT'
//     body: JSON.stringify(data), // data can be `string` or {object}!
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then(res => res.json())
//     .then(response => console.log('Success:', JSON.stringify(response)))
//     .catch(error => console.error('Error:', error));
// }