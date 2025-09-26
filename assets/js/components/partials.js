document.addEventListener("DOMContentLoaded", () => {
  // Configurações dos componentes
  const components = [
    // Principais partials
    { 
      id: "header-container", 
      file: "partials/header.html", 
      loadingType: "spinner",
      delay: 100,
      message: "Carregando cabeçalho..."
    },
    { 
      id: "navbar-container", 
      file: "partials/navbar.html", 
      loadingType: "spinner",
      delay: 50,
      message: "Carregando navegação..."
    },
    { 
      id: "footer-container", 
      file: "partials/footer.html", 
      loadingType: "spinner",
      delay: 200,
      message: "Carregando rodapé..."
    },

    // Pacotes
    { 
      id: "package-cancun-playa", 
      file: "partials/pacotes/internacionais/cancunplayadelcamen.html", 
      loadingType: "skeleton-card",
      delay: 300
    },
    { 
      id: "beto-carrero", 
      file: "partials/pacotes/nacionais/betocarreroworld.html", 
      loadingType: "skeleton-card",
      delay: 500
    },
    { 
      id: "joao-pessoa", 
      file: "partials/pacotes/nacionais/joaopessoa.html", 
      loadingType: "skeleton-card",
      delay: 700
    },

    // Testimunhos
    { 
      id: "carlos-testimonial", 
      file: "partials/testimonial/carlos.html", 
      loadingType: "skeleton-card",
      delay: 400
    },
    { 
      id: "maria-testimonial", 
      file: "partials/testimonial/maria.html", 
      loadingType: "skeleton-card",
      delay: 600
    },
    { 
      id: "joao-testimonial", 
      file: "partials/testimonial/joao.html", 
      loadingType: "skeleton-card",
      delay: 800
    },

    // Blog posts
    { 
      id: "blog1", 
      file: "partials/blog/notice1.html", 
      loadingType: "skeleton-blog",
      delay: 500,
      message: "Carregando artigo..."
    },
    { 
      id: "blog2", 
      file: "partials/blog/notice2.html", 
      loadingType: "skeleton-blog",
      delay: 700,
      message: "Carregando artigo..."
    },
    { 
      id: "blog3", 
      file: "partials/blog/notice3.html", 
      loadingType: "skeleton-blog",
      delay: 900,
      message: "Carregando artigo..."
    }
  ];

  // Carrega todos os componentes com loading states
  components.forEach(component => {
    if (document.getElementById(component.id)) {
      loadingManager.loadContent(
        component.id, 
        component.file, 
        component.loadingType,
        {
          delay: component.delay,
          loadingMessage: component.message || 'Carregando...',
          errorMessage: `❌ Erro ao carregar ${component.id.replace('-', ' ')}`
        }
      );
    }
  });

  // Log para desenvolvimento
  console.log('🚀 Sistema de loading iniciado');
  
  // Monitora quando todos os loadings terminarem
  const checkLoadingsComplete = setInterval(() => {
    if (!loadingManager.hasActiveLoadings()) {
      console.log('✅ Todos os componentes carregados com sucesso');
      clearInterval(checkLoadingsComplete);
      
      // Dispatch evento personalizado quando tudo estiver carregado
      document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
    }
  }, 500);
});

// Event listener para quando todos componentes forem carregados
document.addEventListener('allComponentsLoaded', () => {
  console.log('🎉 Website totalmente carregado e pronto!');
  
  // Aqui você pode adicionar funcionalidades que dependem de todos os componentes
  // Por exemplo: inicializar sliders, analytics, etc.
});
