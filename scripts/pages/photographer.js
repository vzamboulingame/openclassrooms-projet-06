import { displayModal, closeModal } from "../utils/contactForm.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";
import { mediaFactory } from "../factories/mediaFactory.js";

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
      <button class="contact-button" id="contactBtn" aria-label="Bouton d'ouverture de modal">Contactez-moi</button>
      <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
    </section>
  `;

  const mainEl = document.querySelector("main");
  mainEl.innerHTML += photographHeader;
}

async function renderPhotographFooter() {
  const { price } = await getPhotographerInfo();

  const photographFooter = `
    <aside class="photograph-footer">
        <i class="fa-solid fa-heart"></i>
        <p>${price} € / jour</p>
    </aside>
  `;

  const footerEl = document.querySelector("footer");
  footerEl.innerHTML += photographFooter;
}

async function renderMediaArticle() {
  const mediaArray = await getPhotographerMedia();

  const mainEl = document.querySelector("main");
  const mediaSection = document.createElement("div");
  mediaSection.className = "media-section";

  mainEl.append(mediaSection);

  mediaArray.forEach((media) => {
    // Create a media card model object from the media array
    const mediaCardModel = mediaFactory(media);
    // Get the DOM element for the media card
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    // Add the card to the media section
    mediaSection.append(mediaCardDOM);
  });
}

async function renderPhotographMediaPage() {
  await renderPhotographHeader();

  await renderPhotographFooter();

  await renderMediaArticle();

  const contactBtn = document.getElementById("contactBtn");
  contactBtn.addEventListener("click", displayModal);

  const modalCloseBtn = document.getElementById("modalCloseBtn");
  modalCloseBtn.addEventListener("click", closeModal);
}

renderPhotographMediaPage();
