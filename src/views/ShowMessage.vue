<template>
    <sign-message :myContent="content">

    </sign-message>
</template>

<script>
    import SignMessage from '@/components/SignMessage.vue'
    export default {
        name: "ShowMessage",
        data(){
            return{
                content:''
            }
        },
        components:{
            SignMessage
        },
        mounted(){
            let that = this
            if(!that.$route.params.con){
                that.$router.push({
                    path:'/login'
                })
            }else{
                that.content = that.$route.params.con
            }
        }
    }
</script>

<style scoped>

</style>
