const knex = require('./knex')



getAllPokemon = () => {
    return knex.select('name', 'order', 'id', 'sprites').from('pokemon')
}

getPokemon = (id) => {
    return knex('pokemon').where({ id })
}

module.exports = {
    getAllPokemon,
    getPokemon,
}
