// ================================
// DESAFÍO 1: RICK & MORTY API - SOLUCIÓN
// ================================

const characterInput = document.getElementById('character-input');
const searchCharacterBtn = document.getElementById('search-character-btn');
const characterResult = document.getElementById('character-result');

async function buscarPersonaje(nombre) {
  // Mostrar loading
  characterResult.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mb-4"></div>
      <p class="text-gray-600">Buscando ${nombre}...</p>
    </div>
  `;

  try {
    // Hacer la petición a la API
    const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nombre)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Verificar si se encontraron resultados
    if (!data.results || data.results.length === 0) {
      throw new Error('Personaje no encontrado');
    }
    
    // Obtener el primer resultado
    const personaje = data.results[0];
    
    // Determinar color según el estado
    let estadoColor = 'gray';
    if (personaje.status === 'Alive') estadoColor = 'green';
    else if (personaje.status === 'Dead') estadoColor = 'red';
    
    // Mostrar el resultado
    characterResult.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full p-4 mb-4 shadow-lg">
          <img 
            src="${personaje.image}" 
            alt="${personaje.name}"
            class="w-40 h-40 rounded-full object-cover"
          >
        </div>
        
        <h3 class="text-2xl font-bold text-gray-800 mb-2">${personaje.name}</h3>
        
        <div class="w-full space-y-3 mt-4">
          <div class="bg-${estadoColor}-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-${estadoColor}-800 font-semibold">Estado:</span>
            <span class="text-${estadoColor}-600 font-bold">${personaje.status}</span>
          </div>
          
          <div class="bg-blue-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-blue-800 font-semibold">Especie:</span>
            <span class="text-blue-600 font-bold">${personaje.species}</span>
          </div>
          
          <div class="bg-purple-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-purple-800 font-semibold">Género:</span>
            <span class="text-purple-600 font-bold">${personaje.gender}</span>
          </div>
          
          <div class="bg-orange-50 rounded-lg p-3">
            <p class="text-orange-800 font-semibold mb-1">Origen:</p>
            <p class="text-orange-600 text-sm">${personaje.origin.name}</p>
          </div>
          
          <div class="bg-pink-50 rounded-lg p-3">
            <p class="text-pink-800 font-semibold mb-1">Última ubicación:</p>
            <p class="text-pink-600 text-sm">${personaje.location.name}</p>
          </div>
        </div>
      </div>
    `;

  } catch (error) {
    // Mostrar error
    characterResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">😞</div>
        <h3 class="text-xl font-bold text-red-600 mb-2">¡Oops!</h3>
        <p class="text-gray-700 mb-2">No se encontró el personaje "${nombre}"</p>
        <p class="text-sm text-gray-500">Verifica que el nombre esté bien escrito</p>
        <div class="mt-4 text-xs text-red-600 bg-red-50 p-3 rounded">
          Error: ${error.message}
        </div>
      </div>
    `;
  }
}

// Event listeners
searchCharacterBtn.addEventListener('click', () => {
  const nombre = characterInput.value.trim();
  if (nombre) {
    buscarPersonaje(nombre);
  } else {
    characterResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">⚠️</div>
        <p class="text-gray-700">Por favor ingresa el nombre de un personaje</p>
      </div>
    `;
  }
});

characterInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchCharacterBtn.click();
  }
});


// ================================
// DESAFÍO 2: RANDOM USER GENERATOR - SOLUCIÓN
// ================================

const generateUserBtn = document.getElementById('generate-user-btn');
const userResult = document.getElementById('user-result');

