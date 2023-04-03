<template>
    <div>
        <h2 class=" text-center text-h3">actors</h2>
          <div class="moviessearch">
      <input v-model="actortext"    @keypress.enter="getActors()"  type="search" placeholder="search..">
      <i @click="getActors()" class="fa-solid fa-magnifying-glass"></i>      
      </div>
         <div class="theactors">
         <div class="mainbox" id="mainactors">
         <div class="box" v-for="box in  theactors" >
         <router-link :to="{name:'actorDetails', params:{id:box.id}}">
            <v-img
           :src="`https://image.tmdb.org/t/p/w500/${box.profile_path}`"
          
         >
        <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
         
         </v-img>  
          <h4 class="text-center">{{ box.name }}</h4>

         </router-link>
       
         </div>
         </div>
         <div class="thebtnss">
            <v-btn class="mx-2" fab dark small color="error" v-on:click.prevent="previous()">
               <i class="fas fa-step-backward" style="font-size: 20px;"></i>            
            </v-btn>
            <v-btn class="mx-2" fab dark small color="error" v-on:click.prevent="next()">
               <i class="fas fa-step-forward" style="font-size: 20px;"></i>            
                           
            </v-btn>
         </div>
          
         </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
export default {
  setup() {
    let theactors = ref([]);
      let mainurl = ref('https://api.themoviedb.org/3/');
    let apiKey = ref('api_key=3c289cb485bdb60445b81e5e30650fb0');
    let thepage = ref(1); 
    let actortext = ref('');
    const getActors = async (page) => {
      let result = await axios.get(`${mainurl.value}/person/popular?${apiKey.value}&page=${thepage.value}`);
      let result2 = await axios.get(`${mainurl.value}/search/person?${apiKey.value}&query=${actortext.value}&page=${thepage.value}&include_adult=true`);
      if (actortext.value == '') {
      console.log(result.data.results);
      theactors.value = result.data.results;    
      } else {
      theactors.value = result2.data.results;
                   
      }
    
    }
    getActors();

    const next = () => {
      thepage.value = thepage.value + 1;
      getActors();
      window.scrollTo({
        top: 0,
        behavior:'smooth'
      })
    }
    const previous = () => {
      if (thepage.value == 1) {
        return;
      } else {
         thepage.value = thepage.value - 1;
      getActors();
      window.scrollTo({
        top: 0,
        behavior:'smooth'
      })
      }
    }


    return{theactors, next, previous , getActors, actortext}

  }
}

</script>

<style lang="scss">
.theactors{
  a{
    text-decoration: none;
  }
  h4{
    padding: 20px;
    font-size: 25px;
    font-weight: bolder;
    color: gray;
  }
  img{
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
}

</style>