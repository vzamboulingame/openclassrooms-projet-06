export function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getPhotographerCardDOM() {
    const article = document.createElement("article");
    article.className += "photographer-card";

    const photographerCardLink = document.createElement("a");
    photographerCardLink.className += "photographer-card-link";
    photographerCardLink.setAttribute("href", `photographer.html?id=${id}`);
    photographerCardLink.setAttribute(
      "aria-label",
      `Lien vers le portfolio de ${name}`
    );

    const photographerImg = document.createElement("img");
    photographerImg.className += "photographer-img";
    photographerImg.setAttribute("src", picture);
    photographerImg.setAttribute("alt", `Photo de ${name}`);

    const photographerName = document.createElement("h2");
    photographerName.className += "photographer-name";
    photographerName.textContent = name;

    const photographerLocation = document.createElement("p");
    photographerLocation.className += "photographer-location";
    photographerLocation.textContent = `${city}, ${country}`;

    const photographerTagline = document.createElement("p");
    photographerTagline.className += "photographer-tagline";
    photographerTagline.textContent = tagline;

    const photographerRate = document.createElement("p");
    photographerRate.className += "photographer-rate";
    photographerRate.textContent = `${price} € / jour`;

    photographerCardLink.appendChild(photographerImg);
    photographerCardLink.appendChild(photographerName);

    article.appendChild(photographerCardLink);
    article.appendChild(photographerLocation);
    article.appendChild(photographerTagline);
    article.appendChild(photographerRate);

    return article;
  }

  return { name, picture, getPhotographerCardDOM };
}
