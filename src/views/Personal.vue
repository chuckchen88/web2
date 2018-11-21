<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="personal">
            <div class="top">
                <div class="head-img">
                    <input type="file" accept="image/*" @change="update" style="opacity:0;position: absolute;width:50px;height:50px;">
                    <img style="max-width: 50px;max-height:50px;" :src="avatar">
                </div>
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
            update(e){
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                param.append('file',file,file.name);//通过append向form对象添加数据
                param.append('chunk','0');//添加form表单中其他数据
                console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                axios.post('/api/v1/upload',param,config)
                    .then(res=>{
                        if(res.data.code == 403 || res.data.code == 408){
                            this.$router.push({path:'/login'})
                        }else if(res.data.code == 0){
                            this.avatar = res.data.data.src
                            let that = this
                            axios.post('/api/v1/changeAvatar',{avatar:this.avatar})
                                .then(function (response) {
                                    if(response.data.code == 201){
                                        that.$toast.top(response.data.msg);
                                    }else if(response.data.code == 200){
                                        that.$toast.top(response.data.msg);
                                        that.getUserInfo()
                                    }else{
                                        that.$toast.top('网络错误，请稍后重试');
                                    }
                                }).catch(function (error) {
                                    that.$toast.top('网络错误，请稍后重试');
                                });
                        }else{
                            this.$toast.top('网络错误，请稍后重试');
                        }
                    })
            },
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
                            console.log(response.data.data)
                            if(response.data.data){
                                that.notReadCount = response.data.data
                                that.$store.commit('$_setMyNews')
                            }else{
                                that.$store.commit('$_removeMyNews')
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
                            that.$store.commit('$_removeMyNews')
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
