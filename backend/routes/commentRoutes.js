const express =  require('express')
const router = express.Router()
const Comment = require('../models/Comment')


// getting all the  Comment

router.get('/'  , async (req , res) => {

    try{

        const comment = await Comment.find()
        
        if(comment.length === 0){
            return  res.status(404).json({message: "No Comments Yet"})
        }

        res.json(comment)

    }catch(err){
        res.status(500).json({error: err.messgae})
    }
})

// getting Comment by  id

router.get('/:id' , async (req , res)  => {

    try{
        const comment =  await Comment.findById(req.params.id).populate('project')

        if(!comment){
            return res.status(404).json({message: "No comments Found"})
        }

        res.json(comment)

    }catch(err){
        res.status(500).json({error: err.message})
    }
})

//  Posting  Comment

router.post('/' , async (req , res) => {

    try{
        const newComment = await Comment.create({
            text: req.body.text,
            author: req.body.author,
            project: req.body.project
        })

        res.status(201).json({message: "Comment Posted" , comment: newComment})

    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({error: err.message})
        }

        res.status(500).json({error: err.message})
    }
})

// Putting Comment Route

router.put('/:id' , async (req , res) => {

    try{

        const updates = {
            text: req.body.text
        }

        const updatedComment = await Comment.findByIdAndUpdate(req.params.id , updates , {new: true , runValidators: true})

        if(!updatedComment){
            return res.status(404).json({message: "No Comment Found or  updated"})
        }

        res.json({message: "Comment Updated" , project: updatedComment})

    }catch(err) {
        if(err.name === "ValidationError"){
            return res.status(400).json({error: err.message})
        }

        res.status(500).json({error: err.message})
    }
})

// Deleting Comment Route

router.delete('/:id' , async (req , res) => {

    try{

        const deletedComment = await Comment.findByIdAndDelete(req.params.id)

        if(!deletedComment){
            return  res.status(404).json({message: "No Comment found"})
        }

        res.json({message: "Comment Deleted"})

    } catch(err){
        res.status(500).json({error: err.message})
    }
})


module.exports = router