const endpoint = "https://striveschool-api.herokuapp.com/api/agenda";

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
  fetch(endpoint, {
    method: "POST", // il metodo POST indica che questa chiamata genererà una nuova risorsa
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
