export function displayModal(modalName) {
  const modal = document.getElementById(modalName);
  modal.showModal();
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

export function closeModal(modalName) {
  const modal = document.getElementById(modalName);
  modal.close();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}
