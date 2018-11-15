<template>
    <div class="blog">
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="search-input">
            <input type="text" placeholder="输入关键词" v-model="searchKeyWords">
            <div class="search-btn" @click="searchArticle()">
                <img width="24" src="../assets/images/search.png">
            </div>
        </div>
        <div class="tab-names">
            <ul class="content">
                <li v-for="(tab,index) in tabNames" v-bind:class="{'active':tab.isActive}" @click="resultSearch(tab._id,index)">{{tab.tab_name}}</li>
                <div class="clear"></div>
            </ul>
        </div>
        <blog-list :blogData="articlelist" :totalpage="total_page" :curpage="page" :isloading="loading"></blog-list>
    </div>
</template>

<script>
    import NavHeader from '@/components/Header.vue'
    import BlogList from '@/components/BlogList.vue'
    import axios from 'axios'
    export default {
        name: "Blog",
        data(){
            return{
                shownavcolor:true,
                shownavname:'博客',
                tabNames:[{
                    tab_name:'全部',
                    _id:'all',
                    isActive:true
                }],
                articlelist:[],
                page:1, //当前页
                total_page:1,//总页数
                tab_id:'all',
                loading:false,
                bottomHight: 50,
                searchKeyWords:''
            }
        },
        components:{
            NavHeader,
            BlogList
        },
        mounted(){
            this.getArticleList(this.tab_id,this.page,this.searchKeyWords);//默认
            this.getTabNames()
            this.addScrollEvent()
        },
        methods:{
            searchArticle(){
                this.page = 1
                this.articlelist = []
                this.getArticleList(this.tab_id,this.page,this.searchKeyWords);
            },
            resultSearch(tab_id,index){
                for(var i = 0; i < this.tabNames.length; i++) {
                    this.tabNames[i].isActive = false;
                }
                this.tabNames[index].isActive = true;
                if(this.tab_id != tab_id){
                    this.page = 1
                    this.getArticleList(tab_id,this.page,this.searchKeyWords)
                }
            },
            getTabNames(){
                let that = this
                axios.get('/api/v1/tablist').then((res)=>{
                    if(res.data.code == 201){
                        that.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        console.log(res.data)
                        for(var i = 0;i<res.data.data.length;i++){
                            res.data.data[i].isActive = false
                            that.tabNames.push(res.data.data[i])
                        }
                    }else{
                        that.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error)=>{
                    that.$toast.top('网络错误，请稍后重试')
                })
            },
            getArticleList(tab_id,page,searchinput){
                axios.get('/api/v1/articlelist/'+tab_id+'/'+page+'?keywords='+searchinput).then((res)=>{
                    if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        console.log(res.data.data)
                        this.total_page = res.data.data.total_page
                        if(this.tab_id != tab_id){
                            this.articlelist = res.data.data.articles
                            this.page = 2
                            this.tab_id = tab_id
                        }else{
                            this.articlelist = this.articlelist.concat(res.data.data.articles)
                            this.page++
                            this.tab_id = tab_id
                        }
                        this.loading = false
                        console.log(this.page)
                    }else{
                        this.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            handleScroll: function () {
                if (this.getScrollBottomHeight() <= this.bottomHight && this.page <= this.total_page && this.loading == false) {
                    this.loading = true
                    this.getArticleList(this.tab_id,this.page,this.searchKeyWords)
                }
            },
            //添加滚动事件
            addScrollEvent() {
                window.addEventListener('scroll', this.handleScroll)
            },
            //滚动条到底部的距离
            getScrollBottomHeight() {
                return this.getPageHeight() - this.getScrollTop() - this.getWindowHeight();
            },
            //页面高度
            getPageHeight() {
                return document.querySelector("html").scrollHeight
            },
            //滚动条顶 高度
            getScrollTop() {
                var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
                if (document.body) {
                    bodyScrollTop = document.body.scrollTop;
                }
                if (document.documentElement) {
                    documentScrollTop = document.documentElement.scrollTop;
                }
                scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                return scrollTop;
            },
            getWindowHeight() {
                var windowHeight = 0;
                if (document.compatMode == "CSS1Compat") {
                    windowHeight = document.documentElement.clientHeight;
                } else {
                    windowHeight = document.body.clientHeight;
                }
                return windowHeight;
            }
        }
    }
</script>

