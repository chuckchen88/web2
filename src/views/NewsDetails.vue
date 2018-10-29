<template>
    <div class="news-details">
        <header-details :showcolor="shownavcolor" :navname="shownavname"></header-details>
        <div class="con">
            <h2>标题标题标题标题</h2>
            <p class="t">2018/10/29 14:23</p>
            <div class="content">
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderDetails from "../components/HeaderDetails";
    export default {
        name: "NewsDetails",
        components: {HeaderDetails},
        data(){
            return{
                shownavcolor:true,
                shownavname:'消息详情',
            }
        },
    }
</script>

<style scoped>

</style>
