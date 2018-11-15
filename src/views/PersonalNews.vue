<template>
    <div class="mynews">
        <header-details :showcolor="shownavcolor" :navname="shownavname"></header-details>
        <div class="tabs">
            <div v-for="(tab,index) in tabs" class="tab fl-l" v-bind:class="{'active':tab.isActive}" @click="tabExchange(index)">{{tab.name}}<i v-bind:class="{'show':tab.hasNotRead}"></i></div>
            <div class="clear"></div>
        </div>
        <div class="tab-contents">
            <div class="tab-content">
                <ul>
                    <a href="javascript:;" v-for="myNew in myNews" @click="goDetails(myNew.reply_id, myNew.type, myNew.article_id)">
                        <li v-show="myNew.type =='leaveReply' || myNew.type == 'artReply'|| myNew.type == 'artAt' || myNew.type == 'fabulous'" @click="hasReadOne(myNew._id)">
                            <span class="fl-l con">
                                <h1><span v-if="myNew.type == 'leaveReply'">留言回复</span><span v-if="myNew.type == 'artReply'">文章回复</span><label class="fl-r t">{{ myNew.create_at | moment }}<i v-show="!myNew.has_read"></i></label></h1>
                                <div class="list-con"><span style="color:#ab1f1f;">{{myNew.user.loginname}}</span><span v-show="myNew.type == 'leaveReply'">回复了您的留言</span><span v-show="myNew.type == 'artReply'">在一篇文章中回复了您的评论</span></div>
                            </span>
                            <div class="fl-r arr">
                                <img width="20" src="../assets/images/arr.png">
                            </div>
                            <div class="clear"></div>
                        </li>
                    </a>
                </ul>
            </div>
            <div class="tab-content">
                <ul>
                    <li v-for="sysNew in sysNews">
                        <router-link :to="{ name:'NewsDetails', params: {id: sysNew.id} }"  >
                        <div class="fl-l con">
                            <h1><span>{{sysNew.title}}</span><label class="fl-r t">{{ sysNew.create_at | moment }}<i v-show="!sysNew.has_read"></i></label></h1>
                            <div class="list-con"> {{sysNew.content}}</div>
                        </div>
                        <div class="fl-r arr">
                            <img width="20" src="../assets/images/arr.png">
                        </div>
                        <div class="clear"></div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderDetails from "../components/HeaderDetails";
    import axios from 'axios'
    export default {
        name: "PersionalNews",
        components: {HeaderDetails},
        data(){
            return{
                shownavcolor:true,
                shownavname:'消息提醒',
                isread:false,
                tabs:[{
                    name:'我的消息',
                    isActive:true,
                    hasNotRead:0
                },{
                    name:'系统消息',
                    isActive:false,
                    hasNotRead:0
                }],
                myNews:[],
                sysNews:[],

            }
        },
        comments:{
            HeaderDetails
        },
        mounted () {
            this.tabExchange(this.$store.state.newsTabIndex)
            this.getMyNews()
            this.getSysNews()
        },
        methods:{
            tabExchange(index){
                var tabCardCollection = document.querySelectorAll(".tab-content"),
                    len = tabCardCollection.length;

                for(var i = 0; i < len; i++) {
                    tabCardCollection[i].style.display = "none";
                    this.tabs[i].isActive = false;
                }
                this.tabs[index].isActive = true;
                tabCardCollection[index].style.display = "block";
                this.$store.state.newsTabIndex = index
            },
            getMyNews(){
                let that = this
                axios.get('/api/v1/getuserinfo/mynews')
                    .then(function (response) {//console.log(response.data)
                        if(response.data.code == 403 || response.data.code == 408){
                            that.$router.push({path:'/login'})
                        }else if(response.data.code == 200){
                            console.log(response.data)
                            that.myNews = response.data.data

                            var mycount = 0
                            for(var i = 0;i < that.myNews.length;i++){
                                if(that.myNews[i].type == 'leaveReply'){
                                    if(that.myNews[i].has_read == false){
                                        mycount++
                                    }
                                }
                            }
                            that.tabs[0].hasNotRead = mycount
                        }else{
                            that.$toast.top('网络错误，请稍后重试');
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            },
            goDetails(id, type, article_id){
                if(type == 'leaveReply'){
                    this.$router.push({path:'/leavewords/'+id})
                }else{
                    this.$router.push({path:'/blog/BlogDetails/'+article_id+'/'+id})
                }
            },
            getSysNews(){
                let that = this
                axios.get('/api/v1/sysmsgs')
                    .then(function (response) {//console.log(response.data)
                        if(response.data.code == 403 || response.data.code == 408){
                            that.$router.push({path:'/login'})
                        }else if(response.data.code == 200){
                            console.log(response.data)
                            that.sysNews = response.data.data

                            var mycount = 0
                            for(var i = 0;i < that.sysNews.length;i++){
                                if(that.sysNews[i].has_read == false){
                                    mycount++
                                }
                            }
                            that.tabs[1].hasNotRead = mycount
                        }else{
                            that.$toast.top('网络错误，请稍后重试');
                        }
                    })
                    .catch(function (error) {
                        that.$toast.top('网络错误，请稍后重试');
                    });
            },
            hasReadOne(id){
                axios.get('/api/v1/myNews/hasReadOne/'+id).then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.$toast.top('登陆超时，请重新登陆')
                    }else if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        console.log('已标记为已读')
                    }else{
                        this.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            }
        }
    }
</script>
<style>
    .tab-content .list-con{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

