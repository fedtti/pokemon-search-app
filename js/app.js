const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const specialAttack = document.getElementById('special-attack');
const defense = document.getElementById('defense');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const section = document.querySelector('section');
const sprite = document.getElementById('sprite');

window.onload = () => {
  section.style.display = 'none';
}

/**
 * 
 */
const findPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await response.json();
    const { name, id, sprites, stats } = data;

    pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    pokemonId.textContent = `#${id}`;
    sprite.src = sprites.front_default;
    sprite.alt = name;
    weight.textContent = data.weight;
    height.textContent = data.height;
    types.innerHTML = data.types.map(object => `<span>${object.type.name.toUpperCase()}</span>`).join('');
    hp.textContent = stats[0].base_stat;
    attack.textContent = stats[1].base_stat;
    specialAttack.textContent = stats[3].base_stat;
    defense.textContent = stats[2].base_stat;
    specialDefense.textContent = stats[4].base_stat;
    speed.textContent = stats[5].base_stat;
    section.style.display = 'block';
  } catch (error) {
    alert('Pokémon not found.');
  }
};

/**
 * 
 */
const resetSearch = () => {
  pokemonName.textContent = '';
  pokemonId.textContent = '';
  sprite.src = undefined;
  sprite.alt = undefined;
  weight.textContent = '';
  height.textContent = '';
  types.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  specialAttack.textContent = '';
  defense.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
  section.style.display = 'none';
};

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    resetSearch();
    findPokemon();
  }
}, false);

searchButton.addEventListener('click', () => {
  resetSearch();
  findPokemon();
}, false);
