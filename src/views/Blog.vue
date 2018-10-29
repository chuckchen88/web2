<template>
    <div class="blog">
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="search-input">
            <input type="text" placeholder="输入关键词">
            <div class="search-btn">
                <img width="24" src="../assets/images/search.png">
            </div>
        </div>
        <div class="tab-names">
            <ul class="content">
                <li v-for="(tab,index) in tabNames" v-bind:class="{'active':tab.isActive}" @click="resultSearch(tab.name,index)">{{tab.name}}</li>
                <div class="clear"></div>
            </ul>
        </div>
        <blog-list></blog-list>
    </div>
</template>

<script>
    import NavHeader from '@/components/Header.vue'
    import BlogList from '@/components/BlogList.vue'
    export default {
        name: "Blog",
        data(){
            return{
                shownavcolor:true,
                shownavname:'博客',
                tabNames:[{
                    name:'全部',
                    isActive:true
                },{
                    name:'心情',
                    isActive:false
                },{
                    name:'旅游',
                    isActive:false
                }],
            }
        },
        components:{
            NavHeader,
            BlogList
        },
        methods:{
            resultSearch(val,index){console.log(val);
                for(var i = 0; i < this.tabNames.length; i++) {
                    this.tabNames[i].isActive = false;
                }
                this.tabNames[index].isActive = true;
            }
        }
    }
</script>

