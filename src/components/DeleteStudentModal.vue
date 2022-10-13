<template>
   <div id="delete-modal">
      <div id="box">
         <h2> Brisanje studenta </h2>
         <p> Da li ste sigurni da želiue da izbrišete studenta <b>{{ name }}</b> ? </p>

         <button @click="selectOption(true)"> Izbriši </button>
         <button class="cancel" @click="selectOption(false)"> Odustani </button> 
      </div>
   </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
   props: {
      name: {
         type: String,
         required: true
      }
   }
})
export default class DeleteStudentModal extends Vue {
   name!: string;

   selectOption(option: boolean) {
      this.$emit('delete-confirm', option);
   }
}
</script>

<style lang="scss" scoped>
#delete-modal {
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   position: fixed;
   background: rgba(0, 0, 0, 0.4);
   display: grid;

   #box {
      width: 300px;
      height: auto;
      margin: auto;
      background: #e7e7e7;
      border-radius: 5px;
      padding: 15px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

      button {
         background: tomato;
         color: whitesmoke;

         &.cancel {
            margin-left: 15px;
            background: #cdcdcd;
            color: rgb(51, 51, 51);
         }
      }
   }
}
</style>