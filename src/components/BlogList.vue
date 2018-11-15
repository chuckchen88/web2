<template>
    <div class="search-blog-lists">
        <ul>
            <li v-for="blog in blogData">
                <router-link :to="{ name:'BlogDetails', params: {id: blog._id} }"  >
                <img width="100%" src="../assets/images/bloglist.jpg">
                <div class="content txt">
                    <h2>{{blog.title}}</h2>
                    <p class="blog-content" v-html="delHtmlTag(blog.content)"></p>
                    <div>
                        <span class="fl-l t">{{ blog.create_at | moment }}</span>
                        <span class="fl-r count">
                            <i>({{blog.visit_count}})</i>
                            <i>({{blog.fabulous_users.length}})</i>
                        </span>
                        <div class="clear"></div>
                    </div>
                </div>
                </router-link>
            </li>
            <p style="text-align:center;margin-bottom:.5em;" v-show="isloading">加载中</p>
            <p style="text-align:center;margin-bottom:.5em;" v-show="blogData.length == 0">没有相关文章</p>
            <p style="text-align:center;margin-bottom:.5em;" v-if="curpage-1 == totalpage">已加载全部</p>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "BlogList",
        props: {blogData:Array,totalpage:Number,curpage:Number,isloading:Boolean},
        data(){
            return{

            }
        },
        methods:{
            delHtmlTag(str){
                return str.replace(/<[^>]+>/g,"");
            }
        }
    }
</script>

<style scoped>
    /*公共文章list组件*/
    .search-blog-lists ul li{
        border-top:1px solid #ddd;
        border-bottom:1px solid #ddd;
        background:white;
        margin-bottom:.5em;
    }
    .search-blog-lists ul li .txt {
        padding:.5em .5em 1em .5em;
    }
    .search-blog-lists ul li .txt h2{
        color:#ab1f1f;
        font-size:1.2em;
    }
    .search-blog-lists ul li .txt p{
        color:#666;
        margin-bottom:.5em;
    }
    .search-blog-lists ul li .txt .t{
        font-size:1em;
        color:#999;
    }
    .search-blog-lists ul li .txt .count{
        font-size:.8em;
        color:#999;
        line-height: 20px;
    }
    .search-blog-lists ul li .txt .count i{
        padding-left:1.8em;
    }
    .search-blog-lists ul li .txt .count i:nth-of-type(1){
        background:url("../assets/images/scan.png") center left no-repeat;
        background-size:40%;
    }
    .search-blog-lists ul li .txt .count i:nth-of-type(2){
        background:url("../assets/images/love.png") center left no-repeat;
        background-size:40%;
    }
    .blog-content{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>
