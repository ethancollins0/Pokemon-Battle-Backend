
exports.up = function(knex) {
    return knex.schema.createTable('pokemon', (t) => {
        t.integer('id')
        t.string('name')
        t.integer('base_exp')
        t.integer('height')
        t.integer('weight')
        t.integer('order')
        t.json('abilities')
        t.json('sprites')
        t.json('stats')
        t.json('types')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pokemon')
};
