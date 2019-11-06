import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {MOVIE_DB_API_KEY, MOVIE_DB_BASE_URI} from "../main";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    moviesList: [],
    favouriteList: []
  },
  mutations: {
    setMoviesList(state, movieArray) {
      state.moviesList.push(...movieArray)
    },
    setFavouriteList(state, favouriteItem) {
      state.favouriteList = [...state.favouriteList, ...favouriteItem]
    },
    setNewArray(state, newArray) {
      state.favouriteList = newArray
    },
    serReverseMoviesList(state, reverseMoviesList) {
      state.moviesList = reverseMoviesList
    }
  },
  actions: {
    removeFromFavourite({commit, state}, itemId){
     let removed = state.favouriteList.filter(movie => movie.id !== itemId)
      commit('setNewArray', removed)
    },
    addToFavourite({commit, state}, itemId) {
      let movieID = state.favouriteList.find(movie => {
        return movie.id === itemId
      })
      if (!movieID) {
        let movieToFavourite = state.moviesList.filter(movie => {
          return movie.id === itemId
        })
        commit('setFavouriteList', movieToFavourite)
      } else {
        console.info("Film already in favourite list")
      }
    },
    async fetchMovieList({dispatch, commit, state}) {
      if (state.moviesList.length < 100) {
        for(let i = 1; i < 6; ++i) {
          await dispatch('loadPage', i);
        }
      } else {
        commit('setMoviesList', [])
      }
},
    async loadPage({commit}, page = 1) {
      const {data} = await axios.get(`${MOVIE_DB_BASE_URI}/discover/movie`, {
        params: {
          api_key: MOVIE_DB_API_KEY,
          sort_by: 'popularity.desc',
          page: page

        }
      })
      commit('setMoviesList', data.results)

      return data.results;
    },
    reverseMoviesList({commit, state}) {
      let movies = state.moviesList
      movies.reverse()
      commit('serReverseMoviesList', movies)
    }
  },
  modules: {
  }


})
