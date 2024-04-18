const { Sequelize, DataTypes } = require('sequelize')  // import Sequelize and DataTypes
const configJSON = require('../config.json')
const createStudentModel = require('./student.js') //function defined in student.js

const env = process.env.NODE_ENV || 'development'
// look for an environment variable (NODE_ENV) and read its value
// environment variables are set for your whole computer (or for a server)
//  any application running on this computer (or server) can read these environment variables
//  at Azure we'll create an environment variable for your server called NODE_ENV and set it to "production"
// this set up lets same code connect to two different databases
//if there is not a NODE_ENV set, like on your computer, we'll use the value 'development'

const config = configJSON[env] //read configuration object for 'development' or 'production' for environment we have identified (value of env)

const sequelize = new Sequelize(config) //DB config

const database = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

const studentModel = createStudentModel(sequelize, DataTypes)  //create studentModel
const studentModelName = studentModel.name //'Student'
database[studentModelName] = studentModel

module.exports = database  //export database once it has been set up

