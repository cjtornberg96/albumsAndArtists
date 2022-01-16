let artistId = +location.search.slice(1)
let albums;

async function getAlbumsForArtist() {
  albums = await (await fetch('api/where/albums?order=albumRelease', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      where: 'artistId = ' + artistId
    })
  })).json();
  render();
}

function render() {
  let html = '';

  for (let album of albums) {
    html += `
      <h2><a class="artist" href="editAlbum.html?${album.id}">
      ${album.albumName}
      </a></h2>
      <p><b>Release Date:</b> ${album.albumRelease}</p>
    
    `;

  }
  document.querySelector('.albumList').innerHTML = html;
}


getAlbumsForArtist();