<template>
    <div class="sign-message">
        <div class="txt" v-html="myContent">

        </div>
    </div>
</template>

<script>
    export default {
        props:{myContent:String},
        name: "SignMessage",
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .sign-message{
        width:100vw;
        height:100vh;
        background:url("../assets/images/sign_bg.jpg");
        background-size:cover;
    }
    .txt{
        padding:10em .5em;
        text-align:center;
        font-size:1.2em;
        color:white;
    }
</style>
