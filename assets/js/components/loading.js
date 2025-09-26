/**
 * Sistema de Loading States para SunTour
 * Gerencia estados de carregamento para melhor UX
 */

class LoadingManager {
  constructor() {
    this.activeLoadings = new Set();
  }

  /**
   * Cria diferentes tipos de loading states
   */
  createLoadingHTML(type = 'spinner', options = {}) {
    const { message = 'Carregando...', size = 'normal' } = options;

    switch (type) {
      case 'spinner':
        return `
          <div class="loading-container">
            <div class="loading-spinner ${size}"></div>
            <div class="loading-text">${message}</div>
          </div>
        `;

      case 'skeleton-card':
        return `
          <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-text title"></div>
            <div class="skeleton-text subtitle"></div>
            <div class="skeleton-text description"></div>
          </div>
        `;

      case 'skeleton-blog':
        return `
          <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div style="padding: 20px;">
              <div class="skeleton-text" style="width: 40%; margin-bottom: 10px;"></div>
              <div class="skeleton-text title" style="margin-bottom: 10px;"></div>
              <div class="skeleton-text description"></div>
            </div>
          </div>
        `;

      case 'dots':
        return `
          <div class="loading-container">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="loading-text">${message}</div>
          </div>
        `;

      default:
        return this.createLoadingHTML('spinner', options);
    }
  }

  /**
   * Mostra loading em um elemento
   */
  showLoading(elementId, type = 'spinner', options = {}) {
    const element = document.getElementById(elementId);
    if (!element) return false;

    this.activeLoadings.add(elementId);
    element.innerHTML = this.createLoadingHTML(type, options);
    element.classList.add('loading-active');
    
    return true;
  }

  /**
   * Remove loading e mostra conteúdo com transição
   */
  hideLoading(elementId, content = '', fadeTime = 300) {
    const element = document.getElementById(elementId);
    if (!element || !this.activeLoadings.has(elementId)) return false;

    // Fade out
    element.style.opacity = '0.3';
    
    setTimeout(() => {
      element.innerHTML = content;
      element.classList.remove('loading-active');
      this.activeLoadings.delete(elementId);
      
      // Fade in
      element.style.opacity = '1';
    }, fadeTime / 2);

    return true;
  }

  /**
   * Carrega conteúdo via fetch com loading state
   */
  async loadContent(elementId, url, loadingType = 'spinner', options = {}) {
    const { 
      delay = 0, 
      errorMessage = '❌ Erro ao carregar conteúdo',
      loadingMessage = 'Carregando...'
    } = options;

    // Mostra loading
    this.showLoading(elementId, loadingType, { message: loadingMessage });

    // Adiciona delay se especificado
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const content = await response.text();
      this.hideLoading(elementId, content);
      
      return { success: true, content };
    } catch (error) {
      console.error(`Erro ao carregar ${url}:`, error);
      
      const errorHTML = `
        <div class="loading-container">
          <div class="loading-text" style="color: #e74c3c;">
            ${errorMessage}
          </div>
          <button onclick="loadingManager.loadContent('${elementId}', '${url}', '${loadingType}')" 
                  style="margin-top: 10px; padding: 5px 10px; border: 1px solid #e74c3c; background: none; color: #e74c3c; border-radius: 4px; cursor: pointer;">
            Tentar novamente
          </button>
        </div>
      `;
      
      this.hideLoading(elementId, errorHTML);
      return { success: false, error };
    }
  }

  /**
   * Verifica se há loadings ativos
   */
  hasActiveLoadings() {
    return this.activeLoadings.size > 0;
  }

  /**
   * Para todos os loadings ativos
   */
  clearAllLoadings() {
    this.activeLoadings.forEach(elementId => {
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.remove('loading-active');
        element.style.opacity = '1';
      }
    });
    this.activeLoadings.clear();
  }
}

// Instância global
const loadingManager = new LoadingManager();

// Adiciona estilos CSS para loading dots
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .loading-dots {
      display: flex;
      gap: 4px;
      margin-bottom: 1rem;
    }
    
    .loading-dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #006064;
      animation: dots-bounce 1.4s infinite ease-in-out;
    }
    
    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
    .loading-dots span:nth-child(3) { animation-delay: 0s; }
    
    @keyframes dots-bounce {
      0%, 80%, 100% {
        transform: scale(0.6);
        opacity: 0.4;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .loading-spinner.small {
      width: 20px;
      height: 20px;
    }

    .loading-spinner.large {
      width: 60px;
      height: 60px;
      border-width: 6px;
    }
  `;
  document.head.appendChild(style);
});

// Exporta para uso global
window.loadingManager = loadingManager;