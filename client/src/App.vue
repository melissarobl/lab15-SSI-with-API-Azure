<script setup>

import { onMounted } from 'vue'
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from "./components/StudentMessage.vue"

//changing the order of these will change the order they appear on the web page.

import { useStudentStore } from "./stores/StudentStore.js";  //importing function
const studentStore = useStudentStore()  //calling function. App.vue can use student store

onMounted( () => {
  //whatever is in here will run when the component is first displayed
  studentStore.getAllStudents()
})


</script>

<template>
  <NewStudentForm>

  </NewStudentForm>

  <StudentTable>

  </StudentTable>

  <StudentMessage>

  </StudentMessage>





</template>



<style scoped>

/* CSS for this component here */


</style>
