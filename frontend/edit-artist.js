async function getEditArtist() {
  let categories = await (await fetch('api/artists')).json();
  let optionsHtml = '';
  for (let category of categories) {
    optionsHtml += `
    <option value="${category.id}">${category.artistName}</option>
    `;
  }

  document.querySelector('select[name="id"]').innerHTML += optionsHtml;
}

getEditArtist();

document.querySelector('input[name="remove"]').addEventListener('click', async function () {
  let id = document.forms.editArtist.elements.id.value;
  if (!id) {
    return;
  }
  await fetch('api/artists/' + id, {
    method: "DELETE"
  })

  getArtistsId();
  async function getArtistsId() {
    let artistsData = await (await fetch('api/artists')).json();
    for (let row of artistsData) {
      if (row.id === +id) {
        alert('Hey! Remove all the albums first! After this you can remove the artist.');
      }
    }
  }
  location.href = 'index.html';
})

document.querySelector('form[name="editArtist"]')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let requestArtist = {};
    let menuId;

    let elements = document.forms.editArtist.elements;
    for (let element of elements) {

      if (element.name === 'id') {
        menuId = element.value;
        continue;
      }

      if (element.name === 'change') { continue }
      if (element.name === 'remove') { continue }
      requestArtist[element.name] = element.value;

    }

    let result = await (await fetch('/api/artists/' + menuId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestArtist)
    })).json();
    location.href = 'index.html';

  });