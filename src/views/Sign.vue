<template>
    <div class="sign">
        <p><router-link to="login">登陆</router-link></p>
        <div class="input-form">
            <p class="title">注册</p>
            <label><input v-model="formData.loginname" type="text" placeholder="用户名"></label>
            <label><input v-model="formData.email" type="email" placeholder="邮箱"></label>
            <label><input v-model="formData.pass" type="password" placeholder="密码"></label>
            <label><input v-model="formData.re_pass" type="password" placeholder="确认密码"></label>
            <button @click="checkForm" class="btn red-btn">注册</button>
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
                    email:'',
                    pass:'',
                    passwordRepeat:'',
                    baseUrl:'AccountActive'
                },
            }
        },
        methods:{
            checkForm(){
                var that = this;
                var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(!this.formData.loginname || this.formData.loginname.length < 2 || this.formData.loginname.length > 12){
                    that.$toast.top('用户名需要2-12位字符');
                }else if(!regEmail.test(this.formData.email)){
                    that.$toast.top('请填写正确的邮箱');
                }else if(!this.formData.pass || this.formData.pass.length < 2 || this.formData.pass.length > 12){
                    that.$toast.top('密码需要2-12位字符');
                }else if(this.formData.pass != this.formData.re_pass){
                    that.$toast.top('两次密码不一致');
                }else if(!this.formData.re_pass || this.formData.re_pass.length < 2 || this.formData.re_pass.length > 12){
                    that.$toast.top('重复密码需要2-12位字符');
                }else{
                    axios.post('/api/v1/signup',this.formData)
                        .then(function (response) {
                            if(response.data.code == 201){
                                that.$toast.top(response.data.msg);
                            }else if(response.data.code == 200){
                                console.log('注册成功');
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
