<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname"></nav-header>
        <div class="works">
            <div class="work-list">
                <h2>公司作品</h2>
                <ul>
                    <li v-for="work in worklist" v-if="work.type == 0">
                        <a :href="work.work_src">
                        <div class="img"><img :src="work.main_img"></div>
                        <div class="txt">
                            <h3>{{work.work_name}}</h3>
                            <p>{{work.work_desc}}</p>
                        </div>
                        <div class="clear"></div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="work-list">
                <h2>个人作品</h2>
                <ul>
                    <li v-for="work in worklist" v-if="work.type == 1">
                        <a :href="work.work_src">
                            <div class="img"><img :src="work.main_img"></div>
                            <div class="txt">
                                <h3>{{work.work_name}}</h3>
                                <p>{{work.work_desc}}</p>
                            </div>
                            <div class="clear"></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import './../assets/css/base.css'
    import './../assets/css/common.css'
    import NavHeader from '@/components/Header.vue'
    import NavFooter from '@/components/Footer.vue'
    import axios from 'axios'
    export default {
        data(){
            return{
                shownavcolor:true,
                shownavname:'作品',
                worklist:[]
            }
        },
        components:{
            NavHeader,
            NavFooter
        },
        mounted(){
            this.getWorkList()
        },
        methods:{
            getWorkList(){
                axios.get('/api/v1/worklist').then((res)=>{
                    if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        this.worklist = res.data.data
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

