require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const projectRoutes = require('./routes/projectRoutes')
const commentRoutes = require('./routes/commentRoutes')
const app =  express()
const cors = require('cors')

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database Connected"))
.catch((err) => console.log("Database Connection failed error: " ,  err))

app.use(express.json())
app.use(cors())
app.use('/projects' , projectRoutes)
app.use('/comments' , commentRoutes)

app.listen(process.env.PORT , () => {
    console.log("Express Server Running")
})

app.get('/' , (req , res) => {
    res.json({ message: "Express Server Running" })
})