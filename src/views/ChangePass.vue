<template>
    <div class="sign">
        <p><router-link to="/login">登陆</router-link></p>
        <div class="input-form">
            <p class="title">修改密码</p>
            <label><input v-model="formData.psw" type="password" placeholder="新密码"></label>
            <label><input v-model="formData.repsw" type="password" placeholder="确认新密码"></label>
            <button @click="updatePass" class="btn red-btn">确定</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                formData:{
                    psw:'',
                    repsw:'',
                    key:this.$route.params.key,
                    name:this.$route.params.name
                },
            }
        },
        mounted(){
            this.checkEmailInfo()
        },
        methods:{
            checkEmailInfo(){
                let that = this
                let key = this.$route.params.key;
                let name = this.$route.params.name;
                //请求后台激活接口
                axios.get('/api/v1/checkemail/'+key+'/'+name)
                    .then(function (response) {
                        if(response.data.code == 201){
                            that.$router.push({name:'ShowMessage',params:{con:response.data.msg}});
                        }else{
                            that.content = '网络错误，请稍后重试'
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            },
            updatePass(){
                let that = this
                if(!this.formData.psw || this.formData.psw.length < 2 || this.formData.psw.length > 12){
                    that.$toast.top('密码需要2-12位字符');
                }else if(this.formData.psw != this.formData.repsw){
                    that.$toast.top('两次密码不一致');
                }else{
                    axios.post('/api/v1/updatePass',this.formData)
                        .then(function (response) {
                            if(response.data.code == 201){
                                that.$toast.top(response.data.msg);
                            }else if(response.data.code == 200){
                                that.$toast.top(response.data.msg);
                                that.$router.push({path:'/login'});
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
