const axios = require('axios').default
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'
const knex = require('./knex')


function getPokemon(id){
    return axios.get(BASE_URL + id)
        .then(pokemon => pokemon)
        .catch(() => {
            console.log('failed to create pokemon with id ' + id)
        })
}

knex('pokemon').pluck('id').then(ids => {
    let pokemon_ids = []
    
    for (i = 1; i < 808; i ++){
        pokemon_ids.push(i)
    }
    
    pokemon_ids = pokemon_ids.filter(id => {
        return ids.includes(id) == false
    })
    
    console.log(pokemon_ids)

    return Promise.all(pokemon_ids.map(id => {
        console.log('Attempting ' + id)
        return getPokemon(id).then(pokemon => {
            let {
                name,
                id,
                base_exp,
                weight,
                abilities,
                sprites,
                stats,
                types,
                order
            } = pokemon.data
            return knex('pokemon').insert({ 
                name, 
                id,
                base_exp,
                weight,
                order,
                abilities: JSON.stringify(abilities),
                sprites: JSON.stringify(sprites),
                stats: JSON.stringify(stats),
                types: JSON.stringify(types),
            }).then(console.log(`Successfully created ${name} with id ${id}`))
            .catch(() => console.log(`Failed to create ${name} with id ${id}`))
        })
    }))
})


    // Promise.all(ids.map(id => {
    //     return getPokemon(id).then(data => knex('pokemon').insert({
    //         name: data.name,
    //         id,
    //         base_exp: data.base_experience,
    //         height: data.height,
    //         weight: data.weight,
    //         abilities: JSON.stringify(data.abilities),
    //         sprites: JSON.stringify(data.sprites),
    //         stats: JSON.stringify(data.stats),
    //         types: JSON.stringify(data.types)
    //     })).catch(console.log('failed to insert ' + id))
    // })).then(() => {
    // }).catch(console.log('error'))