<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="personal">
            <div class="top">
                <div class="head-img"><img src="../assets/images/head-img.png"></div>
                <h2>CHUCK CHEN</h2>
                <p>2811863274@qq.com</p>
            </div>
            <div class="list">
                <ul>
                    <li>
                        修改密码<img class="fl-r arr" src="../assets/images/arr.png">
                    </li>
                    <li>
                        修改邮箱<img class="fl-r arr" src="../assets/images/arr.png">
                    </li>
                </ul>
            </div>
            <div class="list">
                <ul>
                    <router-link to="/personal/news">
                        <li>
                            我的消息<div class="fl-r n"><span>2</span></div>
                        </li>
                    </router-link>
                    <li>
                        我的收藏<img class="fl-r arr" src="../assets/images/arr.png">
                    </li>
                </ul>
            </div>
            <div class="list">
                <ul>
                    <li>
                        本站版本<div class="fl-r">1.0.0&nbsp;</div>
                    </li>
                </ul>
            </div>
            <div class="logout-btn"><button class="btn grey-btn">退出登陆</button></div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from '@/components/Header.vue'
    import NavFooter from '@/components/Footer.vue'
    export default {
        data(){
            return{
                shownavcolor:false,
                shownavname:'我'
            }
        },
        components:{
            NavHeader,
            NavFooter
        },
    }
</script>

<style scoped>

</style>
