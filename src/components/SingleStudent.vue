<template>
   <div id="single-student">
      <h2> Pregled i opcije studenta </h2>

      <div class="close" @click="closeStudent"> </div>

      <div id="info">
         <h4> 
            {{ student.Ime }} {{ student.Prezime }} 
            <small>Ime Prezime</small>
         </h4>
      </div>
      #student
      {{ student }}

      <button class="delete" @click="deletion = true"> Obriši </button>

      <delete-student-modal v-if="deletion" :name="student.Ime + ' ' + student.Prezime" @delete-confirm="deleteStudent" />
   </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IStudent } from '@/interfaces';

import DeleteStudentModal from './DeleteStudentModal.vue';


@Options({
   props: {
      student: {
         type: Object,
         requred: true
      }
   },
   components: {
      DeleteStudentModal
   }
})
export default class SingleStudent extends Vue {
   student!: IStudent;

   deletion: boolean = false;

   closeStudent() {
      this.$emit('close');
   }

   deleteStudent(confirm: boolean) {
      if (confirm) {
         this.$emit('delete-student', this.student);
         this.deletion = false;
      } else { 
         this.deletion = false;
      }
   }
}
</script>

<style lang="scss" scoped>
#single-student {
   position: relative;
   margin: 50px 0;
   background: #e7e7e7;
   border-radius: 5px;
   padding: 15px;
   overflow: hidden;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
   
   .close {
      position: absolute;
      top: 25px;
      right: 25px;
      width: 25px;
      height: 25px;
      background: grey;
      border-radius: 100%;

      &:hover {
         cursor: pointer;
         background: white;
      }
   }

   #info {
      h4 {
         text-transform: capitalize;

         small { 
            display: block;
            font-weight: 300;
         }
      }
   }

   button { 
      display: block;

      &.delete {
         background: tomato;
         color: whitesmoke;
         border: none;
      }
   }
}
</style>