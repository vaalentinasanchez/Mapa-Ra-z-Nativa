// ================================
// DESAFÍO 1: RICK & MORTY API
// ================================

const characterInput = document.getElementById('character-input');
const searchCharacterBtn = document.getElementById('search-character-btn');
const characterResult = document.getElementById('character-result');

async function buscarPersonaje(nombre) {
  // TODO: Mostrar loading
  characterResult.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mb-4"></div>
      <p class="text-gray-600">Buscando ${nombre}...</p>
    </div>
  `;

  try {
    // TODO: Completar la URL de la API
    // API: https://rickandmortyapi.com/api/character/?name=___NOMBRE___
    const url = `___COMPLETA_AQUI___`;
    
    // TODO: Hacer la petición con fetch
    const response = ___COMPLETA_AQUI___;
    
    // TODO: Convertir la respuesta a JSON
    const data = ___COMPLETA_AQUI___;
    
    // TODO: Verificar si se encontraron resultados
    if (___COMPLETA_AQUI___) {
      throw new Error('Personaje no encontrado');
    }
    
    // TODO: Obtener el primer resultado
    const personaje = ___COMPLETA_AQUI___;
    
    // TODO: Mostrar el resultado en el HTML
    // Tip: personaje.name, personaje.status, personaje.species, personaje.image
    characterResult.innerHTML = `
      ___COMPLETA_AQUI___
    `;

  } catch (error) {
    // TODO: Mostrar error
    characterResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">😞</div>
        <p class="text-gray-700">No se encontró el personaje "${nombre}"</p>
        <p class="text-sm text-red-600 mt-2">${error.message}</p>
      </div>
    `;
  }
}

// Event listeners
searchCharacterBtn.addEventListener('click', () => {
  const nombre = characterInput.value.trim();
  if (nombre) {
    buscarPersonaje(nombre);
  }
});

characterInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchCharacterBtn.click();
  }
});


// ================================
// DESAFÍO 2: RANDOM USER GENERATOR
// ================================

const generateUserBtn = document.getElementById('generate-user-btn');
const userResult = document.getElementById('user-result');

async function generarUsuario() {
  // TODO: Mostrar loading
  userResult.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
      <p class="text-gray-600">Generando usuario...</p>
    </div>
  `;

  try {
    // TODO: Hacer la petición a la API
    // API: https://randomuser.me/api/
    const response = ___COMPLETA_AQUI___;
    const data = ___COMPLETA_AQUI___;
    
    // TODO: Obtener el primer usuario
    const user = ___COMPLETA_AQUI___;
    
    // TODO: Extraer los datos necesarios
    // Tip: user.picture.large, user.name.first, user.name.last, user.email, user.location.country, user.dob.age
    const foto = ___COMPLETA_AQUI___;
    const nombreCompleto = ___COMPLETA_AQUI___;
    const email = ___COMPLETA_AQUI___;
    const pais = ___COMPLETA_AQUI___;
    const edad = ___COMPLETA_AQUI___;
    
    // TODO: Mostrar el resultado
    userResult.innerHTML = `
      ___COMPLETA_AQUI___
    `;

  } catch (error) {
    userResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">😞</div>
        <p class="text-gray-700">Error al generar usuario</p>
        <p class="text-sm text-red-600 mt-2">${error.message}</p>
      </div>
    `;
  }
}

// Event listener
generateUserBtn.addEventListener('click', generarUsuario);


// ================================
// DESAFÍO 3: GIPHY API
// ================================

const gifInput = document.getElementById('gif-input');
const searchGifsBtn = document.getElementById('search-gifs-btn');
const gifsResult = document.getElementById('gifs-result');

async function buscarGifs(query) {
  // TODO: Mostrar loading
  gifsResult.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mb-4"></div>
      <p class="text-gray-600">Buscando GIFs de "${query}"...</p>
    </div>
  `;

  try {
    // TODO: Completar la URL con la API Key
    // API: https://api.giphy.com/v1/gifs/search
    // API Key: CW8uFtUiFD2vPvGBEtKSS7fInBfRtWtj
    // Parámetros: api_key, q (query), limit (6)
    const API_KEY = '___COMPLETA_AQUI___';
    const url = `___COMPLETA_AQUI___`;
    
    // TODO: Hacer la petición
    const response = ___COMPLETA_AQUI___;
    const data = ___COMPLETA_AQUI___;
    
    // TODO: Verificar si hay resultados
    if (___COMPLETA_AQUI___) {
      throw new Error('No se encontraron GIFs');
    }
    
    // TODO: Generar el HTML para mostrar los GIFs en una grilla
    // Tip: usa data.data para acceder al array de GIFs
    // Cada GIF tiene: images.fixed_height.url y title
    let html = '<div class="grid grid-cols-2 md:grid-cols-3 gap-4">';
    
    // TODO: Hacer un loop por los GIFs y agregar cada uno al HTML
    ___COMPLETA_AQUI___
    
    html += '</div>';
    gifsResult.innerHTML = html;

  } catch (error) {
    gifsResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">😞</div>
        <p class="text-gray-700">No se encontraron GIFs</p>
        <p class="text-sm text-red-600 mt-2">${error.message}</p>
      </div>
    `;
  }
}

// Event listeners
searchGifsBtn.addEventListener('click', () => {
  const query = gifInput.value.trim();
  if (query) {
    buscarGifs(query);
  }
});

gifInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchGifsBtn.click();
  }
});


console.log('💡 ¡Completa las funciones para que los ejercicios funcionen!');
console.log('🔍 Busca los ___COMPLETA_AQUI___ en el código');
