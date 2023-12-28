const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
//  Limitador de gerações - 151 pokemonns / 1 Geração
const maxRecords = 1080
const limit = 20
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `       
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <!-- <span class="name">${pokemon.name}</span> -->
        
            <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>

            <div class="container">
            <div class="card ${pokemon.type}">
                <div class="img">
                    <span>${pokemon.name}</span>
                </div>

                <div class="content ">
                ${pokemon.pokemonStats.map((stat) =>
            `<div class="stats"><div> <p class="desc">${stat[0]}</p> </div> <div><p class="desc">${stat[1]}</p> </div></div>`).join('')}
                </div>
                <div class="arrow">
                    <span>&#8673;</span>
                </div>
            </div>
        </div>
        </li>`).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})