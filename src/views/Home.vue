<template>
  <div>
    <b-btn
      variant="primary"
      @click="sortMoviesList">Сортировать: <span class="caret" :class="{'caret-down': caretReverse}"></span>
    </b-btn>

    <hr class="py-2">

    <div class="home">
      <div
        v-for="movie in moviesList"
        :key="movie.id"
      >
        <div class="shadow-sm py-2">
          <div class="title">
            <h5 v-cut-title>{{movie.title}}</h5>
          </div>
          <div>
            <img class="image w-75" :src="posterUrl + movie.poster_path" alt="">
          </div>
          <div>
            <div class="description py-2 px-3">
              <read-more more-str="Ещё..." :text="movie.overview" link="#" less-str="Скрыть"
                         :max-chars="25"></read-more>
            </div>
            <b-btn variant="outline-warning" @click="addToFavorite(movie)">В избранное</b-btn>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .caret{
    margin: 8px;
    border-bottom: 10px solid #fff;
    border-left: 6px solid rgba(0, 0, 0, 0);
    border-right: 6px solid rgba(0, 0, 0, 0);
    content: "";
    display: inline-block;
    height: 0;
    vertical-align: top;
    width: 0;
    &-down{
      transform: rotate(180deg);
    }
  }
  .home {
    padding: 0 25px;
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
  @media (max-width: 600px) {
    .home {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .home {
      grid-template-columns: 1fr;
    }
  }
</style>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      caretReverse: false,
      posterUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/',
    }
  },
  computed: {
    favoriteList() {
      return this.$store.state.favouriteList
    },
    moviesList() {
      return this.$store.state.moviesList
    }
  },
  methods: {
    addToFavorite(item){
      this.makeToast(item)
      this.$store.dispatch('addToFavourite', item.id)
    },
    makeToast(item) {
      let existFilm = this.favoriteList.find(movie => {
        return movie.id === item.id
      })
      if (existFilm) {
        this.$bvToast.toast(`Фильм ${item.title} ранее уже был добавлен в избранное`, {
          title: 'Внимание',
          autoHideDelay: 5000,
        })

      } else {
        this.$bvToast.toast(`Фильм ${item.title} добавлен в избранное`, {
          title: 'Готово',
          autoHideDelay: 5000,
        })
      }
    },
    fetchMovies() {
      this.$store.dispatch('fetchMovieList')
    },
    sortMoviesList(){
      this.caretReverse = !this.caretReverse
      this.$store.dispatch('reverseMoviesList')
    }
  },
  mounted() {
    this.fetchMovies()
  }
}
</script>
