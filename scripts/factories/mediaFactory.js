export function mediaFactory(data) {
  // Destructuring the data object to extract its properties
  const { id, photographerId, title, image, video, likes, date, price } = data;

  // Defining a function that will return a DOM element for the media card
  function getMediaCardDOM() {
    // Create an article element to contain the media card
    const article = document.createElement("article");
    article.className += "media-card";

    // If the media is an image add the appropriate media card html to the article element
    if (image) {
      article.innerHTML = `
      <a class="media-card-link" href="#" tabindex="0">
        <img class="media-card-img" src="assets/images/${photographerId}/${image}" alt="${title}">
      </a>
      <div class="media-card-info">
        <h2 class="media-card-title">${title}</h2>
        <span class="media-card-likes">${likes} <i class="fa-solid fa-heart"></i></i></span>
      </div>
    `;
    }

    // If the media is a video add the appropriate media card html to the article element
    if (video) {
      article.innerHTML = `
      <a class="media-card-link" href="#" tabindex="0">
        <video class="media-card-video" title="${title}">
          <source src="assets/images/${photographerId}/${video}" type="video/mp4">
        </video>
      </a>
      <div class="media-card-info">
        <h2 class="media-card-title">${title}</h2>
        <span class="media-card-likes">${likes} <i class="fa-solid fa-heart"></i></i></span>
      </div>
    `;
    }

    // Return the article element
    return article;
  }

  // Returning an object with the getMediaCardDOM function
  return { getMediaCardDOM };
}
