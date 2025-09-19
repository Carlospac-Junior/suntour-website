document.addEventListener("DOMContentLoaded", () => {
  const partials = [
    { id: "header-container", file: "partials/header.html" },
    { id: "navbar-container", file: "partials/navbar.html" },
    { id: "footer-container", file: "partials/footer.html" },
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