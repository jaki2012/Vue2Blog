  // The Vue build version to load with the `import` command
  // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  // import store from '.store'
  import {store} from './store'
  import App from './App'
  import Icons from './components/Icons.vue'
  import Fav from './components/Fav.vue'
  
  // console.log(store.store.state.hide);
  
  console.log(store.state.hide);
  Vue.use(VueRouter);

  const routes = [
    { path: '', component: Icons },
    { path: '/fav', component: Fav }
  ]
  const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
  })

  const icons = new Vue({
    router
  }).$mount('#icons-bar')


  /* eslint-disable no-new */
  var app = new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
  })

  var position = new Vue({
    el: '#position',
    computed: {
      show() {
        return store.state.hide;
      }
    },
    methods: {
      increment () {
        console.log("I am clicked");
        store.commit('increment')
      }
    }
  })

  var motto = new Vue({
    el: '#motto',
    data: {
      motto:'"我怎能轻易倒下，我的背后空无一人"'
    },
    computed: {
      show() {
        return store.state.hide;
      }
    },
    methods: {
      increment () {
        console.log("I am clicked");
        store.commit('increment')
      }
    }
  })

  exports.position = position;
  exports.motto = motto;