<template>
  <div>
  <div v-if="!favoriteList.length" class="text-center"><h3>В списке избранных пусто</h3><router-link to="/" tag="a">Добавить новые</router-link></div>
   <div class="home" v-else>
     <div v-for="movie in favoriteList"
          :key="movie.id"
     >
       <div class="shadow-sm py-2">
         <div class="title py-2">
           <h5 v-cut-title>{{movie.title}}</h5>
         </div>
         <div>
           <img class="image w-75" :src="posterUrl + movie.poster_path" alt="">
         </div>
         <div>
           <div class="description py-2 px-3">
             <read-more more-str="Ещё..." :text="movie.overview" link="#" less-str="Скрыть" :max-chars="25"></read-more>
           </div>
           <b-btn variant="outline-danger" @click="removeMovie(movie)">Удалить</b-btn>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
  // @ is an alias to /
  export default {
    name: 'favourite',
    data () {
      return {
        posterUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/',
      }
    },
    computed: {
      favoriteList() {
        return this.$store.state.favouriteList
      }
    },
    methods: {
      makeToast(item) {
        this.$bvToast.toast(`Фильм ${item.title} был успешно удалён.`, {
          title: 'Готово',
          autoHideDelay: 5000,
        })
      },
      removeMovie(item) {
        this.makeToast(item)
        this.$store.dispatch('removeFromFavourite', item.id)
      }
    }
  }
</script>
<style lang="scss">
  .home {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
  }
  .image {
    max-height: 300px;
    height: 100%;
  }
  .favourite-icon {
    background-color: yellow;
    cursor: pointer;
    font-size: 50px;
  }
  @media (max-width: 768px) {
    .home {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 576px) {
    .home {
      grid-template-columns: 1fr;
    }
  }
</style>