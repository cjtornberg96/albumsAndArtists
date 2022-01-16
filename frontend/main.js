let artists

async function readJson() {

  let rawData = await fetch(
    '/api/artists?order=artistName'
  );
  artists = await rawData.json();
  render();
}

function render() {

  let html = '';

  for (let row of artists) {
    html += `
            <h2><a class="artist"
        href="album-list.html?${row.id}"><b>${row.artistName}</b></a></h2>
            <p><b>Description:</b> ${row.artistDescription}</p>
          
      `;
    previousArtist = row.id;

  }
  document.querySelector('.artists').innerHTML = html;
}

// Start
readJson();