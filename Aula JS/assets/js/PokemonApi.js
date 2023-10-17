const api = {}

function pokeDetails (pokeDetail){
    const poke = new Pkm()

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    poke.types = types
    poke.type = type

    poke.number = pokeDetail.id
    poke.name = pokeDetail.name

    poke.photo = pokeDetail.sprites.other.dream_world.front_default

    const statsname = pokeDetail.stats.map((statBaseName) => statBaseName.stat.name)
    const[statname] = statsname

    poke.statsname = statsname
    poke.statname = statname

    const stats = pokeDetail.stats.map((baseStat) => baseStat.base_stat)
    const[stat] = stats

    poke.stats = stats
    poke.stat = stat

    return poke
}

api.getDetails = (poke) => {
    return fetch(poke.url).then((response) => response.json()).then(pokeDetails)
}

api.getPoke = (offset = 0) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=1`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pkms) => pkms.map(api.getDetails))
        .then((detail) => Promise.all(detail))
        .then((pokeDetail) => pokeDetail)
}