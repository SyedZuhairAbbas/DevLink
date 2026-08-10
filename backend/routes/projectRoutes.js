const express =  require('express')
const router = express.Router()
const Project = require('../models/Project')


// getting all the  projects

router.get('/'  , async (req , res) => {

    try{

        const project = await Project.find()
        
        if(project.length === 0){
            return  res.status(404).json({message: "No Projects Yet"})
        }

        res.json(project)

    }catch(err){
        res.status(500).json({error: err.messgae})
    }
})

// getting Project by  id

router.get('/:id' , async (req , res)  => {

    try{
        const project =  await Project.findById(req.params.id)

        if(!project){
            return res.status(404).json({message: "No project Found"})
        }

        res.json(project)

    }catch(err){
        res.status(500).json({error: err.message})
    }
})

//  Posting  Projects

router.post('/' , async (req , res) => {

    try{
        const newProject = await Project.create({
            title: req.body.title,
            description: req.body.description,
            techStack: req.body.techStack,
            githubUrl: req.body.githubUrl,
            liveUrl: req.body.liveUrl,
            imageUrl: req.body.imageUrl,
            author: req.body.author
        })

        res.status(201).json({message: "Project Created" , project: newProject})

    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({error: err.message})
        }

        res.status(500).json({error: err.message})
    }
})

// Putting Project Route

router.put('/:id' , async (req , res) => {

    try{

        const updates = {
            title: req.body.title,
            description: req.body.description,
            techStack: req.body.techStack,
            githubUrl: req.body.githubUrl,
            liveUrl: req.body.liveUrl,
            imageUrl: req.body.imageUrl,
            author: req.body.author,
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id , updates , {new: true , runValidators: true})

        if(!updatedProject){
            return res.status(404).json({message: "No project Found or  updated"})
        }

        res.json({message: "Project Updated" , project: updatedProject})

    }catch(err) {
        if(err.name === "ValidationError"){
            return res.status(400).json({error: err.message})
        }

        res.status(500).json({error: err.message})
    }
})

// Deleting Project Route

router.delete('/:id' , async (req , res) => {

    try{

        const deletedProject = await Project.findByIdAndDelete(req.params.id)

        if(!deletedProject){
            return  res.status(404).json({message: "No project found"})
        }

        res.json({message: "Project Deleted"})

    } catch(err){
        res.status(500).json({error: err.message})
    }
})


module.exports = router