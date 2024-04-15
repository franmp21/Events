import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonsStore = defineStore('pokemons', () => {
  const pokemons = ref([
    {
      id: 1,
      nombre: 'Bulbasaur',
      type: 'plant',
      img: 'https://i.pinimg.com/564x/19/8f/65/198f65c868b7813d3b1f29083a0917e4.jpg'
    },
    {
      id: 2,
      nombre: 'Charmander',
      type: 'fire',
      img: 'https://f.fcdn.app/imgs/e6991c/www.crocs.com.uy/crocuy/d237/original/catalogo/CR10010047_1002_1/1500-1500/jibbitz-charm-pokemos-charmander-multicolor.jpg'
    },
    {
      id: 3,
      nombre: 'Squirtle',
      type: 'water',
      img: 'https://db.pokemongohub.net/images/pokemon-home-renders/Normal/poke_capture_0007_000_mf_n_00000000_f_n.png'
    }
  ])


  return { pokemons }
})
