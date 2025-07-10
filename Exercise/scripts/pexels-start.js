// URL base dell'API di Pexels per la ricerca
const pexelsBaseUrl = "https://api.pexels.com/v1/search";

// L'URL dell'API di Pexels dei criceti e tigri (9 immagini)
const hamstersEndPoint =
  "https://api.pexels.com/v1/search?query=hamsters&per_page=9";
const tigersEndPoint =
  "https://api.pexels.com/v1/search?query=tigers&per_page=9";
// seleziono i bottone e il contenitore delle immagini
const loadImagesBtn = document.getElementById("loadImagesBtn");
const loadSecondaryImagesBtn = document.getElementById(
  "loadSecondaryImagesBtn"
);
const imageGalleryRow = document.getElementById("imageGalleryRow");

// seleziono gli elementi per la ricerca
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Funzione generica per caricare e mostrare le immagini
const loadAndDisplayImages = (endpoint) => {
  // rimozione immagini
  imageGalleryRow.innerHTML = "";
  fetch(endpoint, {
    headers: {
      // inserimento autorizzazione
      Authorization: "jgTd9w4mvWZ1OE1dyWVUyXfcVAIhxbZ75mB5FnZq2rGTEXCFDkGoI9LM",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Errore HTTP! Stato: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("Dati delle immagini:", data);
      // Inizializza una stringa vuota
      let cardsHtml = "";
      data.photos.forEach((photo) => {
        // Creazione dell'URL per la pagina di dettaglio con URLSearchParams
        const detailUrl = new URL("./detail.html", window.location.href);
        detailUrl.searchParams.set("id", photo.id);
        detailUrl.searchParams.set("imgSrc", photo.src.large);
        detailUrl.searchParams.set("photographer", photo.photographer);
        detailUrl.searchParams.set("photographerUrl", photo.photographer_url);
        // struttura HTML per una singola card
        cardsHtml += `
          <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                  <a href="${detailUrl.toString()}" class="image-link">
                      <img src="${
                        photo.src.medium
                      }" class="bd-placeholder-img card-img-top" alt="${
          photo.alt || "Immagine da Pexels"
        }">
                  </a>
                  <div class="card-body">
                      <h5 class="card-title">
                        <a href="${detailUrl.toString()}">${
          photo.photographer
        }</a>
                      </h5>
                      <p class="card-text">ID: ${photo.id}</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                              <button type="button" class="btn btn-sm btn-outline-secondary view-btn" data-photo-url="${
                                photo.url
                              }">View</button>
                              <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
                          </div>
                          <small class="text-muted">${photo.id}</small>
                      </div>
                  </div>
              </div>
          </div>
        `;
      });
      // Assegna l'intera stringa HTML al contenitore
      imageGalleryRow.innerHTML = cardsHtml;

      // Selezioniamo tutti i bottoni "View" e aggiungiamo il loro listener
      document.querySelectorAll(".view-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          // Prendiamo l'URL dal data-attribute
          const photoUrl = e.target.dataset.photoUrl;
          // Apriamo l'URL in una nuova scheda
          window.open(photoUrl, "_blank");
        });
      });

      // Selezioniamo tutti i bottoni "Hide" e aggiungiamo il loro listener
      document.querySelectorAll(".hide-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          // Risaliamo al genitore più vicino con classe .col-md-4 e lo rimuoviamo
          e.target.closest(".col-md-4").remove();
        });
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

// Event listener per il bottone "Load Images" (Hamsters)
loadImagesBtn.addEventListener("click", (event) => {
  event.preventDefault();
  loadAndDisplayImages(hamstersEndPoint); // Chiama la funzione con l'endpoint dei criceti
});

// Event listener per il bottone "Load Secondary Images" (Tigers)
loadSecondaryImagesBtn.addEventListener("click", (event) => {
  event.preventDefault();
  loadAndDisplayImages(tigersEndPoint); // Chiama la funzione con l'endpoint delle tigri
});

// Event listener per il bottone "Search"
searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  if (query) {
    // Costruisci l'URL di ricerca con il termine inserito dall'utente
    const searchEndpoint = `${pexelsBaseUrl}?query=${encodeURIComponent(
      query
    )}&per_page=9`;
    loadAndDisplayImages(searchEndpoint); // Carica le immagini basate sulla ricerca
  } else {
    alert("Inserisci un termine di ricerca.");
  }
});
