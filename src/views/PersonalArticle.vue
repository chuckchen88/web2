<template>
    <div class="">
        <header-details :showcolor="shownavcolor" :navname="shownavname"></header-details>
        <blog-list :blogData="articlelist" :totalpage="total_page" :curpage="page" :isloading="loading" style="margin-top:.5em;"></blog-list>
    </div>
</template>

<script>
    import HeaderDetails from "../components/HeaderDetails";
    import BlogList from '@/components/BlogList.vue'
    import axios from 'axios'
    export default {
        name: "PersonalArticle",
        components: {HeaderDetails,BlogList},
        data(){
            return{
                shownavcolor:true,
                shownavname:'我赞过的文章',
                articlelist:[],
                page:1, //当前页
                total_page:1,//总页数
                loading:false,
                bottomHight: 50,
            }
        },
        mounted(){
            this.getArticleList(this.page);//默认
            this.addScrollEvent()
        },
        methods: {
            getArticleList(page) {
                axios.get('/api/v1/getMyArticles/' + page).then((res) => {
                    if (res.data.code == 201) {
                        this.$toast.top(res.data.msg)
                    } else if (res.data.code == 200) {
                        console.log(res.data.data)
                        this.total_page = res.data.data.total_page
                        this.articlelist = this.articlelist.concat(res.data.data.articles)
                        this.page++
                        this.loading = false
                        console.log(this.page)
                    } else {
                        this.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error) => {
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            handleScroll: function () {
                if (this.getScrollBottomHeight() <= this.bottomHight && this.page <= this.total_page && this.loading == false) {
                    this.loading = true
                    this.getArticleList(this.page)
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

<style scoped>

</style>
