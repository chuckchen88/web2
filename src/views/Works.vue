<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="works">
            <div class="work-list">
                <h2>公司作品</h2>
                <ul>
                    <li>
                        <div class="img"><img src="../assets/images/works_03.jpg"></div>
                        <div class="txt">
                            <h3>上海中世建设咨询有限公司(官网)</h3>
                            <p>中世官网前端部分是由本人独立完成的，此网站
                                也是本人人生第一个完整的作品。功能相对来说
                                比较简单，但对于当时的技术能力，</p>
                        </div>
                        <div class="clear"></div>
                    </li>
                    <li>
                        <div class="img"><img src="../assets/images/works_03.jpg"></div>
                        <div class="txt">
                            <h3>上海中世建设咨询有限公司(官网)</h3>
                            <p>中世官网前端部分是由本人独立完成的，此网站
                                也是本人人生第一个完整的作品。功能相对来说
                                比较简单，但对于当时的技术能力，</p>
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
            </div>
            <div class="work-list">
                <h2>个人作品</h2>
                <ul>
                    <li>
                        <div class="img"><img src="../assets/images/works_03.jpg"></div>
                        <div class="txt">
                            <h3>上海中世建设咨询有限公司(官网)</h3>
                            <p>中世官网前端部分是由本人独立完成的，此网站
                                也是本人人生第一个完整的作品。功能相对来说
                                比较简单，但对于当时的技术能力，</p>
                        </div>
                        <div class="clear"></div>
                    </li>
                    <li>
                        <div class="img"><img src="../assets/images/works_03.jpg"></div>
                        <div class="txt">
                            <h3>上海中世建设咨询有限公司(官网)</h3>
                            <p>中世官网前端部分是由本人独立完成的，此网站
                                也是本人人生第一个完整的作品。功能相对来说
                                比较简单，但对于当时的技术能力，</p>
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
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
                shownavcolor:true,
                shownavname:'作品'
            }
        },
        components:{
            NavHeader,
            NavFooter
        },
    }
</script>

