<template>
  <v-app>
    <thenav/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import thenav from './components/navbar.vue'
export default {
  name: 'App',
  components: {
    thenav
  },

  data: () => ({
    //
  }),
}
</script>


<style lang="scss">
*{
  text-transform: capitalize;
}
  
</style>
