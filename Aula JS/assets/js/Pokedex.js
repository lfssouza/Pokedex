const buttonMorePokemon = document.getElementById('morePokemon');
const pokemonList = document.getElementById('listPokemons');

const max = 386;
const limit = 5;
let offset = 0;

function loadPokemon(offset, limit) {
    pokemonApi.getPokemons(offset, limit).then((pokemons = []) => {
        const HTML = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number_pokemon">#${pokemon.number}</span>
                <span class="name_pokemon">${pokemon.name}</span>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}" />
                </div>
                <div class="button">
                <a href="PokemonStats.html"><button class="buttonGetPokemon" data-pokemon-number="${pokemon.number}">Ver Detalhes</button></a>
                </div>           
                </li>
        `).join('');
        pokemonList.innerHTML += HTML;

        const buttons = document.querySelectorAll('.buttonGetPokemon');
        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const pokemonNumber = event.target.getAttribute('data-pokemon-number');
                const pokemonsNumber = pokemonNumber - 1 
                localStorage.setItem('pokemonNumber', pokemonsNumber);
            });
        });
    });
}

loadPokemon(offset, limit);

buttonMorePokemon.addEventListener('click', () => {
    offset += limit;
    const nextPage = offset + limit;

    if (nextPage >= max) {
        const limitItems = max - offset;
        loadPokemon(offset, limitItems);
        buttonMorePokemon.parentElement.removeChild(buttonMorePokemon);
    } else {
        loadPokemon(offset, limit);
    }
});
