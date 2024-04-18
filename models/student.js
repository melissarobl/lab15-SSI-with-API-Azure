module.exports = (sequelize, DataTypes) => {
    //define model
    const Student = sequelize.define('Student', {
    //define columns in the database - give them a name and type
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }
            // to do future = check for aa1234aa format
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false,

        }
    })
// Go create the table for this student in the database (or update table)
    Student.sync( { force: true } ).then( () => {
        console.log("Synced student table")
    })  // force: true means update every time the app restarts
        //.then returns a promise

    return Student
}