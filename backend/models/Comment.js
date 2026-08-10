const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    text:  {
        type:  String ,
        required: true
    },
    author: {
        type:  String ,
        required: true
    },
    project:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Project'
    }
})

const Comment =  mongoose.model('Comment' , commentSchema)

module.exports = Comment