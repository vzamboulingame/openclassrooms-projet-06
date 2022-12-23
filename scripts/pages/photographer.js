import { displayModal, closeModal } from "../utils/contactForm.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";

const params = new URL(document.location).searchParams;
const photographerId = parseInt(params.get("id"));
const { photographers, media } = await fetchJsonData();

console.log(photographerId);
