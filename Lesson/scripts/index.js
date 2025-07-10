// questo documento verrà lanciato all'avvio della pagina index.html

const yearInFooter = function () {
  // per prima cosa, popolo il footer con l'anno corrente
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear(); // 2025
};

// effettuiamo una chiamata all'endpoint di oggi per recuperare gli eventi
// da cui generare le card per la homepage

const endpoint = "https://striveschool-api.herokuapp.com/api/agenda";

const getEvents = function () {
  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        // proseguo
        return response.json();
      } else {
        throw new Error("Response.ok non ha restituito true");
      }
    })
    .then((arrayOfEvents) => {
      // qui il caricamento degli eventi si è concluso
      // TOLGO lo spinner dalla pagina
      document.getElementById("spinner-container").classList.add("d-none");
      console.log("ARRAYOFEVENTS", arrayOfEvents);
      // recupero la riga dove appenderemo le colonne con le cards
      const row = document.getElementById("events-row");
      if (arrayOfEvents.length === 0) {
        row.innerHTML = `
          <div class="col">
            <p class="text-center">Al momento non ci sono concerti disponibili</p>
          </div>
        `;
      } else {
        arrayOfEvents.forEach((event) => {
          row.innerHTML += `
            <div class="col">
              <div class="card h-100 d-flex flex-column">
                <img src="https://psicologinews.it/wp-content/uploads/2024/02/1522324821926_1522324836.jpg-assistere_a_un_concerto_ogni_quindici_giorni_allunga_la_vita_di_nove_anni__scopri_i_risultati_della_ricerca_.jpeg" class="card-img-top" alt="immagine default concerto">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text flex-grow-1">${event.description}</p>
                  <p class="card-text">${new Date(
                    event.time
                  ).toLocaleDateString()} ${new Date(
            event.time
          ).toLocaleTimeString()} - ${event.price}€</p>
                  <a href="./detail.html?eventId=${
                    event._id
                  }" class="btn btn-primary">Vai ai dettagli</a>
                </div>
              </div>
            </div>
          `;
        });
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

yearInFooter();
getEvents();
