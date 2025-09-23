document.addEventListener("DOMContentLoaded", () => {
  const partials = [

    // Principais partials
    { id: "header-container", file: "partials/header.html" },
    { id: "navbar-container", file: "partials/navbar.html" },
    { id: "footer-container", file: "partials/footer.html" },

    // Pacotes
    { id: "package-cancun-playa", file: "partials/pacotes/internacionais/cancunplayadelcamen.html" },
    { id: "beto-carrero", file: "partials/pacotes/nacionais/betocarreroworld.html" },
    { id: "joao-pessoa", file: "partials/pacotes/nacionais/joaopessoa.html" },
    { id: "porto-de-galinhas", file: "partials/pacotes/nacionais/portodegalinhas.html" },
  ];

  partials.forEach(partial => {
    fetch(partial.file)
      .then(response => response.text())
      .then(html => {
        document.getElementById(partial.id).innerHTML = html;
      })
      .catch(error => {
        console.error(`Erro ao carregar ${partial.file}:`, error);
      });
  });
});

