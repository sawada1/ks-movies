<template>
    <div>

 <v-toolbar
      dark
      prominent
      style="position: fixed; overflow:visible; z-index:11;"
      
      color="indigo-lighten-1"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
      <router-link to="/" class="text-white" style="display: flex; align-items: center; gap:5px;">

   <v-icon>mdi-movie</v-icon>
        <span>ks-movie</span>
</router-link>
      </v-toolbar-title>

            <!-- <v-text-field
             prepend-icon="mdi-magnify"
            class="theinputsearch"
            :class="{'active':opensearch}"
        hide-details
        single-line
        v-model="thetext"
         @keypress.enter.=" print()"
      ></v-text-field> -->

      <!-- <v-spacer></v-spacer> -->
  <v-btn icon @click="print">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
       <v-menu >
      <template v-slot:activator="{ props }">
        <v-btn
          color="light"
          dark
          v-bind="props"
        >
          Dropdown
        </v-btn>
      </template>

      <v-list class="thelist text-center">
        <v-list-item >
        <router-link to="/">
                  <v-list-item-title class="" style="cursor:pointer">movies</v-list-item-title>
        </router-link>
        </v-list-item>
        <v-list-item >
        <router-link to="/tv">
          <v-list-item-title class="" style="cursor:pointer">tv</v-list-item-title>        
        </router-link>
        </v-list-item>
        <v-list-item>
        <router-link to="/actors">
                  <v-list-item-title class="" style="cursor:pointer">actors</v-list-item-title>
        </router-link>
        </v-list-item>
        <v-list-item>
        <router-link to="/trending">
          <v-list-item-title class="" style="cursor:pointer">trending</v-list-item-title>        
        </router-link>
        </v-list-item>
      </v-list>
    </v-menu>

   
    </v-toolbar>


       <v-navigation-drawer
        v-model="drawer"
        temporary
        class="bg-indigo-darken-1"
      >
      
      <div class="theavatar">
      <v-avatar size="80">
              <v-img src="../assets/kk.jpg" alt="" />
      </v-avatar>
          <h3>khaled sawada</h3>      
      </div>
        

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-movie" title="movies" value="movies" route to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-movie" title="tv" value="tv" route to="/tv"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="actors" value="actors" route to="/actors"></v-list-item>
          <v-list-item prepend-icon="mdi-heart" title="favourite" value="favourite" route to="/favourite"></v-list-item>
          <v-list-item prepend-icon="mdi-fire" title="trending" value="trending" route to="/trending"></v-list-item>

        </v-list>
      </v-navigation-drawer>    

        </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
let drawer = ref(false);
let thetext = ref(sessionStorage.getItem('searching')==''?'':sessionStorage.getItem('searching'));
const print = () => {
  window.scrollTo({
    top: 0,
      behavior:'smooth'
    })
  }

let opensearch = ref(false);

</script>

<style lang="scss">
.theinputsearch{
  background-color: #5c6bc0;
  position: absolute;
  top: 99%;
  width: 70%;
  right: 0px;
  padding: 10px;
  transition: 0.5s;
  transform: translateX(100%);
  &.active{
    transform: translateX(0);
  }
}
a{
  text-decoration: none;
}
.thelist {
  a{
    color: #333;
    background-color: red;
  }
}
.theavatar{
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  //  img{
  //   width: 100px;
  //  }
}

</style>