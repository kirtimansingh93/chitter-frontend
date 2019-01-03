const peepsContainer = document.getElementById('peeps');

const xhr = new XMLHttpRequest();
xhr.open('get', 'https://chitter-backend-api.herokuapp.com/peeps');
xhr.onload = function() {
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


function renderDataToHTML(data) {
  let peepsDivHTML = '';

  for (let i = 0; i < data.length; i++) {
    peepsDivHTML += '<p>' + data[i].user.handle + ': ' + data[i].body + ' (created at '+ data[i].created_at.slice(11, 16) + ' on ' + data[i].created_at.slice(0, 10) + ') </p>'
  }

  peepsContainer.insertAdjacentHTML('beforeend', peepsDivHTML)
}
