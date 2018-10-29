<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="leave-words">
            <div style="border-top:1px solid #ddd;border-bottom:1px solid #ddd;background:white;"><reply-frame :typeData="leavewords"></reply-frame></div>
            <div class="word-lists">
                <div class="title">
                    10条留言
                </div>
                <ul class="lists">
                    <li>
                        <div class="list-head fl-l">
                            <img src="../assets/images/head-img.png">
                        </div>
                        <div class="list-content fl-r">
                            <h2><span>会飞的猪</span><span class="time fl-r">2018年10月27日</span></h2>
                            <div class="con">
                                <div class="list-txt">
                                    真好！！！！
                                </div>
                                <div class="list-pics">
                                    <img src="../assets/images/home_bg.jpg">
                                    <img src="../assets/images/home_bg.jpg">
                                    <img src="../assets/images/home_bg.jpg">
                                </div>
                            </div>
                            <div class="list-btns">
                                <i><img class="fl-l" src="../assets/images/love-icon.png">12</i>
                                <i><img @click="showEmoji($event,'1')" src="../assets/images/reply-icon.png"></i>
                                <i><img src="../assets/images/del-icon.png"></i>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <reply-frame :typeData="reply" :currentId="1"></reply-frame>
                    </li>
                    <li>
                        <div class="list-head fl-l">
                            <img src="../assets/images/head-img.png">
                        </div>
                        <div class="list-content fl-r">
                            <h2><span>会飞的猪</span><span class="time fl-r">2018年10月27日</span></h2>
                            <div class="con">
                                <div class="list-txt">
                                    <span style="color:#ab1f1f">@会飞的猪</span> 真好！！！！
                                </div>
                                <div class="list-pics" style="display:none;">
                                    <img src="../assets/images/home_bg.jpg">
                                    <img src="../assets/images/home_bg.jpg">
                                    <img src="../assets/images/home_bg.jpg">
                                </div>
                            </div>
                            <div class="list-btns">
                                <i><img class="fl-l" src="../assets/images/love-already.png">12</i>
                                <i><img @click="showEmoji($event,'2')" src="../assets/images/reply-icon.png"></i>
                                <i style="display:none;"><img src="../assets/images/del-icon.png"></i>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <reply-frame :typeData="reply" :currentId="2"></reply-frame>
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
    import ReplyFrame from '@/components/ReplyFrame.vue'

    export default {
        data(){
            return{
                shownavcolor:true,
                shownavname:'留言',
                leavewords:{
                    btnName:'发送',
                    imgUrl:'http://www.youku.com',
                    url:'http://www.baidu.com',
                    isshow:true,
                    defaultVal:''
                },
                reply:{
                    btnName:'回复',
                    imgUrl:'http://www.youku1.com',
                    url:'http://www.baidu1.com',
                    selectId:0,
                    isshow:true,
                    defaultVal:'回复留言'
                },
                beforeId:0,   // 天才
            }
        },
        components:{
            NavHeader,
            NavFooter,
            ReplyFrame
        },
        methods:{
            showEmoji(e,id){
                this.reply.selectId = id;
                if(this.beforeId == id){
                    this.reply.isshow = !this.reply.isshow;
                }else{
                    this.reply.isshow = true;
                }
                this.beforeId = id;
            },

        }
    }
</script>

