// Efecto neón intermitente en el título
const title = document.querySelector("header h1");

setInterval(() => {
  title.style.textShadow =
    title.style.textShadow === "0 0 20px #ff00ff" ?
    "0 0 20px #00e5ff" :
    "0 0 20px #ff00ff";
}, 1000);
