
const pokemonApi = {}

function convertPokeDetailPokemon(pokemonDetails) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name
    

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokemonApi.getPokeDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(convertPokeDetailPokemon)
}

pokemonApi.getPokemons = (offset = 0, limit = 7) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokemonApi.getPokeDetail))
        .then((detail) => Promise.all(detail))
        .then((pokemonDetails) => pokemonDetails)
}

