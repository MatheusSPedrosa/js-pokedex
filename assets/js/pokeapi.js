const pokeApi = {}

pokeApi.getpokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetails)
}

function convertPokeApiDetails(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const pokemonStats = pokeDetail.stats.map((pokeStat) => {
        return [pokeStat.stat.name, pokeStat.base_stat]
    })
    pokemon.pokemonStats = pokemonStats

    return pokemon
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getpokemonDetail))
        .then((detailRquest) => Promise.all(detailRquest))
        .then((pokemonsDetails) => pokemonsDetails)
}