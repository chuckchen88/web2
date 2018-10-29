<template>
    <header class="header" v-bind:class="{'navcolor':showcolor}">
        <div class="navs">
            <div class="content">
                <div class="nav-icon fl-l" @click="goHis"><img width="20" style="margin-top:.2em;" src="../assets/images/arr-back.png"></div>
                <div class="nav-title text-center">{{navname}}</div>
            </div>
            <div class="clear"></div>
        </div>
    </header>
</template>

<script>
    export default {
        props: {showcolor:Boolean,navname:String},
        data(){
            return{

            }
        },
        methods:{
            goHis(){
                this.$router.go(-1);
            }
        }
    }
</script>

