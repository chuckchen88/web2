<template>
    <div class="news-details">
        <header-details :showcolor="shownavcolor" :navname="shownavname"></header-details>
        <div class="con">
            <h2>{{msg.title}}</h2>
            <p class="t">{{ msg.create_at | moment }}</p>
            <div class="content">
                {{msg.content}}
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderDetails from "../components/HeaderDetails";
    import axios from 'axios'
    export default {
        name: "NewsDetails",
        components: {HeaderDetails},
        data(){
            return{
                shownavcolor:true,
                shownavname:'消息详情',
                msg:[]
            }
        },
        mounted(){
            this.details()
        },
        methods:{
            details(){
                let that = this
                let id = this.$route.params.id;
                //请求后台激活接口
                axios.get('/api/v1/sysmsgs/'+id)
                    .then(function (response) {console.log(response.data);
                        if(response.data.code == 201){
                            that.content = response.data.msg
                        }else if(response.data.code == 200){
                            that.msg = response.data.data
                        }else{
                            that.content = '网络错误，请稍后重试'
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            }
        }
    }
</script>

<style scoped>

</style>
