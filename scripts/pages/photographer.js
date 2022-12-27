import { displayModal, closeModal } from "../utils/contactForm.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";

const params = new URL(document.location).searchParams;
const photographerId = parseInt(params.get("id"));

async function getPhotographerInfo() {
  const { photographers } = await fetchJsonData();
  return photographers.find(
    (photographer) => photographer.id === photographerId
  );
}

async function getPhotographerMedia() {
  const { media } = await fetchJsonData();
  return media.filter(
    (mediaItem) => mediaItem.photographerId === photographerId
  );
}

async function renderPhotographHeader() {
  const { name, city, country, tagline, portrait } =
    await getPhotographerInfo();

  const photographHeader = `
    <section class="photograph-header">
      <div class="photograph-info">
        <h1 class="photograph-name">${name}</h1>
        <p class="photograph-location">${city}, ${country}</p>
        <p class="photograph-tagline">${tagline}</p>
      </div>
      <button class="contact-button" id="contactButton" aria-label="Bouton d'ouverture de modal" onclick="displayModal()">Contactez-moi</button>
      <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
    </section>
  `;

  const mainEl = document.querySelector("main");
  mainEl.innerHTML += photographHeader;
}

renderPhotographHeader();
