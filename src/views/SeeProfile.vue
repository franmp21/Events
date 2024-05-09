<template>

    <div class="h-full w-full grid grid-rows-2">
        <div class="font-bold text-center border border-red-500 m-1">
            Perfil
            <h1>franmp01</h1>
            <h2>Descripción</h2>
            
        </div>
        <div class=" font-bold text-center border border-red-500 m-1">
            Eventos
            <div class="grid grid-cols-2">
                <Listado :tipo="'favoritos'" :listado="carrusel_favoritos"></Listado>
                <Listado :tipo="'mis_eventos'" :listado="carrusel_mis_eventos"></Listado>

            </div>
        </div>

        
        

    </div>
</template>

<script setup>
import Listado from '@/components/Listado.vue';
import {ref} from 'vue'
const carrusel_favoritos = ref([
    {
        id: '1',
        titulo: 'Evento1',
        descripcion: 'Descripcion1',
        fecha: '30/09/2001',
        personas_apuntadas: [
            {id: 'DSAFASDFADFA'},
            {id: 'SJAFJASJFAJE'}
        ],
        creador_id:  '483948389ADSA'    
    },
    {
        id: '2',
        titulo: 'Evento2',
        descripcion: 'Descripcion2',
        fecha: '30/09/2002',
        personas_apuntadas: [
            {id: 'DSAFASDFADFA2'},
            {id: 'SJAFJASJFAJE2'}
        ],
        creador_id: '483948389ADSA2'
    }
])
const carrusel_mis_eventos = ref([
    {
        id: '1',
        titulo: 'MiEvento1',
        descripcion: 'Descripcion1',
        fecha: '30/09/2001',
        personas_apuntadas: [
            {id: 'DSAFASDFADFA'},
            {id: 'SJAFJASJFAJE'}
        ],
        creador_id:  '483948389ADSA'    
    },
    {
        id: '2',
        titulo: 'MiEvento2',
        descripcion: 'Descripcion2',
        fecha: '30/09/2002',
        personas_apuntadas: [
            {id: 'DSAFASDFADFA2'},
            {id: 'SJAFJASJFAJE2'}
        ],
        creador_id: '483948389ADSA2'
    }
])

</script>

<style scoped>

</style>