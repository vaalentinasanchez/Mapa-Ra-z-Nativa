// ═══════════════════════════════════════════════════════════════════════
// 🧩 EJERCICIO: WEB COMPONENTS
// ═══════════════════════════════════════════════════════════════════════
// Completa los componentes siguiendo las instrucciones

// ───────────────────────────────────────────────────────────────────────
// COMPONENTE 1: Product Card
// ───────────────────────────────────────────────────────────────────────
// Debe mostrar: imagen (emoji), nombre, precio y botón de compra

class ___COMPLETA_AQUI___ extends HTMLElement {
  connectedCallback() {
    const name = ___COMPLETA_AQUI___;  // Obtener atributo 'name'
    const price = ___COMPLETA_AQUI___; // Obtener atributo 'price'
    const image = ___COMPLETA_AQUI___; // Obtener atributo 'image'
    
    this.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <!-- COMPLETA: Agrega el HTML para mostrar imagen, nombre, precio y botón -->
        
      </div>
    `;
  }
}

customElements.define('product-card', ___COMPLETA_AQUI___);


// ───────────────────────────────────────────────────────────────────────
// COMPONENTE 2: Stat Widget
// ───────────────────────────────────────────────────────────────────────
// Debe mostrar: ícono, etiqueta, valor y usar el color especificado

class StatWidget extends HTMLElement {
  ___COMPLETA_AQUI___
  // Completa el método connectedCallback()
  // Obtén los atributos: label, value, icon, color
  // Renderiza un widget con estos datos
}

customElements.define('stat-widget', StatWidget);


// ───────────────────────────────────────────────────────────────────────
// COMPONENTE 3: Todo Item (Interactivo)
// ───────────────────────────────────────────────────────────────────────
// Debe permitir marcar/desmarcar como completado al hacer click

class TodoItem extends HTMLElement {
  constructor() {
    ___COMPLETA_AQUI___ // No olvides llamar a super()
    this.completed = false;
  }
  
  connectedCallback() {
    this.render();
    
    // COMPLETA: Agrega un event listener que alterne this.completed
    // y vuelva a renderizar
    ___COMPLETA_AQUI___
  }
  
  render() {
    const text = this.getAttribute('text');
    const checkIcon = this.completed ? '✅' : '⬜';
    const textClass = this.completed ? 'line-through text-gray-400' : 'text-gray-800';
    
    this.innerHTML = `
      <div class="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${checkIcon}</span>
          <span class="flex-1 ${textClass}">${text}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);


// ───────────────────────────────────────────────────────────────────────
// COMPONENTE 4: Rating Stars
// ───────────────────────────────────────────────────────────────────────
// Debe mostrar estrellas llenas y vacías según el rating

class RatingStars extends HTMLElement {
  connectedCallback() {
    const rating = parseInt(___COMPLETA_AQUI___) || 0;  // Obtener 'rating'
    const max = parseInt(___COMPLETA_AQUI___) || 5;      // Obtener 'max'
    
    let stars = '';
    
    // COMPLETA: Crea un loop que genere las estrellas
    // Usa ⭐ para estrellas llenas y ☆ para vacías
    ___COMPLETA_AQUI___
    
    this.innerHTML = `
      <div class="flex gap-1 text-2xl">
        ${stars}
      </div>
    `;
  }
}

customElements.define('rating-stars', RatingStars);


// ═══════════════════════════════════════════════════════════════════════
// Mensaje de consola
// ═══════════════════════════════════════════════════════════════════════
console.log('📝 Ejercicio de Web Components cargado');
console.log('💡 Completa los componentes para ver los resultados');