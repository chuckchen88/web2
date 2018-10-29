<template>
    <div class="search-blog-lists">
        <ul>
            <li>
                <img width="100%" src="../assets/images/bloglist.jpg">
                <div class="content txt">
                    <h2>标题标题标题</h2>
                    <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                    <div>
                        <span class="fl-l t">2018/10/29 15:40</span>
                        <span class="fl-r count">
                            <i>(99)</i>
                            &nbsp;
                            <i>(18)</i>
                        </span>
                        <div class="clear"></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "BlogList"
    }
</script>

<style scoped>
    /*公共文章list组件*/
    .search-blog-lists ul li{
        border-top:1px solid #ddd;
        border-bottom:1px solid #ddd;
        background:white;
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
</style>
