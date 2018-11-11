<template>
    <div class="sign">
        <p><router-link to="login">登陆</router-link></p>
        <div class="input-form">
            <p class="title">忘记密码</p>
            <label><input v-model="formData.email" type="email" placeholder="请输入注册时邮箱"></label>
            <button @click="resetPass" class="btn red-btn">确定</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                formData:{
                    email:'',
                    baseUrl:'ChangePass'
                },
            }
        },
        methods:{
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
