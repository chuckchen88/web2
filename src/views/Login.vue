<template>
    <div class="sign">
        <p><router-link to="sign">注册</router-link></p>
        <div class="input-form">
            <p class="title">登陆</p>
            <label><input type="text" placeholder="用户名/邮箱"></label>
            <label><input type="password" placeholder="密码"></label>
            <p class="reset"><router-link to="lostpass">忘记密码</router-link></p>
            <button class="btn red-btn">登陆</button>
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
