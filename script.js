const pokemonAPI ="https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonImg = document.querySelector("#pokemon-img");
const pokemonHeight = document.querySelector("#height");
const pokemonWeight = document.querySelector("#weight");
const pokemonTypes = document.querySelector("#types");
const errorMessage = document.querySelector('.error-message');
const hp = document.querySelector('#hp');
const attack = document.querySelector('#attack');
const defense = document.querySelector('#defense');
const specialAttack = document.querySelector('#special-attack');
const specialDefense = document.querySelector('#special-defense');
const speed = document.querySelector('#speed');



const fetchPokemon = async () => {
    const inputValue= searchInput.value.trim().toLowerCase();

    if (!validateInput(inputValue)) {
        return;
    }

    try {
        
        const res = await fetch(`${pokemonAPI}/${inputValue}`);
        if (!res.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await res.json();

        console.log(data);
       pokemonName.textContent = data.name;
       pokemonId.textContent = `#${data.id}`;
       pokemonHeight.textContent = `Height: ${data.height}`;
       pokemonWeight.textContent = `Weight: ${data.weight}`;
       pokemonTypes.innerHTML = '';
        data.types.forEach(type => {
            const typeElement = document.createElement('span');
            typeElement.textContent = type.type.name.toUpperCase();
            pokemonTypes.appendChild(typeElement);
        });

       pokemonImg.innerHTML = `
       <img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">
       `;

       const stats = data.stats;
       hp.textContent = `${stats[0].base_stat}`;
       attack.textContent = `${stats[1].base_stat}`;
       defense.textContent = `${stats[2].base_stat}`;
       specialAttack.textContent = ` ${stats[3].base_stat}`;
       specialDefense.textContent = `${stats[4].base_stat}`;
       speed.textContent = `${stats[5].base_stat}`;

    } catch (err) {
        console.log(err);
        alert('Pokemon not found');
        errorMessage.textContent = 'Pokemon not found';
        errorMessage.style.display = 'block';
        
        // Clear previous results
        pokemonName.textContent = '';
        pokemonId.textContent = '';
        pokemonHeight.textContent = '';
        pokemonWeight.textContent = '';
        pokemonTypes.innerHTML = '';
        pokemonImg.innerHTML = '';

        hp.textContent = '';    
        attack.textContent = '';
        defense.textContent = '';
        specialAttack.textContent = '';
        specialDefense.textContent = '';
        speed.textContent = '';
    }
}
function validateInput(input) {
    if (input === '') {
        errorMessage.textContent = 'Please enter a Pokémon name or ID';
        errorMessage.style.display = 'block';
        return false;
    } else {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        return true;
    }
}

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    fetchPokemon();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        fetchPokemon();
    }
});