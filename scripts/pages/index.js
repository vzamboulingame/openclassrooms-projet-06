import { photographerFactory } from "../factories/photographer.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";

async function generatePhotographerHtml(photographers) {
  const photographersSection = document.querySelector(".photographer-section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function renderPhotographerProfiles() {
  const { photographers } = await fetchJsonData();
  generatePhotographerHtml(photographers);
}

renderPhotographerProfiles();
