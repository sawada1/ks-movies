<template>
    <div>
          <h2 class="text-grey text-h3  text-center">trending</h2>
            <div class="moviessearch">
      <input v-model="movietext"    @keypress.enter="getmain()"  type="search" placeholder="search..">
      <i @click="getmain()" class="fa-solid fa-magnifying-glass"></i>      
      </div>

   <div class="mainbox">
    <div class="box" v-for="box in popular">

    <router-link :to="{name:box.media_type=='movie'?'movie':'show' , params:{id: box.id}}">
     <div class="image">
     <v-img :src="`https://image.tmdb.org/t/p/w500/${box.poster_path}`" alt="">
       <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
     </v-img>
     </div>   
    </router-link>
 
     <div class="textt">
     <h4 class="text-h6 text-center pa-2 font-weight-bolder">{{ box.original_title }}</h4>
     <div class="rate" style="display: flex; align-items: center; flex-direction: column; gap:10px;">
      <div class="stars">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      </div>
      <p>{{ Math.floor(box.vote_average * 10)}}% | {{ box.release_date}}</p>
      <h4>{{ box.media_type }}</h4>
     </div>
     <div style="display: flex; align-items: center; gap:3px; text-align: center;">
     <span>{{ getGenres(...box.genre_ids)}}</span>
     </div> 
     <v-btn @click="showAlert" color="indigo">add to favourite</v-btn>
     </div>
   
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
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
   setup() {
    let mainurl = ref('https://api.themoviedb.org/3/');
    let apiKey = ref('api_key=3c289cb485bdb60445b81e5e30650fb0');
    let popular = ref([]);
     let thepage = ref(1);
    let movietext = ref('');
    let genres = [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ];

 
    

       const getmain = async () => {
           let result = await axios.get(`${mainurl.value}/trending/all/day?${apiKey.value}&page=${thepage.value}`);
          let result2 = await axios.get(`${mainurl.value}/search/multi?${apiKey.value}&query=${movietext.value}&page=${thepage.value}&include_adult=true`);            
    if (movietext.value == '') {
     console.log('search input is empty');
      console.log(result.data.results);     
      popular.value = result.data.results;
    } else {
       console.log(result2.data.results); 
        popular.value = result2.data.results; 
      }
     
      
    }
    getmain();
    
        const next = () => {
        thepage.value = thepage.value + 1;
          getmain();    
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
         
          getmain();    
         
      window.scrollTo({
        top: 0,
        behavior:'smooth'
      })
      }
    }

    const showAlert = () => {
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'added to your favourite'
})
    }

   const getGenres = (...id) => {
      let all = [];
      genres.filter((thename) => {
        for (let i = 0; i < id.length; i++){
          if (id[i] == thename.id) {
            all.push(thename.name);     
          }
        
        } 
      });
      return all.join(',');
    }

    return {
      popular,
      previous,
      next,
      showAlert,
      genres,
      getGenres,
        getmain,
      movietext
    };
  },
}

</script>

<style lang="scss">


</style>