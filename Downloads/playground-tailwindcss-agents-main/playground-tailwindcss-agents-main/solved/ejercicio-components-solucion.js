// ═══════════════════════════════════════════════════════════════════════
// 🧩 SOLUCIÓN: WEB COMPONENTS
// ═══════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────
// COMPONENTE 1: Product Card ✅
// ───────────────────────────────────────────────────────────────────────
class ProductCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || 'Producto';
    const price = this.getAttribute('price') || '$0';
    const image = this.getAttribute('image') || '📦';
    
    this.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center text-6xl">
          ${image}
        </div>
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-800 mb-2">${name}</h3>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-blue-600">${price}</span>
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold">
              🛒 Comprar
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Event listener para el botón
    this.querySelector('button').addEventListener('click', () => {
      alert(`¡Agregado al carrito: ${name}!`);
    });
  }
}

customElements.define('product-card', ProductCard);


// ───────────────────────────────────────────────────────────────────────
// COMPONENTE 2: Stat Widget ✅
// ───────────────────────────────────────────────────────────────────────
class StatWidget extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute('label') || 'Stat';
    const value = this.getAttribute('value') || '0';
    const icon = this.getAttribute('icon') || '📊';
    const color = this.getAttribute('color') || 'blue';
    
    this.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-600 text-sm font-semibold">${label}</span>
          <span class="text-3xl">${icon}</span>
        </div>
        <div class="text-3xl font-bold text-${color}-600">${value}</div>
      </div>
    `;
  }
}

customElements.define('stat-widget', StatWidget);


// ───────────────────────────────────────────────────────────────────────
// COMPONENTE 3: Todo Item ✅
// ───────────────────────────────────────────────────────────────────────
class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.completed = false;
  }
  
  connectedCallback() {
    this.render();
    
    // Event listener para toggle
    this.addEventListener('click', () => {
      this.completed = !this.completed;
      this.render();
    });
  }
  
  render() {
    const text = this.getAttribute('text') || 'Tarea';
    const checkIcon = this.completed ? '✅' : '⬜';
    const textClass = this.completed ? 'line-through text-gray-400' : 'text-gray-800';
    
    this.innerHTML = `
      <div class="bg-white rounded-lg p-4 shadow hover:shadow-md transition-all cursor-pointer ${this.completed ? 'bg-green-50' : ''}">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${checkIcon}</span>
          <span class="flex-1 ${textClass} font-medium">${text}</span>
          ${this.completed ? '<span class="text-green-600 text-sm font-semibold">¡Completado!</span>' : ''}
        </div>
      </div>
    `;
  }
  
  disconnectedCallback() {
    // Limpiar event listeners si es necesario
    console.log('TodoItem removido');
  }
}

customElements.define('todo-item', TodoItem);


// ───────────────────────────────────────────────────────────────────────
// COMPONENTE 4: Rating Stars ✅
// ───────────────────────────────────────────────────────────────────────
class RatingStars extends HTMLElement {
  connectedCallback() {
    const rating = parseInt(this.getAttribute('rating')) || 0;
    const max = parseInt(this.getAttribute('max')) || 5;
    
    let stars = '';
    
    // Generar estrellas llenas y vacías
    for (let i = 1; i <= max; i++) {
      if (i <= rating) {
        stars += '<span class="text-yellow-500">⭐</span>';
      } else {
        stars += '<span class="text-gray-300">☆</span>';
      }
    }
    
    this.innerHTML = `
      <div class="flex gap-1 text-2xl">
        ${stars}
        <span class="text-sm text-gray-600 ml-2 self-center">${rating}/${max}</span>
      </div>
    `;
  }
}

customElements.define('rating-stars', RatingStars);


// ═══════════════════════════════════════════════════════════════════════
// COMPONENTES BONUS
// ═══════════════════════════════════════════════════════════════════════

// Componente Bonus: Accordion (Acordeón)
class AccordionItem extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
  }
  
  connectedCallback() {
    const title = this.getAttribute('title') || 'Título';
    const content = this.innerHTML; // Contenido entre las etiquetas
    
    this.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
        <button class="accordion-header w-full text-left px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-between">
          <span>${title}</span>
          <span class="accordion-icon transform transition-transform ${this.isOpen ? 'rotate-180' : ''}">▼</span>
        </button>
        <div class="accordion-content overflow-hidden transition-all duration-300 ${this.isOpen ? 'max-h-96' : 'max-h-0'}">
          <div class="p-6 text-gray-700">
            ${content}
          </div>
        </div>
      </div>
    `;
    
    this.querySelector('.accordion-header').addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      this.connectedCallback(); // Re-render
    });
  }
}

customElements.define('accordion-item', AccordionItem);


// Componente Bonus: Countdown Timer
class CountdownTimer extends HTMLElement {
  constructor() {
    super();
    this.timeLeft = parseInt(this.getAttribute('seconds')) || 60;
  }
  
  connectedCallback() {
    this.render();
    
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.render();
      } else {
        clearInterval(this.interval);
        this.dispatchEvent(new CustomEvent('countdown-complete'));
      }
    }, 1000);
  }
  
  disconnectedCallback() {
    clearInterval(this.interval);
  }
  
  render() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const color = this.timeLeft > 10 ? 'blue' : 'red';
    
    this.innerHTML = `
      <div class="bg-gradient-to-br from-${color}-500 to-${color}-600 text-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-6xl font-bold mb-2">⏱️</div>
        <div class="text-7xl font-mono font-bold">${display}</div>
        <div class="text-${color}-200 mt-2">Tiempo restante</div>
      </div>
    `;
  }
}

customElements.define('countdown-timer', CountdownTimer);


// ═══════════════════════════════════════════════════════════════════════
// Mensajes de consola
// ═══════════════════════════════════════════════════════════════════════
console.log('✅ Solución de Web Components cargada correctamente');
console.log('Componentes disponibles:', [
  'product-card',
  'stat-widget',
  'todo-item',
  'rating-stars',
  'accordion-item (bonus)',
  'countdown-timer (bonus)'
]);