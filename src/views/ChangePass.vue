<template>
    <div class="sign">
        <p><router-link to="login">登陆</router-link></p>
        <div class="input-form">
            <p class="title">修改密码</p>
            <label><input type="password" placeholder="新密码"></label>
            <label><input type="password" placeholder="确认新密码"></label>
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
