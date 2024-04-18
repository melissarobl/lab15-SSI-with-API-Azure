const express = require('express')
const database = require('../models/index') //will require the index.js file from this directory
const Student = database.Student //the student model

const router = express.Router()  //create Router

router.get('/students', function(req, res, next) {  //create a route to get all students
    //query database, geta ll rows from DB
    //convert to JSON form
    //available in the then function
    Student.findAll( { order: ['name'] } ).then(students => {
        return res.json(students)
    })  // talk to database
        //students are student objects
})

//create a route that allows us to add data to a DB (POST request)
router.post('/students', function(req, res, next) {
    const newStudent = req.body  //whatever data the client sends about the new student
    console.log(newStudent)
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')  //response returned if successful
    }).catch( err => {
       if ( err instanceof database.Sequelize.ValidationError) {
           const messages = err.errors.map( e => e.message ) //for every error, let's get that error message //errors is an array
           return res.status(400).json(messages) //400 means bad request - client is sending a request the server can't fulfill
       } else {
           //some other error?
           next(err)  //control goes back to server.js
       }
    })
})

router.patch('/students/:id', function(req, res, next){
    //matches requests to /students/1
    // students/2
    // students/100 (Or whatever number)
    // id value stored in data called req.params
    // stores any placeholders in the URL

    const studentID = req.params.id // id of student in question will be known
    const updatedStudent = req.body //updated data about this student
    console.log(updatedStudent)
    Student.update( updatedStudent, { where: { id: studentID } }).then( ( result ) => {

        const rowsModified = result[0]
        //if 1 row was changed, we found the student and it was updated
        if(rowsModified === 1) {
            return res.send('OK')  //status is 200 by default
        }
        // student ID that doesn't exist
        else {
            // if 0 rows were updated, student was not found
           return res.status(404).send('Student not Found')
        }


    }).catch( err => { // database error - can't connect or DB reports error
        // invalid data in the updatedStudent - e.g. no name
        if ( err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message ) //for every error, let's get that error message //errors is an array
            return res.status(400).json(messages) //400 means bad request - client is sending a request the server can't fulfill
        } else {
            //some other error? (such as can't connect to DB)
            next(err)  //control goes back to server.js
        }
        next (err)
    })  //only where student ID matches the ID from the URL above
    // what kind of errors could there be?

})

router.delete('/students/:id', function(req, res, next){
    // delete request to /api/student/4 will delete student with id 4
    const studentID = req.params.id //we need to know what ID is
    Student.destroy( { where: { id: studentID } } ).then( (rowsDeleted) => {
        if (rowsDeleted ===1) {
            return res.send('Student deleted')
        } else { // 0 rows deleted - student with this id is not in the database
            return res.status(404).send('Student not found')
        }
        return res.send('Student deleted')
    }).catch( error => {
        return next(err)
    })  //remove line where studentID noted is found
})

module.exports = router