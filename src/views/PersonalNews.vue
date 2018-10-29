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
                    <a href="javascript:;">
                        <li>
                            <div class="fl-l con">
                                <h1><span>留言回复</span><label class="fl-r t">2018/10/29 12:20<i></i></label></h1>
                                <div><span style="color:#ab1f1f;">chuck</span> 回复/赞了您的留言</div>
                            </div>
                            <div class="fl-r arr">
                                <img width="20" src="../assets/images/arr.png">
                            </div>
                            <div class="clear"></div>
                        </li>
                    </a>
                    <a href="javascript:;">
                        <li>
                            <div class="fl-l con">
                                <h1><span>文章回复</span><label class="fl-r t">2018/10/29 12:20<i></i></label></h1>
                                <div><span style="color:#ab1f1f;">chuck</span>在文章<span style="color:#ab1f1f">《abcd》</span> 回复/赞了您的留言</div>
                            </div>
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
                    <router-link :to="{ name:'NewsDetails', params: {id: 1} }">
                        <li>
                            <div class="fl-l con">
                                <h1><span>关于本站上线通知</span><label class="fl-r t">2018/10/29 12:20<i></i></label></h1>
                                <div> 本站即将上线！！拭目以待吧！！！</div>
                            </div>
                            <div class="fl-r arr">
                                <img width="20" src="../assets/images/arr.png">
                            </div>
                            <div class="clear"></div>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderDetails from "../components/HeaderDetails";
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
                    hasNotRead:true
                },{
                    name:'系统消息',
                    isActive:false,
                    hasNotRead:true
                }],
            }
        },
        comments:{
            HeaderDetails
        },
        mounted () {
            this.tabExchange(0)
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
            }
        }
    }
</script>


