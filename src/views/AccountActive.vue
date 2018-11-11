<template>
    <div class="account-active">
        <sign-message :myContent="content">

        </sign-message>
    </div>
</template>

<script>

    import SignMessage from '@/components/SignMessage.vue'
    import axios from 'axios';
    export default {
        name: "AccountActive",
        data(){
            return{
                num:5,
                content:''
            }
        },
        components:{
            SignMessage
        },
        mounted(){
           this.AccountActive()
        },
        methods:{
            AccountActive(){
                let that = this
                let key = this.$route.params.key;
                let name = this.$route.params.name;
                //请求后台激活接口
                axios.get('/api/v1/active_account/'+key+'/'+name)
                    .then(function (response) {console.log(response.data);
                        if(response.data.code == 201){
                            that.content = response.data.msg
                        }else if(response.data.code == 200){
                            that.CountDown()
                        }else{
                            that.content = '网络错误，请稍后重试'
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            },
            CountDown(){
                let that = this
                var i = 5;
                var timer = setInterval(function() {
                    if(i<=1){
                        clearInterval(timer);
                        that.$router.push({
                            path:'/login'
                        })
                    }
                    i--;
                    that.num = i;
                    that.content = '激活成功<br><span>'+that.num+'</span>秒后自动跳转<a href="/login" style="text-decoration: underline">登录</a>'
                },1000);
            }
        }
    }
</script>

<style scoped>

</style>
