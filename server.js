const express = require('express')  //import express
const apiRoutes = require('./routes/api')
const path = require('path')  //tell Express server where dist directory is

const app = express()  //making a new express app

const staticFilePath = path.join(__dirname, 'client', 'dist') //join these together to make a path on computer
const staticFiles = express.static(staticFilePath)  //tell Express that everything in this location is static files to be served
app.use('/', staticFiles) //request to home page, serve static file - the Vue app index.html

app.use(express.json())  //handle json coming in

app.use('/api', apiRoutes)

app.use(function(req, res, next){
    // can't find a matching route
    res.status(404).send('Sorry, not found')
})


//this will handle database errors
app.use(function(err, req, res, next) {
    console.log(err)
    res.status(500).send('Server error')
})


const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})  //start server running


