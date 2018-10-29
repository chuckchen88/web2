<template>
    <div class="blog-detail">
        <header-details :showcolor="shownavcolor" :navname="shownavname"></header-details>
        <div class="con">
            <h2 class="title">标题标题标题标题标题</h2>
            <p>

            </p>
            <div class="big-img">
                <img width="100%" src="../assets/images/bloglist.jpg">
                <div class="content info">
                    Stakeholders donation Action Against Hunger cross-agency coordination meaningful
                    Bill and Melinda Gates life-saving.<br>
                    Stakeholders donation Action Against Hunger cross-agency coordination meaningful
                    Bill and Melinda Gates life-saving.<br>
                    Stakeholders donation Action Against Hunger cross-agency coordination meaningful
                    Bill and Melinda Gates life-saving.
                </div>
                <div class="author">
                    <span class="t">2018/10/29 16:20</span>
                    <i class="fl-r" style="color:#ab1f1f;">CHUCK</i>
                    <div class="clear"></div>
                </div>
                <div class="love">
                    <img width="24" src="../assets/images/love-details.png">&nbsp;10
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderDetails from "../components/HeaderDetails";
    export default {
        name: "BlogDetails",
        components: {HeaderDetails},
        data(){
            return{
                shownavcolor:true,
                shownavname:'详情',
            }
        },
    }
</script>

<style scoped>

</style>
