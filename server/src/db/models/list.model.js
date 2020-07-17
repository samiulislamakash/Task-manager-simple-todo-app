const mongoose = require('mongoose')

const ListSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _userid:{
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const List = mongoose.model('lists', ListSchema)

module.exports = List
