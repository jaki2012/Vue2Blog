import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



const store = new Vuex.Store({
  state: {
    hide: true,
    count: 0
  },
  mutations: {
  	increment: state => state.hide = !state.hide,
    fav: state => state.count++
  }
})


var a = 1;

// module.exports = {
//   test: store
// }
export  {  a, store}