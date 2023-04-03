<template>
    <div>
        <h2 class="text-grey text-h3  text-center">movie details</h2>
        <div class="thebox">
         <div class="image">
         <v-img
      :src="`https://image.tmdb.org/t/p/w500/${themovie.poster_path}`"
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
         </div>
         <div class="thetext">
          <h3>{{ themovie.original_title }}</h3>
          <div class="rate">
            <div class="stars">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      </div>
        <p>{{ Math.floor(themovie.vote_average * 10)}}% | {{ themovie.release_date}}</p>
       
        <span class="text-grey" v-for="type in geners">
         {{type.name || ""}},
        </span>
          </div>
          <div class="lorem">
          {{ themovie.overview }}
          </div>
          <h4>featured cast</h4>
             <p v-if="themovie.credits.cast.length >= 3">
            {{ themovie.credits.cast[0].name }}  , {{ themovie.credits.cast[1].name }} ,
            {{ themovie.credits.cast[2].name }} 
          </p>
            <p v-if="themovie.credits.cast.length <= 2">
            {{ themovie.credits.cast[0].name }}  , {{ themovie.credits.cast[1].name }} , 
          </p>
            <p v-if="themovie.credits.cast.length <= 1">
            {{ themovie.credits.cast[0].name }} 
          </p>
            <p v-if="themovie.credits.cast.length < 1">
            there are no names  
          </p>
            <div v-if="themovie.credits.crew.length > 3" class="tex">
           <h5>{{ themovie.credits.crew[0].name }}</h5>
           <p>{{  themovie.credits.crew[0].job  }}</p>
           <h5>{{ themovie.credits.crew[1].name }}</h5>
           <p>{{  themovie.credits.crew[1].job  }}</p>
           <h5>{{ themovie.credits.crew[2].name }}</h5>
           <p>{{  themovie.credits.crew[2].job  }}</p>
          
          </div>
         <div class="btnss">
         <v-dialog
         v-if="themovie.videos.results.length == 0"
        transition="dialog-bottom-transition"
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="red"
            v-bind="props"
          >play</v-btn>
        </template>
     
        <template  v-slot:default="{ isActive }">
          <v-card class="thevideoo" style="width: 90vw; height:100vh;">
            <v-toolbar
              color="primary"
              :title="themovie.original_title"
            ></v-toolbar>
            <v-card-text>
              <h2 class="text-center" >there's no video available</h2>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="isActive.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
         <v-dialog
         v-else
        transition="dialog-bottom-transition"
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="red"
            v-bind="props"
          >play</v-btn>
        </template>
        <template v-if="themovie.videos" v-slot:default="{ isActive }">
          <v-card class="thevideoo" style="width: 90vw; height:100vh;">
            <v-toolbar
              color="primary"
              :title="themovie.original_title"
            ></v-toolbar>
            <v-card-text>
            <iframe
             width="100%" height="100%"
            :src="`https://www.youtube.com/embed/${themovie.videos.results[0].key}`"
              frameborder="0"
            allowfullscreen
              ></iframe>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="isActive.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
   
      </v-dialog>
          
     
          </div>
         </div>
        </div>
        <h2 class="text-grey text-h3 my-7 text-center">cast</h2>
        <div class="thecast">
         <div class="box" v-for="cast in thecast">
         <router-link :to="{name:'actorDetails', params:{id:cast.id}}">
         <div v-if="cast.profile_path != null || cast.profile_path != undefined ">
           <v-img
          :src="`https://image.tmdb.org/t/p/w500/${cast.profile_path}`"
          
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
         </div>
         <div v-else>
           <v-img src="https://via.placeholder.com/300x450"></v-img>
         </div> 
         </router-link>
        
          <span>{{ cast.original_name }}</span>
         </div>
        </div>
      <h2 class="text-grey text-h3 text-center" style="margin-top: 100px;">images</h2>
        <div class="theimages">
   
        <!-- <div style="cursor: pointer;"> -->
          <lightgallery
        :settings="{ speed: 500, plugins: plugins }"
        :onInit="onInit"
        :onBeforeSlide="onBeforeSlide"
        class="boximages"
    >
      
        <a  v-for="box,index in allimages" :href="`https://image.tmdb.org/t/p/w500/${box.file_path}`">
          <v-img
          :src="`https://image.tmdb.org/t/p/w500/${box.file_path}`"
          :key="index"
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
        </a>
        
             </lightgallery>
        <!-- </div> -->
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import { ref, onMounted } from 'vue';
    import Lightgallery from 'lightgallery/vue';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import lgZoom from 'lightgallery/plugins/zoom';

    // If you are using scss you can skip the css imports below and use scss instead
    // import styles from 'lightgallery/scss/lightgallery.scss';
