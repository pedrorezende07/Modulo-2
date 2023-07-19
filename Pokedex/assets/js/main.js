function convertPokemonTypesToLi(pokemonTypes) { //no json dos pokemons, o tipo sao uma lista, entao aqui detalho cada tipo criando li de acordo com cada tipo
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}


function convertPokemonToLi(pokemon){ //funcao que le cada pokemon e detalha na li
    return `
    <li class="pokemon">
                    <span class="number">#${pokemon.order}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${convertPokemonTypesToLi(pokemon.types).join('')}
                        </ol>
                        <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                    </div>
                </li>
    `
}
const pokemonList = document.getElementById('pokemonList') //variavel que fica responsavel por pegar o id do html

pokeApi.getPokemons().then((pokemons = []) => { //retorna o json do api
    
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    //nova lista mapeando os pokemons, substituindo o laco for para percorrer o array do json depois com o join faz a juncao dos resultados da lista de html dps receber faz uma juncao com o pokemonList, que eh a variavel responsavel pelo id no html e renderiza toda lista criado
    })













/*
fetch(url)
    .then(function (response){
        return response.json();
    })
    /* function modelo tradicional poderia se tornar uma arrow function
    .then( (response) =>{
        return response.json();
    })

    e por ter uma linha poderia ser ainda mais simples
    .then(function (response) => return response.json());


    .then((jsonBody) => console.log(jsonBody))
    /* array function para diminuir a verbosidade
    .then(funcntion(jsonBody){
        console.log(jsonBody));
    } 

     
    .catch((error) => console.error(error));
    */