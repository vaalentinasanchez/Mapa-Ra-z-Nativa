// ═══════════════════════════════════════════════════════════════════════
// 🧩 WEB COMPONENTS PARA TAILWIND CSS PLAYGROUND
// ═══════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────
// Demo 1: Hola Mundo - Componente básico
// ───────────────────────────────────────────────────────────────────────
class HolaMundo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="bg-emerald-500 text-white p-6 rounded-lg text-center">
        <h2 class="text-2xl font-bold">¡Hola Mundo! 👋</h2>
        <p>Mi primer Web Component</p>
      </div>
    `;
  }
}

customElements.define('hola-mundo', HolaMundo);

// ───────────────────────────────────────────────────────────────────────
// Demo 2: Tarjeta de Perfil - Componente con atributos
// ───────────────────────────────────────────────────────────────────────
class TarjetaPerfil extends HTMLElement {
  connectedCallback() {
    const nombre = this.getAttribute('nombre') || 'Sin nombre';
    const rol = this.getAttribute('rol') || 'Sin rol';
    const color = this.getAttribute('color') || 'blue';
    
    this.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-6 text-center">
        <div class="w-20 h-20 bg-${color}-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
          👤
        </div>
        <h3 class="text-xl font-bold text-gray-800">${nombre}</h3>
        <p class="text-${color}-600 font-semibold">${rol}</p>
      </div>
    `;
  }
}

customElements.define('tarjeta-perfil', TarjetaPerfil);

// ───────────────────────────────────────────────────────────────────────
// Demo 3: Contador - Componente interactivo
// ───────────────────────────────────────────────────────────────────────
class ContadorBoton extends HTMLElement {
  constructor() {
    super();
    this.contador = 0;
  }

  connectedCallback() {
    this.render();
    
    // Event listeners
    this.querySelector('.btn-mas').addEventListener('click', () => {
      this.contador++;
      this.actualizar();
    });
    
    this.querySelector('.btn-menos').addEventListener('click', () => {
      this.contador--;
      this.actualizar();
    });
    
    this.querySelector('.btn-reset').addEventListener('click', () => {
      this.contador = 0;
      this.actualizar();
    });
  }

  actualizar() {
    this.querySelector('.contador').textContent = this.contador;
    
    // Cambiar color según el valor
    const contadorEl = this.querySelector('.contador');
    contadorEl.className = 'text-6xl font-bold mb-4 contador transition-colors';
    
    if (this.contador > 0) {
      contadorEl.classList.add('text-green-600');
    } else if (this.contador < 0) {
      contadorEl.classList.add('text-red-600');
    } else {
      contadorEl.classList.add('text-purple-600');
    }
  }

  render() {
    this.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-6 text-center">
        <div class="text-6xl font-bold text-purple-600 mb-4 contador">
          ${this.contador}
        </div>
        <div class="flex gap-2 justify-center flex-wrap">
          <button class="btn-menos bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            ➖ Menos
          </button>
          <button class="btn-reset bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            🔄 Reset
          </button>
          <button class="btn-mas bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            ➕ Más
          </button>
        </div>
      </div>
    `;
  }

  disconnectedCallback() {
    // Limpiar event listeners si es necesario
    console.log('Contador removido del DOM');
  }
}

customElements.define('contador-boton', ContadorBoton);

// ───────────────────────────────────────────────────────────────────────
// Demo 4: Botón Custom - Componente con Shadow DOM
// ───────────────────────────────────────────────────────────────────────
class BotonCustom extends HTMLElement {
  connectedCallback() {
    // Crear Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    
    const texto = this.getAttribute('texto') || 'Click me';
    
    // Estilos completamente encapsulados
    shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-size: 1.125rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      </style>
      
      <button>${texto}</button>
    `;
    
    // Event listener para el botón dentro del Shadow DOM
    shadow.querySelector('button').addEventListener('click', () => {
      // Emitir un evento personalizado
      this.dispatchEvent(new CustomEvent('boton-click', {
        bubbles: true,
        composed: true,
        detail: { texto }
      }));
    });
  }
}

customElements.define('boton-custom', BotonCustom);

// ───────────────────────────────────────────────────────────────────────
// COMPONENTES BONUS (para que los estudiantes exploren)
// ───────────────────────────────────────────────────────────────────────

// Componente: Alert Box
class AlertBox extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || 'Mensaje';
    
    const colors = {
      success: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800', icon: '✅' },
      error: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800', icon: '❌' },
      warning: { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-800', icon: '⚠️' },
      info: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800', icon: 'ℹ️' }
    };
    
    const style = colors[type] || colors.info;
    
    this.innerHTML = `
      <div class="${style.bg} border-l-4 ${style.border} p-4 rounded-lg flex items-center gap-3">
        <span class="text-2xl">${style.icon}</span>
        <span class="${style.text} font-semibold">${message}</span>
      </div>
    `;
  }
}

customElements.define('alert-box', AlertBox);

// Componente: Loading Spinner
class LoadingSpinner extends HTMLElement {
  connectedCallback() {
    const size = this.getAttribute('size') || 'medium';
    const color = this.getAttribute('color') || 'blue';
    
    const sizes = {
      small: 'w-6 h-6',
      medium: 'w-12 h-12',
      large: 'w-16 h-16'
    };
    
    this.innerHTML = `
      <div class="flex items-center justify-center">
        <div class="${sizes[size]} border-4 border-${color}-200 border-t-${color}-600 rounded-full animate-spin"></div>
      </div>
    `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);

// Componente: Progress Bar
class ProgressBar extends HTMLElement {
  connectedCallback() {
    const value = parseInt(this.getAttribute('value')) || 0;
    const max = parseInt(this.getAttribute('max')) || 100;
    const color = this.getAttribute('color') || 'blue';
    
    const percentage = Math.min(Math.round((value / max) * 100), 100);
    
    this.innerHTML = `
      <div class="w-full">
        <div class="flex justify-between mb-1">
          <span class="text-sm font-semibold text-gray-700">Progreso</span>
          <span class="text-sm font-semibold text-gray-700">${percentage}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div class="bg-${color}-600 h-4 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('progress-bar', ProgressBar);

// Componente: Badge
class BadgeTag extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute('text') || 'Badge';
    const color = this.getAttribute('color') || 'blue';
    
    this.innerHTML = `
      <span class="inline-block bg-${color}-100 text-${color}-800 text-xs font-semibold px-3 py-1 rounded-full">
        ${text}
      </span>
    `;
  }
}

customElements.define('badge-tag', BadgeTag);

// ═══════════════════════════════════════════════════════════════════════
// Event Listeners Globales (opcional)
// ═══════════════════════════════════════════════════════════════════════

document.addEventListener('boton-click', (e) => {
  console.log('Botón custom clickeado:', e.detail);
});

// Log para confirmar que el script se cargó
console.log('✅ Web Components cargados correctamente');
console.log('Componentes disponibles:', [
  'hola-mundo',
  'tarjeta-perfil',
  'contador-boton',
  'boton-custom',
  'alert-box',
  'loading-spinner',
  'progress-bar',
  'badge-tag'
]);