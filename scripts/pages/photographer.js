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

console.log(getPhotographerInfo());

console.log(getPhotographerMedia());
