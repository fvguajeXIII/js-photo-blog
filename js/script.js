// Seleziona il contenitore delle card Bootstrap
const row = document.querySelector(`.row.g-4`);

// Array di colori per i box colorati delle foto
const colors = [
  "#8bc34a", "#771796", "#24f355", "#d32776", "#f66b97", "#56a8c2"
];

// Effettua una richiesta GET all'endpoint API usando Axios
axios.get('https://lanciweb.github.io/demo/api/pictures/')
  .then(response => {
    // Svuota il contenuto del contenitore delle card
    row.innerHTML = '';
    // Cicla su ogni foto ricevuta dalla risposta API
    response.data.forEach((pic, i) => {
      // Aggiunge una card Bootstrap per ogni foto
      row.innerHTML += `
        <div class="col-12 col-md-4">
          <div class="photo-card bg-white border rounded shadow p-3 position-relative">
            <!-- Pin rosso in alto -->
            <img src="img/pin.svg" class="pin position-absolute top-0 start-50 translate-middle" alt="Pin" style="width: 40px; z-index: 2" />
            <!-- Box bianco stile polaroid con box colorato centrato -->
            <div class="d-flex align-items-center justify-content-center" style="height: 320px;">
              <div class="inner-photo" style="background-color: ${colors[i % colors.length]}; width: 300px; height: 300px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                <!-- Immagine della foto, centrata e contenuta nel box colorato -->
                <img src="${pic.url}" alt="${pic.title}" style="max-width: 100%; max-height: 100%; object-fit: cover; border-radius: 10px;">
              </div>
            </div>
            <!-- Caption sotto la foto -->
            <div class="caption mt-2 fst-italic" style="font-family: 'Sometype Mono', monospace">
              ${pic.title}
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => {
    // Mostra un messaggio di errore se la richiesta fallisce
    row.innerHTML = '<div class="text-danger">Errore nel caricamento delle foto.</div>';
  });

// Seleziona overlay, bottone di chiusura e immagine dell'overlay
const overlay = document.getElementById('overlay');
const closeBtn = document.querySelector('.overlay-close');
const overlayImg = overlay.querySelector('.overlay-img');

// Mostra overlay al click su una foto e aggiorna l'immagine
document.addEventListener('click', function (e) {
  const clickedImg = e.target.closest('.inner-photo img');
  if (clickedImg) {
    overlayImg.src = clickedImg.src; // Mostra la foto cliccata nell'overlay
    overlay.classList.remove('overlay-hidden');
  }
});

// Nasconde overlay al click sul bottone di chiusura
closeBtn.addEventListener('click', function () {
  overlay.classList.add('overlay-hidden');
});