async function generarUsuario() {
  // Mostrar loading
  userResult.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
      <p class="text-gray-600">Generando usuario...</p>
    </div>
  `;

  try {
    // Hacer la petición a la API
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    
    // Obtener el primer usuario
    const user = data.results[0];
    
    // Extraer los datos necesarios
    const foto = user.picture.large;
    const nombreCompleto = `${user.name.first} ${user.name.last}`;
    const email = user.email;
    const pais = user.location.country;
    const edad = user.dob.age;
    const telefono = user.phone;
    const ciudad = user.location.city;
    
    // Mostrar el resultado
    userResult.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-4 mb-4 shadow-lg">
          <img 
            src="${foto}" 
            alt="${nombreCompleto}"
            class="w-32 h-32 rounded-full object-cover"
          >
        </div>
        
        <h3 class="text-2xl font-bold text-gray-800 mb-1">${nombreCompleto}</h3>
        <p class="text-sm text-gray-600 mb-4">${edad} años</p>
        
        <div class="w-full space-y-3">
          <div class="bg-blue-50 rounded-lg p-3">
            <p class="text-blue-800 font-semibold mb-1">📧 Email:</p>
            <p class="text-blue-600 text-sm break-all">${email}</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-green-800 font-semibold">🌍 País:</span>
            <span class="text-green-600 font-bold">${pais}</span>
          </div>
          
          <div class="bg-purple-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-purple-800 font-semibold">🏙️ Ciudad:</span>
            <span class="text-purple-600 font-bold">${ciudad}</span>
          </div>
          
          <div class="bg-orange-50 rounded-lg p-3">
            <p class="text-orange-800 font-semibold mb-1">📞 Teléfono:</p>
            <p class="text-orange-600">${telefono}</p>
          </div>
        </div>
        
        <button 
          onclick="generarUsuario()" 
          class="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
          🔄 Generar Otro
        </button>
      </div>
    `;

  } catch (error) {
    userResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">😞</div>
        <h3 class="text-xl font-bold text-red-600 mb-2">Error</h3>
        <p class="text-gray-700">No se pudo generar el usuario</p>
        <p class="text-sm text-red-600 mt-2">${error.message}</p>
      </div>
    `;
  }
}

// Event listener
generateUserBtn.addEventListener('click', generarUsuario);


// ================================
// DESAFÍO 3: GIPHY API - SOLUCIÓN
// ================================

const gifInput = document.getElementById('gif-input');
const searchGifsBtn = document.getElementById('search-gifs-btn');
const gifsResult = document.getElementById('gifs-result');

async function buscarGifs(query) {
  // Mostrar loading
  gifsResult.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mb-4"></div>
      <p class="text-gray-600">Buscando GIFs de "${query}"...</p>
    </div>
  `;

  try {
    // Configurar la petición
    const API_KEY = 'CW8uFtUiFD2vPvGBEtKSS7fInBfRtWtj';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=6`;
    
    // Hacer la petición
    const response = await fetch(url);
    const data = await response.json();
    
    // Verificar si hay resultados
    if (!data.data || data.data.length === 0) {
      throw new Error('No se encontraron GIFs');
    }
    
    // Generar el HTML para mostrar los GIFs
    let html = '<div class="grid grid-cols-2 md:grid-cols-3 gap-4">';
    
    data.data.forEach(gif => {
      html += `
        <div class="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <img 
            src="${gif.images.fixed_height.url}" 
            alt="${gif.title}"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          >
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <p class="text-white text-xs font-semibold truncate">${gif.title}</p>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    html += `
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Mostrando ${data.data.length} GIFs de "${query}"
        </p>
      </div>
    `;
    
    gifsResult.innerHTML = html;

  } catch (error) {
    gifsResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">😞</div>
        <h3 class="text-xl font-bold text-red-600 mb-2">¡Oops!</h3>
        <p class="text-gray-700 mb-2">No se encontraron GIFs para "${query}"</p>
        <p class="text-sm text-gray-500">Intenta con otra búsqueda</p>
        <div class="mt-4 text-xs text-red-600 bg-red-50 p-3 rounded">
          Error: ${error.message}
        </div>
      </div>
    `;
  }
}

// Event listeners
searchGifsBtn.addEventListener('click', () => {
  const query = gifInput.value.trim();
  if (query) {
    buscarGifs(query);
  } else {
    gifsResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">⚠️</div>
        <p class="text-gray-700">Por favor ingresa algo para buscar</p>
      </div>
    `;
  }
});

gifInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchGifsBtn.click();
  }
});


console.log('✅ Solución de API cargada correctamente!');
console.log('💡 Revisa el código para entender cómo funciona');
