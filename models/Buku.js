const mongoose = require('mongoose')
const BukuSchema = mongoose.Schema({
    judul: {
        type: String,
        required: true,
    },
    penerbit: {
        type: String,
        required: true,
    },
    tglterbit:{
        type: String,
        required: true,
    },
    volume:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Buku', BukuSchema)