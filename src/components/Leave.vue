<template>
    <div class="box" contenteditable="true" v-html="innerText" @input="changeTxt" @focus="lock=true" @blur="lock=false"></div>
</template>

<script>
    export default {
        props:{
            child:{
                type:Object,
                default:{
                    txt:""
                }
            }
        },
        data:function(){
            return {
                innerText:this.child.txt,
                lock:false
            }
        },
        watch:{
            child:{
                handler(newValue, oldValue) {
                    if(!this.lock) {
                        this.innerText=this.child.txt;
                    };
                },
                deep:true
            }
        },
        methods:{
            changeTxt:function(e){
                this.child.txt=this.$el.innerHTML;
            }
        }
    }
</script>

