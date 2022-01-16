let albumId = +location.search.slice(1)
let albums;

async function readJson() {

  let rawData = await fetch(
    '/api/albums'
  );
  albums = await rawData.json();
  render();
}

function render() {

  let html = '';

  for (let row of albums) {
    if (row.id === albumId) {
      html += `
      <h2>Album: ${row.albumName}</h2>
      `;
    }

  }
  document.querySelector('.albums').innerHTML = html;
}

document.querySelector('input[name="remove"]').addEventListener('click', async function () {

  await fetch('api/albums/' + albumId, {
    method: "DELETE"
  })
  location.href = 'index.html';
})

document.querySelector('form[name="editAlbum"]')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let requestAlbum = {};

    let elements = document.forms.editAlbum.elements;
    for (let element of elements) {

      if (element.name === 'change') { continue }
      if (element.name === 'remove') { continue }
      requestAlbum[element.name] = element.value;

    }

    let result = await (await fetch('/api/albums/' + albumId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestAlbum)
    })).json();
    location.href = 'index.html';

  });


readJson();