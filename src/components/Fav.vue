<template>
    <footer>
        <ul class="icons">
            <!--<li class="favforjaki">
                <p>已有{{}}人为他点过赞！</p>
            </li>-->
            <li><a id='favcount' class="favcount"><span class='text'>{{a}}赞</span><a></li>
            <li>
                <a class="fa-heart md-trigger" @click="fav" data-modal="modal-9">Heart</a>
            </li>
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
import $ from 'jquery'
import position from '../main'
import motto from '../main' 
import modalEffects from '../assets/js/modalEffects.js'

var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random();   
var ip =""; 

// $.getJSON(url, function(data){  
//      console.log("显示：IP【"+data.Ip+"】 地址【"+data.Isp+"】 浏览器【"+data.Browser+"】 系统【"+data.OS+"】");
//     // $("#b").html("显示：IP【"+data.Ip+"】 地址【"+data.Isp+"】 浏览器【"+data.Browser+"】 系统【"+data.OS+"】");
//     var ipsegments = data.Ip.split('.');
//     //console.log(ipsegments);
//     //ip = ipsegments[0] + ipsegments[1] + ipsegments[2] + ipsegments[3];
//     //.需要转义字符
//     var reg = /\./g  ;
//     ip = data.Ip.replace(reg,'a');
//     console.log(ip);
// });
    // $.ajaxSetup({
    //     async: false
    // });

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

// var testIp = '111a222a333a344';
// var updates = {};
// updates[testIp] = 2;
// var testRef = firebase.database().ref('ipfaved1');
// testRef.update(updates);

// Reference
var key = ref.key;
var rootRef = ref.root;

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
  });
}

function updateFavCount(newFavCount){
    firebase.database().ref("blogstate").set({
        favcount: newFavCount+1
    })
}

function updateFavedIp(ip){
    console.log("");
    firebase.database().ref("ipfaved").set({
        
    })
}

function getFavCount(){
    ref.on('value', function(snapshot) {
      console.log(snapshot.val());
    });   
}

	function init() {

		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md-close' );

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md-show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md-setperspective' ) ); 
			}

			el.addEventListener( 'click', function( ev ) {
				classie.add( modal, 'md-show' );
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

				if( classie.has( el, 'md-setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}
			});

			close.addEventListener( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});

            console.log("sss");

		} );

	}

//writeUserData(1,'jaki','lijiechu@qq.com','jaki.com/jaki.jpeg')
// The "data" option should be a function that returns a per-instance value in component definitions. 

export default {
    data() {
        return {
            a: null,
            faved:false,
            ipRef:firebase.database().ref('ipfaved1')
        }
    },
    computed:{
        count(){
            return store.state.count;
        }
    },
    created: function() { 
      // DataSnapshot
      ref.on('value', function(snapshot) {
         this.a = snapshot.val();
      }, this.$data);

      $.ajax({
  url: url,
  dataType: 'json',
  success: function(data) {
     console.log("显示：IP【"+data.Ip+"】 地址【"+data.Isp+"】 浏览器【"+data.Browser+"】 系统【"+data.OS+"】");
    // $("#b").html("显示：IP【"+data.Ip+"】 地址【"+data.Isp+"】 浏览器【"+data.Browser+"】 系统【"+data.OS+"】");
    var ipsegments = data.Ip.split('.');
    //console.log(ipsegments);
    //ip = ipsegments[0] + ipsegments[1] + ipsegments[2] + ipsegments[3];
    //.需要转义字符
    var reg = /\./g  ;
    ip = data.Ip.replace(reg,'a');
    console.log(ip);
  }
});
 
    },
    mounted: function() {
      init();
    },
    methods: {
        fav(){
      var ipRef = this.ipRef;
      //防止同一ip恶意刷赞
      //在vue的生命周期中 jquery请求都会在vue实例完成后才执行完
      console.log("haha"+ip);
      ipRef = ipRef.child(ip);
      console.log(ipRef.key);


      //异步请求永远存在数据不同步问题。
      ipRef.once('value',function(snapshot){
          if(null != snapshot.val()){
              console.log(snapshot.val())
              this.faved = true;
          }else{
              this.faved = false;
          }
          store.commit('fav')
          //writeUserData(2,'jaki','lijiechu@qq.com','jaki.com/jaki.jpeg')
          console.log("favValidation"+this.faved);
          if(!this.faved){
              updateFavCount(this.a);
              var updates = {};
              updates[ip] = 1;
              var ipRef = firebase.database().ref('ipfaved1/');
              ipRef.update(updates);
           } else {
               alert('you have faved!');
           }
      },this.$data);
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