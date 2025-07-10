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
      console.log("ARRAYOFEVENTS", arrayOfEvents); // vuoto :(
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

yearInFooter();
getEvents();
