<template>
    <footer>
        <ul class="icons">
            <!--<li class="favforjaki">
                <p>已有{{}}人为他点过赞！</p>
            </li>-->
            <li><a id='favcount' class="favcount"><span class='text'>{{a}}赞</span><a></li>
            <li><a class="fa-heart" @click="fav">Heart</a></li>
            <li>
                <router-link to="/" class="fa-reply" id="fav"></router-link>
            </li>
            <p>点击心形图标为芒果侠集赞!</p>
        </ul>
    </footer>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase'
import {store} from '../store'
import position from '../main'
import motto from '../main' 

var config = {
  apiKey: "AIzaSyBVPxa51n5bJI5PQ9CMIAIsyGw3i5DH66w",
  authDomain: "vueblog-ce3e6.firebaseapp.com",
  databaseURL: "https://vueblog-ce3e6.firebaseio.com",
  storageBucket: "vueblog-ce3e6.appspot.com",
  messagingSenderId: "1055987677412"
};

firebase.initializeApp(config);

var rootRef = firebase.database().ref();
var ref = firebase.database().ref('blogstate/favcount');
console.log(ref);

// Reference
var key = ref.key;
console.log("key"+key);
var rootRef = ref.root;
console.log("rootRef"+rootRef);

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
  });
}

function updateFavCount(newFavCount){
    firebase.database().ref("blogstate").set({
        favcount: newFavCount
    })
}

function getFavCount(){
    ref.on('value', function(snapshot) {
      console.log(snapshot.val());
    });   
}

//writeUserData(1,'jaki','lijiechu@qq.com','jaki.com/jaki.jpeg')
// The "data" option should be a function that returns a per-instance value in component definitions. 

export default {
    data() {
        return {
            a: null
        }
    },
    computed:{
        count(){
            return store.state.count;
        }
    },
    // firebase: {
    //     favcount: ref
    // },
    created: function() { 
      // DataSnapshot
      console.log(this.$data.a)
      ref.on('value', function(snapshot) {
          console.log(snapshot.val());
         this.a = snapshot.val();
      }, this.$data);
      
    },
    methods: {
        fav(){
            store.commit('fav')
            //writeUserData(2,'jaki','lijiechu@qq.com','jaki.com/jaki.jpeg')
            updateFavCount(store.state.count)
            getFavCount();
        },
        update(newValue){
            this.a = newValue;
        }
    }
}
</script>

<style>
    p {
        font-family: 'Hanyiqihei'
    }
    
    .fa-reply {
        opacity: 0.7
    }
    
    .favcount {
        font-family: 'Hanyiqihei';
        text-indent: 0.1em!important;
        font-size: 100%;
    }
    /*将字体嵌入一个span巧妙化解圈大小的危机*/
    
    .text {
        font-size: 70%;
        color: #ff7496;
    }
</style>