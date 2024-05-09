<template>
  <div>
    <h1 class="font-bold text-3xl text-center"> {{ props.tipo == 'favoritos' ? 'Eventos favoritos' : 'Mis Eventos'  }} </h1>
    <div class="flex justify-center p-5">
      <Evento :evento="props.listado[contador]"></Evento>
    </div>

      <button class="p-5 mx-5 border rounded-md bg-green-900" @click="restar" :disabled="minIndex()">Anterior</button>
      <button class="p-5 mx-5 border rounded-md bg-green-500" @click="sumar" :disabled="maxIndex()">Siguiente</button>
  </div>

</template>

<script setup>
import Evento from './Evento.vue';
import { ref } from 'vue';
const props = defineProps({
    listado: Array,
    tipo: String
})
const maxIndex = ()=>{
    return contador.value >= props.listado.length-1
}
const minIndex = ()=>{
    return contador.value <= 0
}
const contador = ref(0)
const sumar = ()=>{
    contador.value+=1;
}
const restar = ()=>{
    contador.value-=1;
}
</script>

<style scoped>

</style>