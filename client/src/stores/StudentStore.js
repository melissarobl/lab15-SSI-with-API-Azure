import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import{ mande } from 'mande'

const studentAPI =  mande('api/students') //create an object that can make API calls

export const useStudentStore = defineStore('students', () => {

    const sortedStudents = ref([])  //expected to be an array

    const mostRecentStudent = ref( {} ) //empty object

    const addNewStudentErrors = ref([])

    function getAllStudents() {
        //make an API request to get all students and save them in the store = studentList (reactive data above)
        studentAPI.get().then( students => { //students is the JSON response from the API
        sortedStudents.value = students
        }).catch( err => {
            console.log(err)
        })
    }

    function addNewStudent(student) {
        // make API call to add new student
        // call getAllStudents to re-request list of student from API server
        studentAPI.post(student).then( () => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }

    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        }).catch( err => {
            console.log(err)
        })
}

function arrivedOrLeft(student) {
    const editStudentAPI = mande(`/api/students/${student.id}`)
    editStudentAPI.patch(student).then( () => {
        getAllStudents() //changes made in database. Make another request to update the data with the latest data from the server
    })  .catch( err => {
        console.log(err)
    })
}

const studentCount = computed( () => {
    return sortedStudents.value.length
})


    return {

        //reactive data
        mostRecentStudent,
        sortedStudents,
        addNewStudentErrors,

        //functions
        getAllStudents,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        //computed properties
        studentCount,


    }
})
// whatever we return from here will be what our store is going to use
