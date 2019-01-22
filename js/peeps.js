const peepsContainer = document.getElementById('peeps');

function getPeeps() {
  console.log('get peeps')
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

function logOut() {
  sessionStorage.clear()
  location.reload()
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
    .then(getPeeps());
}

function sessionKey() {
  return sessionStorage.getItem('session_key')
}


function postPeep() {
  let userID = parseInt(sessionStorage.getItem('user_id'));
  let post = document.getElementById('peep').value;
  let url2 = 'https://chitter-backend-api.herokuapp.com/peeps';
  let data2 = { peep: { user_id:userID, body:post } };
  // let data2 = `{ peep: { user_id:${userID}, body:${post} } }`;
  // '{"peep": {"user_id":1, "body":"my first peep :)"}}'
  
  // let myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'application/json');
  // myHeaders.append('Authorization', `Token token=${sessionKey}`);

  fetch(url2, {
    method: 'POST',
    body: JSON.stringify(data2), 
    headers: {
      'Authorization': `Token token=${sessionKey()}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error))
    .then(getPeeps());
}