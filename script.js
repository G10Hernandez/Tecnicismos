// Efecto neón intermitente en el título
const title = document.querySelector("header h1");
setInterval(() => {
  title.style.textShadow =
    title.style.textShadow === "0 0 20px #ff00ff"
      ? "0 0 20px #00e5ff"
      : "0 0 20px #ff00ff";
}, 1000);

// Cargar datos desde data.json
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const articlesContainer = document.getElementById("articles");
    const sidebar = document.getElementById("sidebar");

    // --- Insertar artículos (con categorías) ---
    function mostrarArticulos(filtro = "Todos") {
      articlesContainer.innerHTML = "";
      data.articulos
        .filter(art => filtro === "Todos" || art.categoria === filtro)
        .forEach(art => {
          const article = document.createElement("article");
          article.classList.add("post");
          article.innerHTML = `
            <h2>${art.titulo}</h2>
            <p><strong>[${art.categoria}]</strong> ${art.contenido}</p>
          `;
          articlesContainer.appendChild(article);
        });
    }
    mostrarArticulos();

    // --- Crear filtro de categorías ---
    const categorias = ["Todos", ...new Set(data.articulos.map(art => art.categoria))];
    const filtroWidget = document.createElement("div");
    filtroWidget.classList.add("widget");
    filtroWidget.innerHTML = "<h3>Filtrar por Categoría</h3>";

    const select = document.createElement("select");
    select.style.width = "100%";
    select.style.padding = "8px";
    select.style.borderRadius = "8px";
    select.style.border = "1px solid #444";
    select.style.background = "#111";
    select.style.color = "#fff";

    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      mostrarArticulos(select.value);
    });

    filtroWidget.appendChild(select);
    sidebar.appendChild(filtroWidget);

    // --- Noticias ---
    const newsWidget = document.createElement("div");
    newsWidget.classList.add("widget");
    newsWidget.innerHTML = "<h3>Últimas Noticias</h3>";
    const newsList = document.createElement("ul");
    data.noticias.forEach(noticia => {
      const li = document.createElement("li");
      li.textContent = noticia;
      newsList.appendChild(li);
    });
    newsWidget.appendChild(newsList);
    sidebar.appendChild(newsWidget);

    // --- Gadgets ---
    const gadgetsWidget = document.createElement("div");
    gadgetsWidget.classList.add("widget");
    gadgetsWidget.innerHTML = "<h3>Gadgets Recomendados</h3>";
    const gadgetsList = document.createElement("ul");
    data.gadgets.forEach(gadget => {
      const li = document.createElement("li");
      li.textContent = gadget;
      gadgetsList.appendChild(li);
    });
    gadgetsWidget.appendChild(gadgetsList);
    sidebar.appendChild(gadgetsWidget);
  })
  .catch(err => console.error("Error cargando data.json:", err));

function mostrarArticulos(filtro = "Todos") {
  articlesContainer.innerHTML = "";
  let delay = 0;

  data.articulos
    .filter(art => filtro === "Todos" || art.categoria === filtro)
    .forEach(art => {
      const article = document.createElement("article");
      article.classList.add("post");
      article.style.animationDelay = `${delay}s`;
      article.innerHTML = `
        <h2>${art.titulo}</h2>
        <p><strong>[${art.categoria}]</strong> ${art.contenido}</p>
      `;
      articlesContainer.appendChild(article);
      delay += 0.2; // Cada artículo aparece un poco después del anterior
    });
}
