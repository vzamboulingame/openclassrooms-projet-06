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

  // Create a section element to contain the photograph header
  const photographHeader = document.createElement("section");
  photographHeader.className += "photograph-header";

  // Create a div element to contain the photograph info
  const photographInfo = document.createElement("div");
  photographInfo.className += "photograph-info";

  // Create a heading element for the photographer name
  const photographName = document.createElement("h1");
  photographName.className += "photograph-name";
  photographName.textContent = `${name}`;

  // Create a paragraph element for the location
  const photographLocation = document.createElement("p");
  photographLocation.className += "photograph-location";
  photographLocation.textContent = `${city}, ${country}`;

  // Create a paragraph element for the tagline
  const photographTagline = document.createElement("p");
  photographTagline.className += "photograph-tagline";
  photographTagline.textContent = `${tagline}`;

  // Create a button element to contain the contact button
  const photographContactBtn = document.createElement("button");
  photographContactBtn.className += "contact-button";
  photographContactBtn.setAttribute("id", "contactButton");
  photographContactBtn.setAttribute(
    "aria-label",
    "Bouton d'ouverture de modal"
  );
  photographContactBtn.setAttribute("onclick", "displayModal()");
  photographContactBtn.textContent = "Contactez-moi";

  // Create an image element for the photographer portrait
  const photographImg = document.createElement("img");
  photographImg.className += "photograph-img";
  photographImg.setAttribute("src", `assets/photographers/${portrait}`);
  photographImg.setAttribute("alt", `Photo de ${name}`);

  // Append the photograph section to the main element
  const mainEl = document.querySelector("main");
  mainEl.appendChild(photographHeader);

  // Append the photograph info, contact button and portrait to the photographHeader element
  photographHeader.appendChild(photographInfo);
  photographHeader.appendChild(photographContactBtn);
  photographHeader.appendChild(photographImg);

  // Append the photograph name, location and tagline to the photographInfo element
  photographInfo.appendChild(photographName);
  photographInfo.appendChild(photographLocation);
  photographInfo.appendChild(photographTagline);
}

renderPhotographHeader();
