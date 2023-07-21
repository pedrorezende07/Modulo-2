// objeto de manipulacao da api do pokemon

const pokeApi = {}

pokeApi.getPokemons = (offset = 0, limit = 8) => { //arrow function com parametros e default, caso nao recebar nos parametros
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
        .then((response) => {return response.json()}) //abri a api e transofrma o body em um json
        .then((jsonBody) => jsonBody.results) //pega o json e entra na area de resultados
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeando todos os url do primeiro json
        .then((detailRequests) => Promise.all(detailRequests)) //promise.all aguardando todos a leituras de url
        .then((pokemonsDetails) => pokemonsDetails) //e retornando ao getPokemons os detalhes dos pokemons
        
        .catch((error) => console.error(error))
}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) //recebe o body do primeiro json e mapea todas as url
        .then(convertPokeApiDetailToPokemon)
}