<template>
    <div class="sign">
        <p><router-link to="sign">注册</router-link></p>
        <div class="input-form">
            <p class="title">登陆</p>
            <label><input v-model="formData.loginname" type="text" placeholder="用户名/邮箱"></label>
            <label><input v-model="formData.pass" type="password" placeholder="密码"></label>
            <p class="reset"><router-link to="lostpass">忘记密码</router-link></p>
            <button @click="onlogin" class="btn red-btn">登陆</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                formData:{
                    loginname:'',
                    pass:'',
                    baseUrl:'AccountActive'
                },
            }
        },
        methods:{
            onlogin(){
                var that = this;
                var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(!regEmail.test(this.formData.loginname)){
                    if(!this.formData.loginname || this.formData.loginname.length < 2 || this.formData.loginname.length > 12){
                        that.$toast.top('用户名需要2-12位字符');
                    }else if(!this.formData.pass || this.formData.pass.length < 2 || this.formData.pass.length > 12){
                        that.$toast.top('密码需要2-12位字符');
                    }else{
                        that.submit()
                    }
                }else{
                    if(!this.formData.pass || this.formData.pass.length < 2 || this.formData.pass.length > 12){
                        that.$toast.top('密码需要2-12位字符');
                    }else{
                        that.submit()
                    }
                }
            },
            submit(){
                let that = this
                axios.post('/api/v1/login',this.formData)
                    .then(function (response) {
                        if(response.data.code == 201){
                            that.$toast.top(response.data.msg);
                        }else if(response.data.code == 202){   //提示 未激活
                            that.$router.push({name:'ShowMessage',params:{con:response.data.msg}});
                        }else if(response.data.code == 200){
                            that.$store.commit('$_setStorage', {user: response.data.data})
                            that.$toast.top('登陆成功');
                            that.$router.push({path:'/personal'})
                        }else{
                            that.$toast.top('网络错误，请稍后重试');
                        }
                    })
                    .catch(function (error) {console.log(error);
                        that.$toast.top('网络错误，请稍后重试');
                    });
            }
        }
    }
</script>

<style scoped>

</style>
