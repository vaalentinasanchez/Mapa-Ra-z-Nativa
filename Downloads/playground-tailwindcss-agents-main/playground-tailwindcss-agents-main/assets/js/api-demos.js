// ================================
// DEMO 1: POKEMON API
// ================================

const pokemonInput = document.getElementById('pokemon-input');
const searchPokemonBtn = document.getElementById('search-pokemon-btn');
const pokemonResult = document.getElementById('pokemon-result');
const quickPokemonButtons = document.querySelectorAll('.quick-pokemon');

// Función para buscar Pokemon
async function buscarPokemon(nombre) {
  // Mostrar loading
  pokemonResult.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mb-4"></div>
      <p class="text-gray-600">Buscando ${nombre}...</p>
    </div>
  `;

  try {
    // Hacer la solicitud a la API
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Pokemon no encontrado (Status: ${response.status})`);
    }

    // Convertir respuesta a JSON
    const data = await response.json();

    // Obtener tipos del Pokemon
    const tipos = data.types.map(t => t.type.name).join(', ');
    
    // Obtener habilidades
    const habilidades = data.abilities.slice(0, 3).map(a => a.ability.name).join(', ');

    // Obtener stats
    const hp = data.stats[0].base_stat;
    const attack = data.stats[1].base_stat;
    const defense = data.stats[2].base_stat;

    // Obtener la mejor imagen disponible
    const imgUrl = data.sprites.other?.['official-artwork']?.front_default 
                   || data.sprites.front_default 
                   || data.sprites.other?.dream_world?.front_default
                   || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

    // Mostrar resultado exitoso
    pokemonResult.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="bg-gradient-to-br from-red-100 to-pink-100 rounded-full p-6 mb-4 shadow-lg">
          <img 
            src="${imgUrl}" 
            alt="${data.name}"
            class="w-32 h-32 object-contain"
            onerror="this.src='https://via.placeholder.com/128?text=Pokemon'"
          >
        </div>
        
        <h3 class="text-2xl font-bold text-gray-800 capitalize mb-2">
          ${data.name}
        </h3>
        
        <span class="inline-block px-4 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold mb-4">
          #${data.id}
        </span>

        <div class="w-full space-y-3">
          <div class="bg-blue-50 rounded-lg p-3">
            <p class="text-sm font-semibold text-blue-800">Tipos:</p>
            <p class="text-blue-600 capitalize">${tipos}</p>
          </div>

          <div class="bg-purple-50 rounded-lg p-3">
            <p class="text-sm font-semibold text-purple-800">Habilidades:</p>
            <p class="text-purple-600 capitalize text-sm">${habilidades}</p>
          </div>

          <div class="bg-green-50 rounded-lg p-3">
            <p class="text-sm font-semibold text-green-800 mb-2">Stats Base:</p>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-green-700">HP:</span>
                <span class="font-bold text-green-900">${hp}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-green-700">Ataque:</span>
                <span class="font-bold text-green-900">${attack}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-green-700">Defensa:</span>
                <span class="font-bold text-green-900">${defense}</span>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 rounded-lg p-3">
            <p class="text-sm font-semibold text-yellow-800">Altura / Peso:</p>
            <p class="text-yellow-700">${data.height / 10}m / ${data.weight / 10}kg</p>
          </div>
        </div>
      </div>
    `;

  } catch (error) {
    // Mostrar error
    pokemonResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">😞</div>
        <h3 class="text-xl font-bold text-red-600 mb-2">¡Oops!</h3>
        <p class="text-gray-700 mb-2">No se pudo encontrar el Pokemon "${nombre}"</p>
        <p class="text-sm text-gray-500">Verifica que el nombre esté bien escrito</p>
        <div class="mt-4 text-xs text-red-600 bg-red-50 p-3 rounded">
          Error: ${error.message}
        </div>
      </div>
    `;
  }
}

