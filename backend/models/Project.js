const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    title: {
        type: String ,
        required: true
    },
    description: {
        type: String ,
        required: true
    },
    techStack: {
        type: [String]
    },
    githubUrl: {
        type:  String
    },
    liveUrl: {
        type:  String
    },
    imageUrl: {
        type: String
    },
    author: {
        type:  String
    },
    likes: {
        type: Number ,
        default: 0
    },
    createdAt: {
        type: Date ,
        default: Date.now
    }
})

const Project =  mongoose.model('Project' , projectSchema)

module.exports = Project