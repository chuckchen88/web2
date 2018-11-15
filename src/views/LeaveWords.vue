<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="leave-words">
            <div style="border-top:1px solid #ddd;border-bottom:1px solid #ddd;background:white;"><reply-frame :typeData="leavewords" @initList="getLeaveWords"></reply-frame></div>
            <div class="word-lists">
                <div class="title">
                    {{words.length}}条留言
                </div>
                <ul class="lists">
                    <li v-for="(word,index) in words" :id="'a'+word.id">
                        <div class="list-head fl-l" >
                            <img :src="word.user.avatar">
                        </div>
                        <div class="list-content fl-r">
                            <h2><span>{{word.user.loginname}}</span><span class="time fl-r">{{ word.create_at | moment }}</span></h2>
                            <div class="con">
                                <div class="list-txt" v-html="word.content">

                                </div>
                                <div class="list-pics" v-for="pic in word.pics">
                                    <img :src="pic.src">
                                </div>
                            </div>
                            <div class="list-btns">
                                <i><img @click="fabulous(word.id)" class="fl-l" src="../assets/images/love-icon.png">{{word.fabulous}}</i>
                                <i><img @click="showEmoji($event,index,word.user._id)" :data-loginname="word.user.loginname" src="../assets/images/reply-icon.png"></i>
                                <i v-show="userData && userData.user._id == word.user._id"><img @click="deleteOne(word.id)" src="../assets/images/del-icon.png"></i>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <reply-frame ref="replyInsert" :typeData="reply" :currentId="index" @initList="getLeaveWords"></reply-frame>
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
    import axios from 'axios'


    export default {
        data(){
            return{
                shownavcolor:true,
                shownavname:'留言',
                leavewords:{
                    btnName:'发送',
                    imgUrl:'http://www.youku.com',
                    url:'http://www.baidu.com',
                    replyType:'leaveWord',
                    isshow:true,
                    defaultVal:'',
                    workAt:false,
                    master_id:0
                },
                reply:{
                    btnName:'回复',
                    imgUrl:'http://www.youku1.com',
                    url:'http://www.baidu1.com',
                    replyType:'leaveWord',
                    selectId:-1,
                    isshow:true,
                    defaultVal:'',
                    workAt:false,
                    master_id:0
                },
                beforeId:-1,   // 天才
                words:[],
                userData:{},  //用户登录信息
                isLogin:false
            }
        },
        components:{
            NavHeader,
            NavFooter,
            ReplyFrame
        },
        mounted(){
            this.getLeaveWords()
            this.checkLogin()
            this.userData = this.$store.getters.getStorage
            let that = this
            if(that.$route.params.id){
                setTimeout(function(){
                    that.goAnchor('#a'+that.$route.params.id)
                },500)
            }
        },
        methods:{
            showEmoji(e,id,master_id){
                this.reply.selectId = id;
                if(this.beforeId == id){
                    this.reply.isshow = !this.reply.isshow;
                }else{
                    this.reply.isshow = true;
                }
                this.beforeId = id;
                this.reply.defaultVal = '@'+e.currentTarget.dataset.loginname+'&nbsp;'
                this.reply.master_id = master_id   //被回复者id
                this.$refs.replyInsert[id].keepLastIndex()
            },
            getLeaveWords(){
                axios.get('/api/v1/leaveWordList').then((res)=>{
                    if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        this.words = res.data.data.replies
                        this.reply.isshow = false;
                        console.log(res.data.data)
                    }else{
                        this.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            checkLogin(){
                axios.get('/api/v1/checkLogin').then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.leavewords.defaultVal = '<div contenteditable="false" style="height:5em;line-height:5em;text-align:center">您还未登录，<a style="color:#ab1f1f" href="/#/login">登陆</a>后可以留言哦</div>'
                    }else{
                        this.leavewords.defaultVal = ''
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            deleteOne(id){
                if (confirm('确认要删除吗？') == false){
                    return false;
                }
                axios.get('/api/v1/leaveWord/delete/'+id).then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.$toast.top('登陆超时，请重新登陆')
                    }else if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        this.$toast.top(res.data.msg)
                        this.getLeaveWords();
                    }else{
                        this.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            fabulous(id){
                axios.get('/api/v1/leaveWord/fabulous/'+id).then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.$toast.top('您还未登录哦')
                    }else if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        this.$toast.top(res.data.msg)
                        this.getLeaveWords();
                    }else{
                        this.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector)  //锚点要字母开头
                document.documentElement.scrollTop = document.body.scrollTop = anchor.offsetTop
            }
        }
    }
</script>

<style>
    .list-txt img{
        display: inline-block;
        max-width: 1.2em;
        margin: 0 .1em;
    }
    .list-txt a{
        color:#b90012;
    }
</style>