export default {
  components: {
       Lightgallery,
  },
    props: ['id'],
    setup(props) {
    let mainurl = ref('https://api.themoviedb.org/3/');
        let apiKey = ref('api_key=3c289cb485bdb60445b81e5e30650fb0');
        let themovie = ref('');
        let geners = ref([]);
        let thecast = ref([]);
        let allimages = ref([]);
        const getTheMovie = async () => {
            let result = await axios.get(`${mainurl.value}/movie/${props.id}?${apiKey.value}&append_to_response=videos%2Cimages%2Ccredits`);
            console.log(result.data);
            themovie.value = result.data;
                geners.value = result.data.genres
            console.log(geners.value);
            thecast.value = result.data.credits.cast;
          allimages.value = result.data.images.backdrops;    
        }
        getTheMovie();
      onMounted(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      });

    
      const onInit = () => {
        // console.log('lightGallery has been initialized');
      };
      const onBeforeSlide = () => {
        // console.log('calling before slide');
      };
        return {
            themovie,
            geners,
            thecast,
          allimages,
          plugins: [lgThumbnail, lgZoom],
          onInit,
         onBeforeSlide
        }
    }
}

</script>

<style lang="scss">
   @import 'lightgallery/css/lightgallery.css';
    @import 'lightgallery/css/lg-thumbnail.css';
    @import 'lightgallery/css/lg-zoom.css';
.thebox{
    width: 95%;
    margin: 50px auto;
    display: flex;
    align-items: center;
    gap: 30px;
    .image{
        width: 50%;
        img{
            width: 100%;
            object-fit: cover;
        }
    }
    .thetext{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 50%;
        height: 100%;
        justify-content: center;
        h3{
            font-size: 30px;
            font-weight: bolder;
        }
        .stars{
            display: flex;
            align-items: center;
            gap: 5px;
            i{
                font-size: 20px;
                color: rgb(234, 234, 74);
            }
        }
        
        h4{
            font-size: 25px;
        }
        h5{
            font-size: 20px; 
        }
        .tex{
          display: flex;
          flex-direction: column;
          gap:10px;
            p{
                font-size: 20px;
            }
        }
        .rate{
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .btnss{
            display: flex;
            align-items: center;
            gap: 20px;
        }
    }
}

.thecast{
  width: 95%;
  margin: 30px auto;
 display: grid;
grid-template-columns: repeat(4 , 1fr);
gap: 20px;
    .box{
        text-align: center;
        align-items: center;
        position: relative;
        cursor: pointer;
        span{
            position: absolute;
            font-size: 20px;
            margin: 5px 0px;
            top: 80%;
            transform: translateX(-50%);
            width: 100%;
            background-color: #333;
            color: #fff;
            font-weight: bold;
            padding: 5px 0px;
        }
     
    }
   
}

.theimages{
  width: 95%;
  margin: 50px auto;

    .boximages{
    display: grid;
    
    grid-template-columns: repeat(4 , 1fr);
    gap: 20px;
        
    }
}

@media(max-width:855px){
    .thebox{
        flex-direction: column;
        .thevideoo{
            width: 100vw;
            height: 100vh;
        }
        .image{
            width: 90%;
        }
        .thetext{
            width: 90%;
            text-align: center;
            align-items: center;
            
            h3{
                font-size: 23px;
            }
            .rate{
                flex-direction: column;
            }
        }
    }
    .thecast{
        grid-template-columns: repeat(3 , 1fr);
    }
    .theimages{
      .boximages{
        grid-template-columns: repeat(3 , 1fr);
      }
    }
}
@media(max-width:640px){
      .thecast{
        grid-template-columns: repeat(1 , 1fr);
        width: 80%;
    }
      .theimages{
      .boximages{
        grid-template-columns: repeat(1 , 1fr);
      }
    }
}

</style>