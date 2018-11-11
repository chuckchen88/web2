<template>
        <div class="input-table" v-show="currentId == typeData.selectId && typeData.isshow == true">
            <div class="input" contenteditable="true" placeholder="说说你的想法" ref='leaveContent' v-on:keydown ="inputFunc" v-html="typeData.defaultVal">

            </div>
            <div class="btn-icons">
                <label style="display:inline-block;">
                    &nbsp;<img width="26" src="../assets/images/camera.png">&nbsp;
                    <input type="file" accept="image/*" @change="update" style="display:none;">
                </label>
                <img @click="showEmojis" width="26" src="../assets/images/emoji.png">
            </div>
            <div class="user-lists" v-bind:class="{'show':showChooseUser}">
                <div class="navs" style="background:#32220b">
                    <div class="content">
                        <div class="nav-icon fl-l" @click="backChooseUser"><img width="20" style="margin-top:.2em;" src="../assets/images/arr-back.png"></div>
                        <div class="nav-title text-center">请选择@的人</div>
                    </div>
                    <div class="clear"></div>
                </div>
                <ul class="lists">
                    <li style="user-select:none;" v-for="user in users" @click="chooseUser" :data-loginname="user.loginname">
                        <img src="../assets/images/head-img.png">
                        {{user.loginname}}
                    </li>
                </ul>
            </div>
            <ul class="pics" style="display:block;" v-show="pics.length > 0">
                <li class="pic" v-for="(pic,index) in pics">
                    <div @click="removeCurPic(index)" class="del-btn"><img src="../assets/images/del-red.png"></div>
                    <img :src="pic.src">
                </li>
            </ul>
            <div class="emojis" v-bind:class="{'show':isshowemoji}">
                <div class="emoji" v-for="n in 68" ref="emojiItem" @click="chooseEmoji">
                    <img :src="'/static/images/emoji/'+n+'.png'">
                </div>
            </div>
            <button class="btn red-btn" @click="sendWords">{{typeData.btnName}}</button>
        </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "ReplyFrame",
        props: {typeData:Object,currentId:Number},
        data(){
            return{
                isshowemoji:false,
                showChooseUser:false,
                users:[{
                    'loginname':'张三',
                    'avatar':''
                },{
                    'loginname':'李四',
                    'avatar':'http://'
                },{
                    'loginname':'王五',
                    'avatar':'http://'
                }],
                pics:[]  //上传图片   最多三张
            }
        },
        mounted(){

        },
        methods:{
            inputFunc(e){
                if(this.typeData.workAt){   //是否启用@功能
                    //let laststr = e.currentTarget.innerText.replace(/^(.*[n])*.*(.|n)$/g, "$2")
                    if(e.shiftKey && e.keyCode == 50){
                        this.showChooseUser = true
                    }
                }
            },
            update(e){
                if(this.pics.length>=3){
                    return this.$toast.top('最多上传三张图片')
                }
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                param.append('file',file,file.name);//通过append向form对象添加数据
                param.append('chunk','0');//添加form表单中其他数据
                console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                axios.post('/api/v1/upload',param,config)
                    .then(res=>{
                        if(res.data.code == 403 || res.data.code == 408){
                            this.$router.push({path:'/login'})
                        }else if(res.data.code == 0){
                            this.pics.push({src:res.data.data.src,title:res.data.data.title})
                        }else{
                            this.$toast.top('网络错误，请稍后重试');
                        }
                    })
            },
            removeCurPic(index){
                this.pics.splice(index, 1)   //删除一个图片
            },
            sendWords(){
                let content = this.$refs.leaveContent.innerHTML
                let postData = {r_content:content,pics:this.pics,master_id:this.typeData.master_id}
                axios.post('/api/v1/leaveAdd',postData).then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.$router.push({path:'/login'})
                    }else if(res.data.code == 201){
                        this.$toast.top(res.data.msg)
                    }else if(res.data.code == 200){
                        this.$toast.top(res.data.msg)
                        this.$refs.leaveContent.innerHTML = ''
                        this.pics = []
                        this.$emit('initList')  //调用父组件刷新留言列表方法
                    }else{
                        this.$toast.top('网络错误，请稍后重试')
                    }
                    this.$refs.leaveContent.innerHTML = ''
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            showEmojis(){
                this.isshowemoji = !this.isshowemoji;
            },
            onInput(event) {
                //event.data contains the value of the textarea
            },
            chooseEmoji(e){
                this.$refs.leaveContent.focus();
                this.insertHtmlAtCaret(e.currentTarget.innerHTML);
                this.isshowemoji = false;
            },
            chooseUser(e){
                this.insertHtmlAtCaret(e.currentTarget.dataset.loginname+'&nbsp;');
                this.showChooseUser = false
            },
            backChooseUser(){
                this.showChooseUser = false
            },
            keepLastIndex() {
                var obj = this.$refs.leaveContent
                setTimeout(function(){
                    if (window.getSelection) { //ie11 10 9 ff safari
                        obj.focus(); //解决ff不获取焦点无法定位问题
                        var range = window.getSelection(); //创建range
                        range.selectAllChildren(obj); //range 选择obj下所有子内容
                        range.collapseToEnd(); //光标移至最后
                    } else if (document.selection) { //ie10 9 8 7 6 5
                        var range = document.selection.createRange(); //创建选择对象
                        //var range = document.body.createTextRange();
                        range.moveToElementText(obj); //range定位到obj
                        range.collapse(false); //光标移至最后
                        range.select();
                    }
                },100)
            },
            insertHtmlAtCaret(html) {
                var sel, range;
                if(window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if(sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();
                        // Range.createContextualFragment() would be useful here but is
                        // non-standard and not supported in all browsers (IE9, for one)
                        var el = document.createElement("div");
                        el.innerHTML = html;
                        var frag = document.createDocumentFragment(),
                            node, lastNode;
                        while((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);
                        // Preserve the selection
                        if(lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if(document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            }
        }
    }
</script>

<style scoped>
    .input-table{
        background:white;
        padding:1em;
        margin:.5em 0;
    }
    .input-table .input{
        border-left:1px solid #ddd;
        border-top:1px solid #ddd;
        border-right:1px solid #ddd;
        height:6em;
        padding:.5em;
        -webkit-border-radius: 3px 3px 0 0;
        -moz-border-radius: 3px 3px 0 0;
        border-radius: 3px 3px 0 0;
        overflow:scroll;
        font-size:1.2em;
    }
    .input-table .input img{
        display: inline-block;
        max-width:1.2em;
        margin:0 .1em;
    }
    .input-table .input:empty:before{
        content: attr(placeholder);
        color:#bbb;
    }
    .input-table .input:focus:before{
        content:none;
    }
    .input-table .btn{
        width:100%;
        margin:1em 0;
    }
    .input-table .btn-icons{
        border-left:1px solid #ddd;
        border-bottom:1px solid #ddd;
        border-right:1px solid #ddd;
        -webkit-border-radius: 0 0 3px 3px;
        -moz-border-radius: 0 0 3px 3px;
        border-radius: 0 0 3px 3px;
        padding:.5em 0;
    }
    .input-table .emojis{
        margin-top:.5em;
        border:1px solid #ddd;
        border-radius:3px;
        overflow: hidden;
        display: none;
    }
    .input-table .emojis.show{
        display:block;
    }
    .input-table .emoji{
        display: inline-block;
        width:10%;
        padding:.2em;
    }
    .input-table .emoji img{
        width:100%;
    }
    .input-table .pics{
        margin-top:5px;
        padding:5px;
        border:1px solid #ddd;
        border-radius:3px;
        font-size:0;
    }
    .input-table .pics .pic{
        position:relative;
        width:33.33%;
        display: inline-block;
        padding:5px;
    }
    .input-table .pics .pic img{
        width:100%;
    }
    .input-table .pics .pic .del-btn{
        position:absolute;
        right:5px;
        top:5px;
        background: rgba(171,31,31,.4);
        padding:5px;
    }
    .input-table .pics .pic .del-btn img{
        width:20px;
    }
    .user-lists{
        position:fixed;
        top:0;
        left:100vw;
        width:100vw;
        height:100vh;
        background:white;
        z-index: 1000;
        transition:all .3s
    }
    .user-lists.show{
        left:0;
    }
    .user-lists .lists li{
        line-height:3em;
        padding:.5em;
        border-bottom:1px solid #ddd;
    }
    .user-lists .lists li img{
        width:3em;
        float:left;
        margin-right:1em;
    }
</style>
