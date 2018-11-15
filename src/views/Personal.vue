<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="personal">
            <div class="top">
                <div class="head-img"><img :src="avatar"></div>
                <h2>{{loginname}}</h2>
                <p>{{email}}</p>
            </div>
            <div class="list">
                <ul>
                    <li @click="resetPass">
                        修改密码<img class="fl-r arr" src="../assets/images/arr.png">
                    </li>
                    <li v-show="false">
                        修改邮箱<img class="fl-r arr" src="../assets/images/arr.png">
                    </li>
                </ul>
            </div>
            <div class="list">
                <ul>
                    <router-link to="/personal/news">
                        <li>
                            我的消息<div class="fl-r n"><span v-show="notReadCount">{{notReadCount}}</span><img v-show="!notReadCount" class="fl-r arr" src="../assets/images/arr.png"></div>
                        </li>
                    </router-link>
                    <router-link to="/personal/article">
                    <li>
                        我赞过的文章<img class="fl-r arr" src="../assets/images/arr.png">
                    </li>
                    </router-link>
                </ul>
            </div>
            <div class="list">
                <ul>
                    <li>
                        本站版本<div class="fl-r">1.0.0&nbsp;</div>
                    </li>
                </ul>
            </div>
            <div class="logout-btn"><button @click="signout" class="btn grey-btn">退出登陆</button></div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from '@/components/Header.vue'
    import NavFooter from '@/components/Footer.vue'
    import axios from 'axios';
    export default {
        data(){
            return{
                shownavcolor:false,
                shownavname:'我',
                loginname:'',
                email:'',
                avatar:'',
                formData:{
                    email:'',
                    baseUrl:'ChangePass'
                },
                notReadCount:0
            }
        },
        components:{
            NavHeader,
            NavFooter
        },
        mounted(){
            this.getUserInfo()
            this.getNotReadCount()
        },
        methods:{
            getUserInfo(){
                let that = this
                axios.get('/api/v1/getuserinfo')
                    .then(function (response) {
                        if(response.data.code == 201 || response.data.code == 403){
                            that.$router.push({path:'/login'})
                        }else if(response.data.code == 200){
                            console.log(response.data);
                            that.loginname = response.data.data.loginname
                            that.email = response.data.data.email
                            that.avatar = response.data.data.avatar
                            that.formData.email = response.data.data.email
                        }else{
                            that.$toast.top('网络错误，请稍后重试');
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            },
            getNotReadCount(){
                let that = this
                axios.get('/api/v1/getuserinfo/notreadcount')
                    .then(function (response) {
                        if(response.data.code == 403){
                            that.$router.push({path:'/login'})
                        }else if(response.data.code == 200){
                            console.log(response.data)
                            if(response.data.data){
                                that.notReadCount = response.data.data
                                that.$store.state.myNews = true;
                            }else{
                                that.$store.state.myNews = false;
                            }
                        }else{
                            that.$toast.top('网络错误，请稍后重试');
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            },
            signout(){
                let that = this
                axios.get('/api/v1/signout')
                    .then(function (response) {
                        if(response.data.code == 403){
                            that.$router.push({path:'/login'})
                        }else if(response.data.code == 200){
                            that.$store.commit('$_removeStorage')
                            that.$router.push({path:'/login'})
                        }else{
                            that.$toast.top('网络错误，请稍后重试');
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            },
            resetPass(){
                let that = this
                var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(!regEmail.test(this.formData.email)){
                    that.$toast.top('请填写正确的邮箱');
                }else{
                    axios.post('/api/v1/forgetpass',this.formData)
                        .then(function (response) {
                            if(response.data.code == 201){
                                that.$toast.top(response.data.msg);
                            }else if(response.data.code == 200){
                                console.log('成功');
                                that.$router.push({name:'ShowMessage',params:{con:response.data.msg}});
                            }else{
                                that.$toast.top('网络错误，请稍后重试');
                            }
                        })
                        .catch(function (error) {
                            that.$toast.top('网络错误，请稍后重试');
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>
