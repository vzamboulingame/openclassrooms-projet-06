import { mediaFactory } from "../factories/mediaFactory.js";
import { getPhotographerInfo } from "../utils/getPhotographerInfo.js";
import { getPhotographerMedia } from "../utils/getPhotographerMedia.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

const photographerInfo = await getPhotographerInfo();
const photographerMedia = await getPhotographerMedia();

function renderPhotographHeader(object) {
  // Destructuring the photographer info object to extract to extract its properties
  const { name, city, country, tagline, portrait } = object;

  // Create the HTML for the header section
  const photographHeader = `
    <section class="photograph-header">
      <div class="photograph-info">
        <h1 class="photograph-name">${name}</h1>
        <p class="photograph-location">${city}, ${country}</p>
        <p class="photograph-tagline">${tagline}</p>
      </div>
      <button class="button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Contactez-moi</button>
      <img class="photograph-img" src="assets/photographers/${portrait}" alt="Photo de ${name}">
    </section>
  `;

  // Add the footer HTML to the main element
  const mainEl = document.querySelector("main");
  mainEl.innerHTML += photographHeader;
}

function renderPhotographFooter(object) {
  // Destructuring the photographer info object to extract the photographer price
  const { price } = object;

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

function renderMediaArticle(array) {
  // Create a new div element to hold the media cards
  const mediaSection = document.createElement("div");
  mediaSection.className = "media-section";

  // Append the media section to the main element
  const mainEl = document.querySelector("main");
  mainEl.append(mediaSection);

  // Iterate through each media item in the array
  array.forEach((media) => {
    // Create a media card model object from the media array
    const mediaCardModel = mediaFactory(media);
    // Get the DOM element for the media card
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    // Add the card to the media section
    mediaSection.append(mediaCardDOM);
  });
}

function insertPhotographName(object) {
  // Destructuring the photographer info object to extract the name property
  const { name } = object;

  // Add the photographer name to the modalTitle element
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `Contactez-moi<br>${name}`;
}

function validateModalForm(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the elements of the modal form & its inputs
  const modalForm = document.getElementById("modalForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Check if the form input data is valid & console.log the data as an object
  if (modalForm.checkValidity()) {
    console.log({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value,
    });
    modalForm.reset();
    closeModal("contactModal");
  }
}

async function renderLightBoxMedia(mediaId) {
  // Get the media object for the specified media id
  const mediaObject = await photographerMedia.find(
    (media) => media.id == mediaId
  );

  // Destructuring the media object to extract its properties
  const { title, photographerId, image, video } = mediaObject;

  // Get the lightboxMedia element
  const lightboxMedia = document.getElementById("lightboxMedia");

  // If the media is an image add the appropriate media card html to the lightboxMedia element
  if (image) {
    lightboxMedia.innerHTML = `
      <img class="lightbox-img" src="assets/images/${photographerId}/${image}" alt="${title}">
  `;
  }

  // If the media is a video add the appropriate media card html to the lightboxMedia element
  if (video) {
    lightboxMedia.innerHTML = `
      <video class="lightbox-video" title="${title}" controls>
        <source src="assets/images/${photographerId}/${video}" type="video/mp4">
      </video>
  `;
  }
}

async function renderPhotographMediaPage() {
  // Render the header section of the page with the photographer's name, location, tagline, and portrait
  await renderPhotographHeader(photographerInfo);

  // Render the footer section of the page with the photographer's likes and rate
  await renderPhotographFooter(photographerInfo);

  // Render the media section of the page with cards for each media item
  await renderMediaArticle(photographerMedia);

  // Insert the photographer name in the modal title
  await insertPhotographName(photographerInfo);

  // Add an event listener to the contact button to open the contact modal on click
  const contactBtn = document.getElementById("contactBtn");
  contactBtn.addEventListener("click", () => {
    displayModal("contactModal");
  });

  // Add an event listener to the close button in the modal to close the contact modal on click
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  modalCloseBtn.addEventListener("click", () => {
    closeModal("contactModal");
  });

  // Add an event listener to validate the contact modal form on submit
  const modalForm = document.getElementById("modalForm");
  modalForm.addEventListener("submit", validateModalForm);

  // Add an event listener to each media card link to open the lightbox modal on click
  const mediaCardLinks = document.querySelectorAll(".media-card-link");
  mediaCardLinks.forEach((card) => {
    card.addEventListener("click", () => {
      const mediaId = card.id;
      renderLightBoxMedia(mediaId);
      displayModal("lightboxModal");
    });
  });

  // Add an event listener to the close button in the lightbox modal to close the modal on click
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  lightboxCloseBtn.addEventListener("click", () => {
    closeModal("lightboxModal");
  });
}

// Render the entire photographer's media page with all its elements
renderPhotographMediaPage();
