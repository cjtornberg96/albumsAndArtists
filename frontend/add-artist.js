
document.querySelector('form[name="addArtist"]')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    let requestArtist = {};

    let elements = document.forms.addArtist.elements;
    for (let element of elements) {
      if (element.type === 'submit') { continue }
      requestArtist[element.name] = element.value;
    }
    let result = await (await fetch('/api/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestArtist)
    })).json();
    location.href = 'index.html';
  });