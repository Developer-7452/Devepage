// Lista de addons
const addons = [
  {
    id: 1,
    name: "Addon de Facciones",
    description: "Administra facciones en tu servidor.",
    image: "images/facciones.png"
  },
  {
    id: 2,
    name: "Anti Xray",
    description: "Sistema para detectar minería injusta.",
    image: "images/anti-xray.png"
  }
  // Agrega más addons aquí
];

// Cargar los addons en la página
const addonsList = document.getElementById("addons-list");

addons.forEach(addon => {
  const addonElement = document.createElement("div");
  addonElement.classList.add("addon");

  addonElement.innerHTML = `
    <img src="${addon.image}" alt="${addon.name}">
    <h3>${addon.name}</h3>
    <p>${addon.description}</p>
  `;

  addonsList.appendChild(addonElement);
});
