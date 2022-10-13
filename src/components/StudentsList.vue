<template>
   <div id="students">
      <h2> Lista studenata </h2>
      <p> Duplim klikom na studenta otvarate opcije. </p>
      <h4 style="font-weight: 300;" v-if="students.length > 0"> Broj studenata: <b>{{ students.length }}</b> </h4>
      
      <input id="search" type="text" v-model="search" name="search-students" placeholder="Pretraga studenata...">

      <table id="list" v-if="students.length > 0">
         <tr>
            <th> ID </th>
            <th> Broj Indeksa </th>
            <th> Ime </th>
            <th> Prezime </th>
            <th> Godine </th>
            <th> Status </th>
         </tr>

         
         <tr v-for="student of studentsList" @dblclick="select(student)">
            <td> {{ student.StudentId }} </td>
            <td> {{ student.brIndeksa }} </td>
            <td> {{ student.Ime }} </td>
            <td> {{ student.Prezime }} </td>
            <td> {{ student.Godina }} </td>
            <td> .... </td>
         </tr>
      </table>


      <p v-else> Lista studenata je prazna. </p>
   </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IStudent } from '@/interfaces';
import { def } from '@vue/shared';

@Options({
   props: {
      students: {
         type: Array,
         required: true,
         default: () => []
      }
   }
})
export default class StudentsList extends Vue {
   students!: IStudent[];
   search: string = '';

   get studentsList () {
      if (this.search.length > 2) {
         if (isNaN(parseInt(this.search))) {
            return this.students.filter(({ Ime, Prezime }) => [Ime, Prezime].join(' ').includes(this.search));
         } else {
            return this.students.filter(({ brIndeksa }) => brIndeksa.toString().includes(this.search));
         }
      } else { 
         return this.students;
      }
   }

   select(student: IStudent) {
      this.$emit('select-student', student);
   }
}
</script>

<style scoped lang="scss">
#students {
   padding: 15px;
   background: #e7e7e7;
   border-radius: 5px;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

   input#search {
      width: 205px;
      margin-bottom: 15px;
   }

   table {
      border-collapse: collapse;
      width: 100%;
   }

   tr {
      &:nth-child(even) {
         background-color: #dddddd;
      }

      &:hover {
         background: whitesmoke !important;
         cursor: pointer;
      }
   }

   td, th {
      border: 2px solid #d1d1d1;
      text-align: left;
      padding: 8px;
   }
}
</style>