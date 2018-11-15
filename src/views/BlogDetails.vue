<template>
    <div class="blog-detail">
        <header-details :showcolor="shownavcolor" :navname="shownavname"></header-details>
        <div class="con">
            <h2 class="title">{{article.title}}</h2>
            <p>

            </p>
            <div class="big-img">
                <img width="100%" src="../assets/images/bloglist.jpg">
                <div class="content info" v-html="article.content">

                </div>
                <div class="author">
                    <span class="t">{{article.create_at | moment}}</span>
                    <i class="fl-r" style="color:#ab1f1f;">{{tab.tab_name}}</i>
                    <div class="clear"></div>
                </div>
                <div class="love" @click="artfabulous(article._id)">
                    <img width="24" src="../assets/images/love-details.png">&nbsp;{{article.fabulous_users?article.fabulous_users.length:0}}
                </div>
            </div>
        </div>
        <div class="leave-words" style="margin-top:.5em;">
            <div style="border-top:1px solid #ddd;border-bottom:1px solid #ddd;background:white;"><reply-frame :typeData="leavewords" @initList="getComments"></reply-frame></div>
            <div class="word-lists">
                <div class="title">
                    {{words.length}}条评论
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
                        <reply-frame ref="replyInsert" :typeData="reply" :currentId="index" @initList="getComments"></reply-frame>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderDetails from "../components/HeaderDetails";
    import ReplyFrame from '@/components/ReplyFrame.vue'
    import axios from 'axios'
    export default {
        name: "BlogDetails",
        components: {HeaderDetails,ReplyFrame},
        data(){
            return{
                test:['fhdjsfhjksdhf'],
                shownavcolor:true,
                shownavname:'详情',
                article:'',
                tab:'',
                leavewords:{
                    btnName:'评论',
                    imgUrl:'http://www.youku.com',
                    url:'http://www.baidu.com',
                    replyType:'blog',
                    isshow:true,
                    defaultVal:'',
                    workAt:false,
                    master_id:0,
                    article_id:this.$route.params.id
                },
                reply:{
                    btnName:'回复',
                    imgUrl:'http://www.youku1.com',
                    url:'http://www.baidu1.com',
                    replyType:'blog',
                    selectId:-1,
                    isshow:true,
                    defaultVal:'',
                    workAt:false,
                    master_id:0,
                    article_id:this.$route.params.id
                },
                beforeId:-1,   // 天才
                words:[],
                userData:{},  //用户登录信息
                isLogin:false
            }
        },
        mounted(){
            this.getdetails()
            this.getComments()
            this.checkLogin()
            this.userData = this.$store.getters.getStorage
            let that = this
            if(that.$route.params.commentId){
                setTimeout(function(){
                    that.goAnchor('#a'+that.$route.params.commentId)
                },500)
            }
        },
        methods:{
            getdetails(){
                let that = this
                let id = this.$route.params.id;
                //请求后台接口
                axios.get('/api/v1/articlelist/'+id)
                    .then(function (response) {console.log(response.data);
                        if(response.data.code == 201){
                            that.content = response.data.msg
                        }else if(response.data.code == 200){
                            that.article = response.data.data.article
                            that.tab = response.data.data.tab
                        }else{
                            that.content = '网络错误，请稍后重试'
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            },
            artfabulous(id){
                if(this.article.fabulous_users.indexOf(this.userData.user._id) > -1){
                    return this.$toast.top('您已点过赞啦')
                }
                axios.get('/api/v1/artfabulous/'+id).then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.$toast.top('您还未登录哦！')
                    }else if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        this.$toast.top(res.data.msg)
                        this.getdetails();
                    }else{
                        this.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
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
            getComments(){
                axios.get('/api/v1/commentList/'+this.$route.params.id).then((res)=>{
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
                        this.leavewords.defaultVal = '<div contenteditable="false" style="height:5em;line-height:5em;text-align:center">您还未登录，<a style="color:#ab1f1f" href="/#/login">登陆</a>后可以评论哦</div>'
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
                axios.get('/api/v1/comment/delete/'+id).then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.$toast.top('登陆超时，请重新登陆')
                    }else if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        this.$toast.top(res.data.msg)
                        this.getComments();
                    }else{
                        this.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            fabulous(id){
                axios.get('/api/v1/comment/fabulous/'+id).then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.$toast.top('您还未登录哦')
                    }else if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        this.$toast.top(res.data.msg)
                        this.getComments();
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
    .list-content .con{
        border:none;
    }
</style>
