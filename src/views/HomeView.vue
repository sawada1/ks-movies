<template>
  <thenav/>
  <div>
  <h2 class="text-grey text-h4  text-center">popular movies</h2>
     
      <div class="moviessearch">
      <input v-model="movietext"    @keypress.enter="getmain()"  type="search" placeholder="search..">
      <i @click="getmain()" class="fa-solid fa-magnifying-glass"></i>      
      </div>

   <div class="mainbox">
    <div class="box" v-for="box in popular">

    <router-link :to="{name:'movie' , params:{id: box.id}}">
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
     </div>
     <div class="geners">
     <span>{{getGenres(...box.genre_ids)}}</span>     
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

     <h2 class="text-grey text-h4 my-5 text-center">top rated movies</h2>
     <div class="upcoming">
    <swiper
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :autoplay="{
      delay:2500,
       disableOnInteraction: false,
    }"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :pagination="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="box in upcoming">
      <router-link :to="{name:'movie' , params:{id: box.id}}">
    <div class="image">
    <img :src="`https://image.tmdb.org/t/p/w500/${box.poster_path}`"  /> 
                <span>{{ box.original_title }}</span>           
      
    </div>
      </router-link>
    </swiper-slide >
  </swiper>    
     </div>
   
  </div>


  </template>

<script>
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";

import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import thenav from '../components/navbar.vue';
import {useRoute} from 'vue-router'

export default {
  
  components: {
    Swiper,
    SwiperSlide,
    thenav
  },
  setup() {
    let mainurl = ref('https://api.themoviedb.org/3/');
    let apiKey = ref('api_key=3c289cb485bdb60445b81e5e30650fb0');
    let popular = ref([]);
    let upcoming = ref([]);
    let thepage = ref(1);
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
    let store = useStore();
    let router = useRoute();

    let movietext = ref('');
    

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
    

    const getmain = async () => {
    
      let result = await axios.get(`${mainurl.value}/movie/popular?${apiKey.value}&include_adult=true&include_video=true&page=${thepage.value}`);
      let result2 = await axios.get(`${mainurl.value}/movie/top_rated?${apiKey.value}&page=1`);
      let result3 = await axios.get(`${mainurl.value}/search/movie?${apiKey.value}&query=${movietext.value}&page=${thepage.value}&include_adult=true`);
       if (movietext.value == '') {
       console.log('search input is empty');
         popular.value = result.data.results;
          console.log(result.data.results);     
      } else {
       console.log(result3.data.results); 
       popular.value = result3.data.results;     
      }
     
       for (let i = 0; i < 15; i++){
         upcoming.value.push(result2.data.results[i]);   
       }
            console.log(upcoming.value);
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



    return {
      modules: [EffectCoverflow, Pagination, Autoplay],
      popular,
      upcoming,
      previous,
      next,
      showAlert,
      genres,
      getGenres,
      movietext,
      getmain
    };
  },
};
</script>

<style lang="scss">
.moviessearch{
  background-color: #5c6bc0;
  width: 90%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  input{
    width: 80%;
    outline: none;
    font-size: 20px;
    color: #fff;
    &::placeholder{
      color: #fff;
    }
  }
  i{
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
}
.thebtnss{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
h2{
  font-weight: bolder;
  color: gray;
  font-size: 30px;
  margin-top: 100px;
}
.mainbox{
  display:grid;
  grid-template-columns: repeat( 3, 1fr);
  gap: 20px;
  width: 95%;
   margin: 20px auto;
  .box{
    
    margin: 20px 0px;
    box-shadow: 5px 2px 10px 2px rgba(0, 0, 0, 0.289);
    border-radius: 20px;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
      transform: translateY(-10px);
    }
    .stars{
      display: flex;
      align-items: center;
      gap: 5px;
      i{
        color: rgb(232, 232, 72);
      }
    }
    
    .image{
      width: 100%;
    
    
      img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      }
    }
    .textt{
      margin: 10px 0px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      width: 100%;
     .geners{
      width: fit-content;
      display: flex;
      align-items: center;
      flex-direction: column;
      span{
        display: flex;
        flex-direction: column;
        width: 100%;
      }
     }
    }
  }
}


.upcoming{
  margin: 50px 0px;
  .swiper {
  width: 95%;
 margin: 10px auto;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 500px;
  height: 500px;
  .image{
    position: relative;
    span{
      cursor: pointer;
      position: absolute;
      background-color: #333333cd;
      top: 60%;
      width: 100%;
      padding: 10px 0px;
      text-align: center;
      font-size: 20px;
      color: #fff;
    }
  }
}

.swiper-slide img {
  display: block;
  width: 100%;
}
}

@media(max-width:988px){
  .mainbox{
 
    grid-template-columns: repeat(2 , 1fr);
   
  }
}
@media(max-width:770px){
  .mainbox{
    grid-template-columns: repeat(2 , 1fr);
  }
}
@media(max-width:690px){
  .mainbox{
    width: 85%;
    grid-template-columns: repeat(1 , 1fr);
  }
}

</style>
