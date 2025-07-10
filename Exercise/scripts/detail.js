// Seleziona gli elementi HTML in cui inserire i dettagli
const detailImage = document.getElementById("detailImage");
const photographerNameElement = document.getElementById("photographerName");
const photographerLinkElement = document.getElementById("photographerLink");
const goBackButton = document.getElementById("goBackButton");

// Funzione per ottenere i parametri dall'URL
const displayImageDetails = () => {
  // Ottiene i parametri URL dalla URL corrente
  const params = new URLSearchParams(window.location.search);

  // Estrae i dati necessari
  const id = params.get("id");
  const imgSrc = params.get("imgSrc");
  const photographer = params.get("photographer");
  const photographerUrl = params.get("photographerUrl");

  // Verifica se i parametri esistono e aggiorna la pagina
  if (imgSrc && photographer && photographerUrl) {
    // Aggiorna l'immagine e il suo alt text
    detailImage.src = imgSrc;
    detailImage.alt = `Immagine ID: ${id} di ${photographer}`;

    // Aggiorna il nome del fotografo e il link alla sua pagina
    photographerNameElement.textContent = photographer;
    photographerLinkElement.href = photographerUrl;
    photographerLinkElement.textContent = photographer;
  } else {
    // Gestisce il caso in cui i parametri non siano presenti o siano incompleti
    console.error("Dettagli dell'immagine non trovati nell'URL.");
    detailImage.alt = "Immagine non trovata";
    photographerNameElement.textContent = "Dettagli non disponibili";
    photographerLinkElement.textContent = "N/A";
  }
};

// Funzionalità per il bottone "Torna Indietro"
goBackButton.addEventListener("click", () => {
  // Torna alla pagina precedente nella cronologia del browser
  window.history.back();
});

// Chiama la funzione all'avvio della pagina
document.addEventListener("DOMContentLoaded", displayImageDetails);
