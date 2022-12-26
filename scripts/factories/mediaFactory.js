export function mediaFactory(data) {
  // Destructuring the data object to extract its properties
  const { id, photographerId, title, video, likes, date, price } = data;

  // Defining a function that will return a DOM element for the media card
  function getMediaCardDOM() {
    // Create an article element to contain the media card
    const article = document.createElement("article");
    article.className += "media-card";

    // Return the article element
    return article;
  }

  // Returning an object with the name and picture properties and the getPhotographerCardDOM function
  return { getMediaCardDOM };
}
