const endpoint = "https://striveschool-api.herokuapp.com/api/agenda";
// -PARTE FINALE-
// ora la pagina backoffice servirà anche per MODIFICARE un evento già
// esistente. In tal caso, si caricherà con un parametro "eventId" nell'URL.
const parameters = new URLSearchParams(location.search); // creo un oggetto con TUTTI i parametri in questo URL
const eventId = parameters.get("eventId");
// ora eventId potrebbe essere una stringa oppure null, a seconda che la pagina
// sia stata caricata in modalità "modifica" (a partire da un bottone modifica)
// oppure in modalità "creazione" (l'utente ha cliccato il link nella navbar)
if (eventId) {
  // ora dobbiamo fare la fetch e ripopolare la pagina
  fetch(endpoint + "/" + eventId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel recupero dati del singolo concerto");
      }
    })
    .then((concertDetails) => {
      console.log(concertDetails);
      document.getElementById("name").value = concertDetails.name;
      document.getElementById("description").value = concertDetails.description;
      document.getElementById("price").value = concertDetails.price;
      document.getElementById("time").value = concertDetails.time.slice(0, -5);
    })
    .catch((err) => {
      console.log(err);
    });
}

class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.time = _time;
  }
}

const yearInFooter = function () {
  // per prima cosa, popolo il footer con l'anno corrente
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear(); // 2025
};

// il mio backender di fiducia mi ha detto come sono strutturati
// gli oggetti di tipo "concerto" all'interno dell'API /agenda
// - name (string)
// - description (string)
// - price (number/string)
// - time (string)
// ora devo creare un form che sia in grado di generare un oggetto
// esattamente di questa forma!

// interagiamo ora con l'evento di submit del form in modo
// da poter inviare gli oggetti che creiamo all'API dei concerti
const concertForm = document.getElementById("concert-form");
concertForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   recupero i riferimenti ai 4 input
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const timeInput = document.getElementById("time");

  const concertToSave = new Concert(
    nameInput.value, // valore dell'input name
    descriptionInput.value, // valore dell'input description
    priceInput.value, // valore dell'input price
    timeInput.value // valore dell'input time
  );
  console.log(concertToSave);

  //   bene! il concerto sembra a posto, proviamo ora a inviarlo all'API

  // le "RESTful API" ci garantiscono che l'indirizzo utilizzato per una chiamata
  // GET è sempre lo stesso identico dell'indirizzo per una chiamata POST

  let endpointToUse;
  if (eventId) {
    // abbiamo un ID nell'url, siamo qua per MODIFICARE un concerto!
    endpointToUse = endpoint + "/" + eventId;
  } else {
    // NON abbiamo un ID nell'url., siamo qua per CREARE un concerto!
    endpointToUse = endpoint;
  }

  let methodToUse;
  if (eventId) {
    // abbiamo un ID nell'url, siamo qua per MODIFICARE un concerto!
    methodToUse = "PUT";
  } else {
    // NON abbiamo un ID nell'url., siamo qua per CREARE un concerto!
    methodToUse = "POST";
  }

  fetch(endpointToUse, {
    method: methodToUse, // il metodo POST indica che questa chiamata genererà una nuova risorsa
    body: JSON.stringify(concertToSave), // il body dev'essere una stringa JSON
    headers: {
      "Content-Type": "application/json",
      // sto dicendo alle API che allego un oggetto in formato JSON
    },
  })
    .then((response) => {
      if (response.ok) {
        // il concerto dovrebbe essersi salvato correttamente!
        // l'operazione è andata a buon fine!
        alert("OPERAZIONE COMPLETATA!");
        // svuotiamo il form
        concertForm.reset();
      } else {
        throw new Error("Errore nella request", response.status);
      }
    })
    .catch((err) => {
      alert("ERRORE");
      console.log("ERRORE", err);
    });
});

// metto l'anno nel footer
yearInFooter();
