export function displayModal() {
  const modal = document.getElementById("contactModal");
  const main = document.querySelector("main");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "true");
}

export function closeModal() {
  const modal = document.getElementById("contactModal");
  const main = document.querySelector("main");
  modal.style.display = "none";
  main.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
}
