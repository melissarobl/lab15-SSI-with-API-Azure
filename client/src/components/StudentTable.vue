<script setup>

import { useStudentStore } from '../stores/StudentStore.js'

import { storeToRefs } from 'pinia'  //convert things in stores into refs within a component - becomes reactive data in components

import { computed } from 'vue'

import StudentRow from './StudentRow.vue'

const studentStore = useStudentStore()  //importing function definition and calling it studentStore

const { sortedStudents, studentCount } = storeToRefs(studentStore)  //just want studentList and studentCount from the store, not everything that is being returned

const deleteStudent = (student) => {
  studentStore.deleteStudent(student)
}

const arrivedOrLeft = (student, isStudentPresent) => {
  student.present = isStudentPresent
  studentStore.arrivedOrLeft(student)
}

const pluralStudentMessage = computed ( () => {
  if (studentCount.value === 1) {
    return 'There is 1 student in class'
  } else {
    return `There are ${studentCount.value} students in class`
  }
})

</script>

<template>

  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted">{{ pluralStudentMessage }}</h5>  <!-- computed property -->
    <div id="student-table">
      <table class="table">
          <thead>
              <tr>
                <th>Name</th>
                <th>StarID</th>
                <th>Present?</th>
                <th>Delete?</th>
              </tr>
          </thead>

          <tbody>

              <StudentRow
                  v-for="student in sortedStudents"
                  v-bind:student="student"
                  v-on:arrived-or-left="arrivedOrLeft"
                  v-on:delete-student="deleteStudent"
              ></StudentRow>
              <!-- one student row created for each student -->
              <!-- in v-bind the first 'student' is prop, second is value. Send a student object to each student row component.   -->
              <!-- on alert from emits from StudentRow about students that arrived/left. Calls arrivedOrLeft function if emit received -->

          </tbody>

      </table>
    </div>
  </div>

</template>



<style scoped>

#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}


</style>


