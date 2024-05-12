const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    name: {
        type: String
    },

    capital: {
        type: String
    },

    continent: {
        type: String
    },
    language: {
        type: String
    },
    population: {
        type: Number
    }
},
)

module.exports = mongoose.model('Country', countrySchema)