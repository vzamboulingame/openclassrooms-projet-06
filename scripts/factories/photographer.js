export function photographerFactory(data) {
  const { name, city, country, portrait } = data;

  const picture = `assets/photographers/${portrait}`;
  const imgAltText = `Portrait of ${name}`;
  const location = `${city}, ${country}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", imgAltText);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const h3 = document.createElement("h3");
    h3.textContent = location;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
