<template>
    <div class="sign">
        <p><router-link to="login">登陆</router-link></p>
        <div class="input-form">
            <p class="title">注册</p>
            <label><input type="text" placeholder="用户名"></label>
            <label><input type="email" placeholder="邮箱"></label>
            <label><input type="password" placeholder="密码"></label>
            <label><input type="password" placeholder="确认密码"></label>
            <button class="btn red-btn">注册</button>
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
