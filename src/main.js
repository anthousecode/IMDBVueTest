import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import ReadMore from 'vue-read-more';
import cutTitle from './helpers/cutTitle'
import fa from './assets/fa/js/all.min'

Vue.directive('cut-title', cutTitle);
Vue.use(ReadMore);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

export const MOVIE_DB_API_KEY = '033ed82ce00527f83633b885dbe8ec26';
export const MOVIE_DB_BASE_URI = ' https://api.themoviedb.org/3';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
