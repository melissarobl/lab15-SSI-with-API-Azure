<script setup>

import {ref, watch} from 'vue'

import { useStudentStore } from '../stores/StudentStore.js'
import {storeToRefs} from "pinia";

const studentStore = useStudentStore()

const newStudentName = ref('')
const newStarID = ref('')

const formErrors = ref([])

const { addNewStudentErrors } = storeToRefs(studentStore)  //track data from storeToRefs

watch( addNewStudentErrors, () => { //every time this changes, the app will do something. Function is then called
  if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {  //if there is more than 0 errors
      alert(addNewStudentErrors.value.join('\n')) //show the errors to the user in a list
  }
} )

function addStudent() {  //set up for new student being added

          formErrors.value = []  //reset to empty array

          //check if newStudentName is Invalid
          if(newStudentName.value.length == 0){
            formErrors.value.push('Student name must be entered')
          }

          if(newStarID.value.length == 0) {
            formErrors.value.push('StarID must be entered')
          }

          //if there are no errors - is this form valid?
          if(formErrors.value.length == 0) {
            let student = {
              name: newStudentName.value,
              starID: newStarID.value,
              present: false,
            }
            // how to add student?
            studentStore.addNewStudent(student)
            newStudentName.value = ''  //clear form to get ready to add new student/not a duplicate
            newStarID.value = ''
          }
}

</script>

<template>

  <div id="new-student-form-errors" class="m-2">
    <!-- {{ formErrors }}  display data in form helps Vue tools know this is data we need to display- sometimes doesn't refresh in Dev Tools-->
    <!--show errors from form validation -->
    <div v-if="formErrors.length > 0" class ="alert alert-danger"> <!-- only display if at least one error -->
      <li v-for="error in formErrors">
        {{ error }}
      </li>
    </div>
  </div>


  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <input v-model.trim="newStudentName" id="name" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <input v-model.trim="newStarID" id="starID" class="form-control">
    </div>

    <!-- v-on:click event handler -->
    <button v-on:click="addStudent" class="btn btn-primary">Add</button>
  </div>

</template>



<style scoped>

/* CSS for this component here */


</style>
