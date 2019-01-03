const peepsContainer = document.getElementById('peeps');

const ourRequest = new XMLHttpRequest();
ourRequest.open('get', 'https://chitter-backend-api.herokuapp.com/peeps');
ourRequest.onload = function() {
  const resObjData = JSON.parse(this.responseText);
  renderDataToHTML(resObjData);
};
ourRequest.send();

function renderDataToHTML(data) {
  let peepsDivHTML = '';

  for (let i = 0; i < data.length; i++) {
    peepsDivHTML += '<p>' + data[i].user.handle + ': ' + data[i].body + ' (created at '+ data[i].created_at.slice(11, 16) + ' on ' + data[i].created_at.slice(0, 10) + ') </p>'
  }

  peepsContainer.insertAdjacentHTML('beforeend', peepsDivHTML)
}
