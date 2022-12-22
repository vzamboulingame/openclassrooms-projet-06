import { photographerFactory } from "../factories/photographer.js";

async function fetchJsonData() {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

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
