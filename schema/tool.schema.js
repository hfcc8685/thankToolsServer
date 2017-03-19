const Mongoose = require('mongoose')

const toolSchema = Mongoose.Schema({
    name: String,
})

module.exports = Mongoose.model('Tool', toolSchema)
