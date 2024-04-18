<script setup>

import { ref } from 'vue'
const props = defineProps({
    student: Object
})

const emit = defineEmits( ['arrived-or-left', 'delete-student'])
const isStudentPresent = ref(props.student.present)  //make copy of whether student is present or not

const notifyArrivedOrLeft = () => {
  //tell parent that student arrived or left - emit event
  emit('arrived-or-left', props.student, isStudentPresent.value) //who arrived or left and what is the arrival/leaving status?
}

const confirmThenDeleteStudent = () => {
  if (confirm(`Delete ${props.student.name}?`))
    emit('delete-student', props.student) //send prop back to StudentTable
}


</script>

<template>

  <tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present}">  <!-- loop in vue to get all the students in the list-->
    <!-- v-bind: class to show HTML attribute you want to change. Name of class (in CSS) you want to change is 'present' or 'absent'-->
      <td>{{  student.name  }}</td>
      <td>{{  student.starID  }}</td>
      <!-- checkbox for present/absent only one of these is rendered in browser code, but Vue has both-->
      <td>
          <input type="checkbox" v-model="isStudentPresent"  v-on:change="notifyArrivedOrLeft"> <!-- value set on whether student is present. Uses this
          ref to check if student is present or not-->
          <span v-if="student.present" class="mx-3">Here!</span>
          <span v-else class="mx-3">Not present</span>  <!-- mx-3 means margin to left and right -->
      </td>
      <td>
          <button v-on:click="confirmThenDeleteStudent" class="btn btn-danger" >
            <i class="bi bi-trash-fill"></i> Delete
          </button>
      </td>
  </tr>  <!-- -->


</template>



<style scoped>

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}



</style>