<template>
    <div>
        <h2 class=" text-h3 text-center">actor details</h2>
        <div class="mainActor">
         <div class="image">
                  <v-img
                 :src="`https://image.tmdb.org/t/p/w500/${theactor.profile_path}`"
          
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
         <div class="iconss">
         <div v-if="socials.facebook_id == null || socials.facebook_id == undefined">
           <a href="https://facebook.com" target="_blank" class="text-red">
           <i class="fa-brands fa-facebook"></i>
         </a>
         </div>
         <div v-if="socials.facebook_id">
         <a :href="`https://facebook.com/${socials.facebook_id}`" target="_blank" class="text-red">
           <i class="fa-brands fa-facebook"></i>
         </a> 
         </div>
         <div v-if="socials.instagram_id == null || socials.instagram_id == undefined">
           <a href="https://instagram.com" target="_blank" class="text-red">
           <i class="fa-brands fa-instagram"></i>
         </a>
         </div>
         <div v-if="socials.instagram_id">
         <a :href="`https://instagram.com/${socials.instagram_id}`" target="_blank" class="text-red">
           <i class="fa-brands fa-instagram"></i>
         </a> 
         </div>
         <div v-if="socials.twitter_id == null || socials.twitter_id == undefined ">
        <a href="https://twitter.com/" class="text-red" target="_blank">
          <i class="fa-brands fa-twitter"></i>        
        </a>  
         </div>
         <div v-if="socials.twitter_id">
          <a :href="`https://twitter.com/${socials.twitter_id}`" class="text-red" target="_blank">
          <i class="fa-brands fa-twitter"></i>        
        </a>
         </div>
       
        <div >
          <a :href="`https://en.wikipedia.org/wiki/${theactor.name}`" class="text-red" target="_blank">
          <i class="fa-brands fa-wikipedia-w"></i>       
        </a>
        </div>
      
        
         </div> 
         </div>
         <div class="thetext">
           <h3>{{ theactor.name }}</h3>
           <div class="date">
           <i class="fa-solid fa-cake-candles text-red"></i>
           <span>{{ theactor.birthday }}</span>
           </div>
           <p>{{ theactor.biography }}</p>
         </div>
        </div>

        <div class="konwn my-5">
        <h2 class="my-7 text-h3 text-center">konwn for</h2>
        <div class="mainboxx">
        <div class="boxx" v-for="box in known">
        <router-link :to="{name:box.media_type=='movie'?'movie':'show', params:{id:box.id}}">
                  <v-img
                 :src="`https://image.tmdb.org/t/p/w500/${box.poster_path}`"
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
        </router-link>
        
        </div>
        </div>
        </div>
        <hr>
        <div class="credit">
         <h2 class="my-7 text-h3 text-center">credits</h2>
         <ul>
          <li v-for="box in credit">
          
          <router-link :to="{name:box.media_type=='movie'?'movie':'show', params:{id:box.id}}">
          <div class="textt">
           <span>{{ box.release_date || box.first_air_date  }}</span>
           <h3>{{ box.original_title || box.name}}</h3>
           <p>as {{ box.character }}</p> 
           <p>( {{ box.media_type }} )</p> 
          </div>
          
          </router-link>
         
          </li>
         </ul>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios'

export default {
    props:['id'],
    setup(props) {
    let theactor = ref([]);
    let socials = ref([]);
    let mainurl = ref('https://api.themoviedb.org/3/');
    let apiKey = ref('api_key=3c289cb485bdb60445b81e5e30650fb0');
        let known = ref([]);
        let credit = ref([]);
    const getTheActor = async () => {
        let result = await axios.get(`${mainurl.value}/person/${props.id}?${apiKey.value}`);
        let result2 = await axios.get(`${mainurl.value}/person/${props.id}/external_ids?${apiKey.value}`);
        let result3 = await axios.get(`${mainurl.value}/person/${props.id}/combined_credits?${apiKey.value}`);
        console.log(result.data);
        console.log(result2.data);
        console.log(result3.data.cast);
        credit.value = result3.data.cast;
        theactor.value = result.data;
        socials.value = result2.data;
        known.value = result3.data.cast.splice(0, 6);
        console.log(known.value);
        }
        getTheActor();
        onMounted(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        })
       return{theactor, socials, known, credit}
    }
}

</script>

<style lang="scss">
.mainActor{
    display: flex;
    align-items: center;
    width: 95%;
    margin: 50px auto;
    gap: 30px;
    .image{
        width: 50%;
        background-color: #fff;
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.402);
        border-radius: 20px;
        .iconss{
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          gap: 20px;
          i{
            font-size: 30px;

          }

        }
        img{
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            width: 100%;
        }
    }
    .thetext{
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 50px;
        h3{
            font-size: 35px;
            font-weight: bolder;
        }
        p{
            line-height: 30px;
        }
        .date{
            display: flex;
            align-items: center;
            gap: 5px;
            i{
                font-size: 22px;
            }
            span{
                font-size: 20px;
            }
        }
    }
}
.konwn{
    .mainboxx{
        display: grid;
        grid-template-columns: repeat(3 , 1fr);
        gap: 20px;
        width: 95%;
        margin: 20px auto;
        .boxx{
        //    height: 550px;
        box-shadow: 5px 3px 10px 5px rgba(0, 0, 0, 0.373);
           img{
            height: 100%;
            width: 100%;
           }
        }
    }
}

.credit{
    width: 80%;
    margin: 30px auto;
    ul{
        
        display: flex;
        flex-direction: column;
        gap: 30px;
        li{
            // width: 60%;
            padding: 10px;
        }
        .textt{
            display: flex;
            align-items: center;
            justify-content: center; 
            gap: 10px;
            color: #333;
            text-decoration: none;
            transition: 0.5s;
            background-color: rgba(128, 128, 128, 0.292);
            &:hover{
                background-color: gray;
            }
        
        }
        a{
            
            text-decoration: none;
        }
       
    }
}

@media(max-width:770px){
    .mainActor{
        flex-direction: column;
        .image{
            width: 90%;
        }
        .thetext{
            text-align: center;
            width: 90%;
            .date{
                justify-content: center;
            }
        }
    }
}
@media(max-width:850px){
    .konwn{
        .mainboxx{
            width: 80%;
            grid-template-columns: repeat(2,1fr);
        }
    }
    .credit{
        ul{
        li{
            width: 100%;
            .textt{
                flex-direction: column;
            }
        }
        }
        
    }
}
@media(max-width:600px){
    .konwn{
        .mainboxx{
            grid-template-columns: repeat(1,1fr);
        }
    }
}

</style>