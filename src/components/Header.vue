<template>
    <header class="header" v-bind:class="{'navcolor':showcolor}">
        <div class="navs">
            <div class="content">
                <div class="nav-icon fl-l" @click="showNav"><img width="24" style="margin-top:.2em;" src="../assets/images/nav-icon.png"></div>
                <div class="nav-title text-center">{{navname}}</div>
                <div class="per-icon fl-r"><i v-show="myNews" class="red-dot"></i><router-link to="/personal"><img width="22" style="margin-top:.2em;" src="../assets/images/per-icon.png"></router-link></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="masker" v-bind:class="{'show':isshow}"></div>
        <div class="close" v-bind:class="{'show':isshow}" @click="closeNav"><img width="18" src="../assets/images/close.png"></div>
        <ul class="nav-list" v-bind:class="{'show':isshow}">
            <li class="active"><router-link to="/">首页</router-link></li>
            <li><router-link to="/blog"><a href="">博客</a></router-link></li>
            <li><router-link to="/works">作品</router-link></li>
            <li><router-link to="/chatgroup">聊天室</router-link></li>
            <li><router-link to="/leavewords">留言</router-link></li>
        </ul>
    </header>
</template>
<script>
    export default {
       props: {showcolor:Boolean,navname:String},
        data(){
            return{
                isshow:false,
                myNews:this.$store.state.myNews
            }
        },
        mounted(){
           if(this.$store.getters.getMyNews){
               this.$store.state.myNews = this.$store.getters.getMyNews
               this.myNews = this.$store.getters.getMyNews
           }
        },
        methods:{
            showNav(){
                this.isshow = true
            },
            closeNav(){
                this.isshow = false
            }
        }
    }
</script>

