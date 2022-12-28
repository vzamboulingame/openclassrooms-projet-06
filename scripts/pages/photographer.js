import { displayModal, closeModal } from "../utils/contactForm.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";
import { mediaFactory } from "../factories/mediaFactory.js";

// Retrieve the photographer's id from the URL parameters
const params = new URL(document.location).searchParams;
const photographerId = parseInt(params.get("id"));

// Retrieve a photographer's info from the JSON data by their id
async function getPhotographerInfo() {
  // Fetch the photographer object from the JSON data
  const { photographers } = await fetchJsonData();
  // Find the photographer object in the photographers array with the matching id
  return photographers.find(
    (photographer) => photographer.id === photographerId
  );
}

// Retrieve a photographer's media items from the JSON data by their id
async function getPhotographerMedia() {
  // Fetch the media array from the JSON data
  const { media } = await fetchJsonData();
  // Filter the media array to return only items with a matching photographerId
  return media.filter(
    (mediaItem) => mediaItem.photographerId === photographerId
  );
}

async function renderPhotographHeader() {
  // Destructuring the photographer info object to extract its properties
  const { name, city, country, tagline, portrait } =
    await getPhotographerInfo();

  // Create the HTML for the header section
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

  // Add the footer HTML to the main element
  const mainEl = document.querySelector("main");
  mainEl.innerHTML += photographHeader;
}

async function renderPhotographFooter() {
  // Destructuring the photographer info object to extract a property
  const { price } = await getPhotographerInfo();

  // Create the HTML for the footer section
  const photographFooter = `
    <aside class="photograph-footer">
        <i class="fa-solid fa-heart"></i>
        <p>${price} € / jour</p>
    </aside>
  `;

  // Add the footer section HTML to the footer element
  const footerEl = document.querySelector("footer");
  footerEl.innerHTML += photographFooter;
}

async function renderMediaArticle() {
  // Get the array of media items of the photographer
  const mediaArray = await getPhotographerMedia();

  // Create a new div element to hold the media cards
  const mediaSection = document.createElement("div");
  mediaSection.className = "media-section";

  // Append the media section to the main element
  const mainEl = document.querySelector("main");
  mainEl.append(mediaSection);

  // Iterate through each media item in the mediaArray
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
  // Render the header section of the page with the photographer's name, location, tagline, and portrait
  await renderPhotographHeader();

  // Render the footer section of the page with the photographer's likes and rate
  await renderPhotographFooter();

  // Render the media section of the page with cards for each media item
  await renderMediaArticle();

  // Add an event listener to the contact button to open the contact modal on click
  const contactBtn = document.getElementById("contactBtn");
  contactBtn.addEventListener("click", displayModal);

  // Add an event listener to the close button in the modal to close the modal on click
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  modalCloseBtn.addEventListener("click", closeModal);
}

// Render the entire photographer's media page with all its elements
renderPhotographMediaPage();
