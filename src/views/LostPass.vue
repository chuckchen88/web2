<template>
    <div class="sign">
        <p><router-link to="login">登陆</router-link></p>
        <div class="input-form">
            <p class="title">忘记密码</p>
            <label><input type="email" placeholder="请输入注册时邮箱"></label>
            <button class="btn red-btn">确定</button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>