// Event listener para el botón de búsqueda
searchPokemonBtn.addEventListener('click', () => {
  const nombre = pokemonInput.value.trim();
  
  if (!nombre) {
    pokemonResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">⚠️</div>
        <p class="text-gray-700">Por favor ingresa el nombre de un Pokemon</p>
      </div>
    `;
    return;
  }
  
  buscarPokemon(nombre);
});

// Event listener para Enter en el input
pokemonInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchPokemonBtn.click();
  }
});

// Event listeners para botones de acceso rápido
quickPokemonButtons.forEach(button => {
  button.addEventListener('click', () => {
    const pokemon = button.getAttribute('data-pokemon');
    pokemonInput.value = pokemon;
    buscarPokemon(pokemon);
  });
});


// ================================
// DEMO 2: WEATHER API
// ================================

const cityInput = document.getElementById('city-input');
const searchWeatherBtn = document.getElementById('search-weather-btn');
const weatherResult = document.getElementById('weather-result');
const quickCityButtons = document.querySelectorAll('.quick-city');

// Función para obtener el emoji del clima según el código WMO
function getWeatherEmoji(weatherCode) {
  const weatherMap = {
    0: '☀️',  // Clear sky
    1: '🌤️', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️',  // Overcast
    45: '🌫️', // Foggy
    48: '🌫️', // Depositing rime fog
    51: '🌦️', // Light drizzle
    53: '🌦️', // Moderate drizzle
    55: '🌧️', // Dense drizzle
    61: '🌧️', // Slight rain
    63: '🌧️', // Moderate rain
    65: '🌧️', // Heavy rain
    71: '🌨️', // Slight snow
    73: '🌨️', // Moderate snow
    75: '❄️',  // Heavy snow
    77: '🌨️', // Snow grains
    80: '🌦️', // Slight rain showers
    81: '🌧️', // Moderate rain showers
    82: '⛈️',  // Violent rain showers
    85: '🌨️', // Slight snow showers
    86: '❄️',  // Heavy snow showers
    95: '⛈️',  // Thunderstorm
    96: '⛈️',  // Thunderstorm with slight hail
    99: '⛈️'   // Thunderstorm with heavy hail
  };
  
  return weatherMap[weatherCode] || '🌡️';
}

// Función para obtener descripción del clima
function getWeatherDescription(weatherCode) {
  const descriptions = {
    0: 'Cielo despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Neblina',
    48: 'Neblina con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna densa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia fuerte',
    71: 'Nevada ligera',
    73: 'Nevada moderada',
    75: 'Nevada fuerte',
    77: 'Granizo',
    80: 'Chubascos ligeros',
    81: 'Chubascos moderados',
    82: 'Chubascos violentos',
    85: 'Chubascos de nieve ligeros',
    86: 'Chubascos de nieve fuertes',
    95: 'Tormenta eléctrica',
    96: 'Tormenta con granizo ligero',
    99: 'Tormenta con granizo fuerte'
  };
  
  return descriptions[weatherCode] || 'Condición desconocida';
}

// Función para obtener clima
async function obtenerClima(ciudad) {
  // Mostrar loading
  weatherResult.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
      <p class="text-gray-600">Consultando clima de ${ciudad}...</p>
    </div>
  `;

  try {
    // Paso 1: Obtener coordenadas de la ciudad usando Geocoding API
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`;
    const geoResponse = await fetch(geoUrl);
    
    if (!geoResponse.ok) {
      throw new Error('Error al buscar la ciudad');
    }
    
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('Ciudad no encontrada');
    }
    
    const { latitude, longitude, name, country } = geoData.results[0];
    
    // Paso 2: Obtener datos del clima usando las coordenadas
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    
    if (!weatherResponse.ok) {
      throw new Error('Error al obtener datos del clima');
    }
    
    const weatherData = await weatherResponse.json();
    const current = weatherData.current_weather;
    
    // Obtener emoji y descripción
    const weatherEmoji = getWeatherEmoji(current.weathercode);
    const weatherDesc = getWeatherDescription(current.weathercode);
    
    // Determinar color según temperatura
    let tempColor = 'blue';
    if (current.temperature > 25) tempColor = 'red';
    else if (current.temperature > 15) tempColor = 'yellow';
    else if (current.temperature > 5) tempColor = 'green';
    
    // Mostrar resultado exitoso
    weatherResult.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="text-8xl mb-4">${weatherEmoji}</div>
        
        <h3 class="text-2xl font-bold text-gray-800 mb-1">${name}</h3>
        <p class="text-sm text-gray-600 mb-4">${country}</p>
        
        <div class="text-6xl font-bold text-${tempColor}-600 mb-2">
          ${current.temperature}°C
        </div>
        
        <p class="text-lg text-gray-700 mb-6 capitalize">${weatherDesc}</p>
        
        <div class="w-full space-y-3">
          <div class="bg-cyan-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-cyan-800 font-semibold">💨 Viento:</span>
            <span class="text-cyan-600 font-bold">${current.windspeed} km/h</span>
          </div>
          
          <div class="bg-blue-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-blue-800 font-semibold">🧭 Dirección:</span>
            <span class="text-blue-600 font-bold">${current.winddirection}°</span>
          </div>
          
          <div class="bg-purple-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-purple-800 font-semibold">🕐 Hora local:</span>
            <span class="text-purple-600 font-bold">${new Date(current.time).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          <div class="bg-green-50 rounded-lg p-3 flex justify-between items-center">
            <span class="text-green-800 font-semibold">📍 Coordenadas:</span>
            <span class="text-green-600 text-sm font-mono">${latitude.toFixed(2)}, ${longitude.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;

  } catch (error) {
    // Mostrar error
    weatherResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">🌧️</div>
        <h3 class="text-xl font-bold text-red-600 mb-2">¡Oops!</h3>
        <p class="text-gray-700 mb-2">No se pudo obtener el clima de "${ciudad}"</p>
        <p class="text-sm text-gray-500">Verifica que el nombre de la ciudad esté correcto</p>
        <div class="mt-4 text-xs text-red-600 bg-red-50 p-3 rounded">
          Error: ${error.message}
        </div>
      </div>
    `;
  }
}

// Event listener para el botón de búsqueda
searchWeatherBtn.addEventListener('click', () => {
  const ciudad = cityInput.value.trim();
  
  if (!ciudad) {
    weatherResult.innerHTML = `
      <div class="text-center py-8">
        <div class="text-6xl mb-4">⚠️</div>
        <p class="text-gray-700">Por favor ingresa el nombre de una ciudad</p>
      </div>
    `;
    return;
  }
  
  obtenerClima(ciudad);
});

// Event listener para Enter en el input
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchWeatherBtn.click();
  }
});

// Event listeners para botones de acceso rápido
quickCityButtons.forEach(button => {
  button.addEventListener('click', () => {
    const city = button.getAttribute('data-city');
    cityInput.value = city;
    obtenerClima(city);
  });
});

// ================================
// EXTRAS: Animaciones y UX
// ================================

// Enfocar input de Pokemon al cargar la página
if (pokemonInput) {
  pokemonInput.focus();
}

console.log('🚀 API Demos cargadas correctamente!');
console.log('💡 Tip: Abre las DevTools (F12) para ver los requests en la pestaña Network');
