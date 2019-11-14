const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db_queries')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/pokemon', (req, res) => {
    db.getAllPokemon()
        .then(pokemon => res.json(pokemon))
        .catch(() => res.json(null))
})

app.get('/pokemon/:id', (req, res) => {
    db.getPokemon(req.params.id)
        .then(pokemon => {
            pokemon
                ? res.json(pokemon)
                : res.json(null)       
        })
})

app.listen(3000, () => {
    console.log('listening...')
})