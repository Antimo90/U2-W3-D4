const endpoint = "https://striveschool-api.herokuapp.com/api/agenda";

const yearInFooter = function () {
  // per prima cosa, popolo il footer con l'anno corrente
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear(); // 2025
};

yearInFooter();

// questo foglio JS deve avere la logica necessaria per:
// 1) capire su quale card abbia cliccato
// ho creato i link a questa pagina dettaglio in modo DINAMICO: ogni card
// in homepage ha un link in cui stiamo trasmettendo l'_id del concerto
// su cui ho cliccato
// posso ora dalla pagina dettaglio RECUPERARE quell'id
console.log(location.search);
const parameters = new URLSearchParams(location.search); // creo un oggetto con TUTTI i parametri in questo URL
const eventId = parameters.get("eventId");
// 2) recuperare i dettagli di quell'evento specifico
// facciamo una chiamata GET, sull'endpoint generico + eventId in modo
// da ottenere NON PIÙ tutti i concerti ma solamente i dettagli di UN concerto
// es. 'https://striveschool-api.herokuapp.com/api/agenda/686f84b6185a4800153e2b8c'
fetch(endpoint + "/" + eventId)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel recupero dettaglio evento");
    }
  })
  .then((concertDetails) => {
    console.log("dettagli", concertDetails);
    // nascondo lo spinner
    document.getElementById("spinner-container").classList.add("d-none");
    // 3) popolare la pagina con i dettagli appena recuperati
    document.querySelector(".card .card-title").innerText = concertDetails.name;
    document.querySelector(".card .card-text:nth-of-type(1)").innerText =
      concertDetails.description;
    document.querySelector(".card .card-text:nth-of-type(2)").innerText =
      new Date(concertDetails.time).toLocaleDateString() +
      " " +
      new Date(concertDetails.time).toLocaleTimeString() +
      " - " +
      concertDetails.price +
      "€";
  })
  .catch((err) => {
    console.log("ERRORE", err);
  });

const deleteConcert = function () {
  // con questa funzione chiedo all'API di eliminare questa risorsa
  fetch(endpoint + "/" + eventId, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // l'operazione di DELETE è andata a buon fine!
        alert("ELIMINAZIONE AVVENUTA CON SUCCESSO");
        // visto che la risorsa non esiste più, riportiamo l'utente in home
        location.assign("/index.html");
      } else {
        throw new Error("Errore in fase di eliminazione");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

// fase di modifica
const editConcert = function () {
  // dobbiamo re-direzionare l'utente alla pagina backoffice con un parametro nell'URL
  location.assign("/backoffice.html?eventId=" + eventId);
};
// NOTA PER GLI URL DELLE API REST
// CHIAMATE GET:
// https://striveschool-api.herokuapp.com/api/agenda
// CHIAMATE POST:
// https://striveschool-api.herokuapp.com/api/agenda
// CHIAMATA GET PER UN SINGOLO ELEMENTO DELL'API:
// https://striveschool-api.herokuapp.com/api/agenda/_id
// CHIAMATA DELETE:
// https://striveschool-api.herokuapp.com/api/agenda/_id
// CHIAMATA PUT:
// https://striveschool-api.herokuapp.com/api/agenda/_id
