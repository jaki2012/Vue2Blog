<template>
    <footer>
        <ul class="icons">
            <!--<li class="favforjaki">
                <p>已有{{}}人为他点过赞！</p>
            </li>-->
            <li><a id='favcount' class="favcount"><span class='text'>{{a}}赞</span><a></li>
            <li>
                <a class="fa-heart md-trigger" @click="fav" data-modal="modal-9">Heart</a>
                <div class="md-modal md-effect-9" id="modal-9">
                    <div class="md-content">
                        <!--<h3>Modal Dialog</h3>-->
                        <div>
                            <p></p>
                            <ul>
                                <li><strong>Read:</strong> modal windows will probably tell you something important so don't
                                    forget to read what they say.</li>
                                <li><strong>Close:</strong> click on the button below to close the modal.</li>
                            </ul>
                            <button class="md-close">Close me!</button>
                        </div>
                    </div>
                </div>
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
var ip = ""; 
$.getJSON(url, function(data){  
     console.log("显示：IP【"+data.Ip+"】 地址【"+data.Isp+"】 浏览器【"+data.Browser+"】 系统【"+data.OS+"】");
    // $("#b").html("显示：IP【"+data.Ip+"】 地址【"+data.Isp+"】 浏览器【"+data.Browser+"】 系统【"+data.OS+"】");
    var ipsegments = data.Ip.split('.');
    //console.log(ipsegments);
    //ip = ipsegments[0] + ipsegments[1] + ipsegments[2] + ipsegments[3];
    //.需要转义字符
    var reg = /\./g  ;
    ip = data.Ip.replace(reg,'a');
    console.log(ip);
});


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

// var testIp = '111a222a333a344';
// var updates = {};
// updates[testIp] = 2;
// var testRef = firebase.database().ref('ipfaved1');
// testRef.update(updates);

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
    console.log("i got here");  
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

		} );

	}

//writeUserData(1,'jaki','lijiechu@qq.com','jaki.com/jaki.jpeg')
// The "data" option should be a function that returns a per-instance value in component definitions. 

export default {
    data() {
        return {
            a: null,
            faved:null
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
            init();
            store.commit('fav')
            //writeUserData(2,'jaki','lijiechu@qq.com','jaki.com/jaki.jpeg')
            //updateFavCount(this.a);
            getFavCount();
            
            //防止同一ip恶意刷赞
            var favValidation = { clicked : false};
            var ipRef = firebase.database().ref('ipfaved1/'+ip);
            ipRef.on('value', function(snapshot) {
                this.clicked = true;
            }, favValidation);

            if(favValidation.clicked){
                updateFavCount(this.a);
                var updates = {};
                updates[ip] = 1;
                console.log(ipRef,ipRef.parent);
                ipRef.parent.update(updates);
            }else {
                alert('you have faved!');
            }
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