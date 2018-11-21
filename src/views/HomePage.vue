<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="home">
            <div class="top">
                <div class="content">
                    <div class="logo"><img width="80" src="../assets/images/logo.png"></div>
                </div>
                <div class="txt">
                    <h1>CHUCK CHEN</h1>
                    <i></i>
                    <p>欢迎来到全球最与众不同的查克个人网站</p>
                </div>
                <div class="more"><img width="26" src="../assets/images/more_arr.png"></div>
            </div>
            <div class="about">
                <router-link to="/blog">
                    <div class="content">
                        <div class="txt">
                            <h1>MY BLOG</h1>
                            <i></i>
                        </div>
                        <div class="icons">
                            <ul>
                                <li>
                                    <div class="ic"><img width="32" src="../assets/images/study.png"></div>
                                    <h3>学习</h3>
                                    <p>
                                        这里有我的博客
                                    </p>
                                </li>
                                <li>
                                    <div class="ic"><img width="32" src="../assets/images/conm.png"></div>
                                    <h3>交流</h3>
                                    <p>
                                        这里有聊天室
                                    </p>
                                </li>
                                <li>
                                    <div class="ic"><img width="32" src="../assets/images/share.png"></div>
                                    <h3>分享</h3>
                                    <p>
                                        学习分享
                                    </p>
                                </li>
                                <div class="clear"></div>
                            </ul>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="works">
                <router-link to="/works">
                    <div class="content" style="padding:3em 0;">
                        <div class="txt">
                            <h1>MY WORKS</h1>
                            <i></i>
                        </div>

                    <div class="work-img"><img width="100%" src="../assets/images/home_works.jpg"></div>
                    </div>
                </router-link>
            </div>
            <div class="contact">
                <div class="content">
                    <div class="txt">
                        <h1>CONTACT ME</h1>
                        <i></i>
                    </div>
                    <div class="logo fl-l"><img width="80" src="../assets/images/home_con_logo.png"></div>
                    <div class="contact-ways fl-r">
                        <ul>
                            <li>
                                Email：2811863274@qq.com
                            </li>
                            <li>
                                Address：ShangHai China
                            </li>
                            <li>
                                QQ Group：311497335
                            </li>
                            <li>
                                <!--img src="../assets/images/home_17.png"-->
                                <a href="http://weibo.com/u/3824642305"><img src="../assets/images/home_19.png"></a>
                                <a href="https://github.com/chuckchen88"><img src="../assets/images/home_22.png"></a>
                                <a href="http://t.cn/Rig3aUs"><img src="../assets/images/home_24.png"></a>
                                <a href="http://i.youku.com/i/UNTg0OTQ4MTYw"><img src="../assets/images/home_26.png"></a>
                            </li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import './../assets/css/base.css'
    import './../assets/css/common.css'
    import NavHeader from '@/components/Header.vue'
    import NavFooter from '@/components/Footer.vue'
    export default {
        data(){
            return{
                shownavcolor:false,
                shownavname:'首页'
            }
        },
        components:{
            NavHeader,
            NavFooter
        },
    }
</script>

