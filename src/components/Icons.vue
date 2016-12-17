<template>
    <footer>
        <ul class="icons">
            <li><a href="#" class="fa-twitter">Twitter</a></li>
            <li><a href="https://www.github.com/jaki2012" class="fa-github">Github</a></li>
            <li><router-link to="/fav" class="fa-star" id="fav">Star</router-link></li>
            <p>点击星星图标发现惊喜！</p>
        </ul>
    </footer>
</template>

<script>
import Vue from 'vue';
import position from '../main'
import motto from '../main'

console.log("hahah"+ motto.$data);    

export default {
    methods :{
      turnAround: function(){
      position.show = !position.show;
      motto.show = !motto.show;
    }
  }
}
</script>