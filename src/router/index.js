import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import MainPage from '@/views/MainPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' // Redirige al usuario automáticamente a la ruta '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },

    {
      path: '/user/:user',
      name: 'Main',
      component: MainPage,
      props: (route )=>({
        //Obtengo por parámetros el usuario, y lo envío mediante props al componente MainPage
        user: route.params.user,      
      })
    },
        // Configura la redirección a la página de inicio si la ruta no coincide con ninguna definida
    {
      path: '/*',
      redirect: '/'
    },
  ]
})

export default router
