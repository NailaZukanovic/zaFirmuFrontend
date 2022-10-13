<template>
   <div id="create-student">
      <h2> Kreiranje studenta </h2>
      <p> Kliknite na krug desno kako bi ste otvorili polja za kreirajne. </p>
      <div class="close" @click="isActive = !isActive" :class="{ active: isActive }"> </div>

      <div id="creating" v-if="isActive">
         <h4 class="error" v-if="errorMessage"> {{ errorMessage }}</h4>

         <input type="text" v-model="studentIndex" placeholder="Broj indeksa studenta">
         <input type="text" v-model="studentName" placeholder="Ime studenta">
         <input type="text" v-model="studentLastName" placeholder="Prezime studenta">
         <input type="number" v-model="studentAge" placeholder="Godine studenta">
         <input type="text" v-model="studentStatus" placeholder="Status studenta">

         <button @click="create"> Kreiraj Studenta </button>
      </div>
   </div>
</template>


<script lang="ts">
import { Vue } from 'vue-class-component';

export default class CreateStudent extends Vue {
   isActive: boolean = false;
   errorMessage: string | null = null;

   studentIndex: number | null = null;
   studentName: string | null = null;
   studentLastName: string | null = null;
   studentAge: number | null = null;
   studentStatus: string | null = null;

   setError(msg: string) {
      this.errorMessage = msg;
      setTimeout(() => this.errorMessage = null, 5000);
   }

   resetInputs() {
      this.studentIndex = null;
      this.studentName = null;
      this.studentLastName = null;
      this.studentAge = null;
      this.studentStatus = null;
   }

   create() {
      if (!this.studentIndex) 
         return this.setError('Polje za indeks studenta je obavezno !');

      if (!this.studentStatus)
         return this.setError('Polje za status studenta je obavezno !');

      this.$emit('create-student', this.studentIndex, this.studentName, this.studentLastName, this.studentAge, this.studentStatus);

      this.resetInputs();
   }
}
</script>

<style scoped lang="scss">
#create-student {
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
         background: whitesmoke;
      }

      &.active {
         background-color: lightgreen;
      }
   }

   #creating {
      h4 {
         &.error {
            color: tomato;
         }
      }

      input {
         display: block;
         margin: 10px 0;
         padding: 5px;
      }

      button { 
         background:rgb(102, 177, 102);
         color: white;
      }
   }

}
</style>