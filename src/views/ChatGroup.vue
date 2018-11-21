<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname" style="position:fixed"></nav-header>
        <div class="chat" ref="chat">
            <div class="layout" ref="layout" style="width:100%;" @scroll="handleScroll()" @touchend="refrash">
                <div class="scroll" style="min-height:105vh">
                    <div class="more" v-if="page-1 == total_page">已加载全部</div>
                    <div class="more" v-if="loading">加载中...</div>
                    <div class="list" v-for="msg in messages" v-bind:class="{'own':msg.user_id == user_data.user._id}">
                        <div class="time" v-if="msg.type=='time'">{{msg.create_at | moment}}</div>
                        <div class="message" v-if="msg.type=='into'">{{msg.user.loginname}}进入了聊天室</div>
                        <div class="message" v-if="msg.type=='out'">{{msg.user.loginname}}离开了聊天室</div>
                        <div class="head-img" v-if="msg.type=='text'"><img :src="msg.user.avatar"></div>
                        <div class="con" v-if="msg.type=='text'">
                            <h3>{{msg.user.loginname}}</h3>
                            <div class="info" v-html="msg.content">

                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="input">
                <div class="emojis" v-bind:class="{'show':isshowemoji}">
                    <div class="emoji" v-for="n in 68" ref="emojiItem" @click="chooseEmoji">
                        <img :src="'/static/images/emoji/'+n+'.png'">
                    </div>
                </div>
                <button class="fl-r sendbtn" @click="sendMessage(emitContent)">
                    发送
                </button>
                <div class="btn-icons fl-l" style="padding-top:.2em;">
                    <label style="display:inline-block;">
                        &nbsp;<img width="26" src="../assets/images/camera.png">&nbsp;
                        <input type="file" accept="image/*" @change="update" style="display:none;">
                    </label>
                    <img @click="showEmojis" width="26" src="../assets/images/emoji.png">
                </div>
                <div class="input-chat" contenteditable="true" ref="inputChat" @input="setLayoutHeight" @blur="setLayoutHeight">

                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavHeader from '@/components/Header.vue'
    import axios from 'axios'
    export default {
        data(){
            return{
                isshowemoji: false,
                shownavcolor:true,
                shownavname:'聊天室',
                id:'',
                messages:[],
                user_data: this.$store.getters.getStorage?this.$store.getters.getStorage:{user:{_id:''}}, //登陆后才可以聊天
                is_login:false,
                page:1, //当前页
                total_page:1,//总页数
                loading:false,
                first:true,
                docscrollHeight:0,
                emitContent:''
            }
        },
        components:{
            NavHeader
        },
        mounted () {
            this.checkLogin()
            this.getChatList(1)
            this.docscrollHeight = this.getPageHeight()+110
            this.$socket.emit('connect');
            this.setLayoutHeight(36);
            this.setDefaultScroll();
            window.onresize = () => {
                if (!this.timer) {   //优化resize可能带来的卡顿问题
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        that.setLayoutHeight(36);
                        that.setDefaultScroll();
                        that.timer = false
                    }, 400)
                }
            }
        },
        watch:{
            docscrollHeight(curVal,oldVal){
                console.log(curVal,oldVal);
                document.querySelector(".layout").scrollTop = curVal - oldVal - 30
            }
        },
        sockets: {
            connect() {  //当连接成功时
                let emitData = {
                    type:'into',
                    user:{
                        loginname:this.user_data.user.loginname
                    }
                }
                this.$socket.emit('enter',emitData);      //监听connect事件
            },
            connected(data){  //当连接成功时 后台触发连接成功
                let that = this
                that.shownavname = '聊天室('+data.user_count+'人在线)'
                //that.messages.push(data)
                setTimeout(function(){
                    that.setLayoutHeight(36)
                    that.setDefaultScroll()
                },5)
            },
            getmessage(data){
                let that = this
                that.messages.push(data)
                setTimeout(function(){
                    that.setLayoutHeight(36)
                    that.setDefaultScroll()
                },5)
            },
            out(data){
                this.shownavname = '聊天室('+data.user_count+'人在线)'
                /*let emitData = {
                    type:'out',
                    user:{
                        loginname:data.loginname
                    }
                }
                this.$socket.emit('message',emitData);*/
            }
        },
        methods:{
            update(e){
                if(!this.is_login){
                    return this.$toast.top('您还未登陆')
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
                            this.sendMessage("<img class='single' src="+res.data.data.src+">")
                        }else{
                            this.$toast.top('网络错误，请稍后重试');
                        }
                    })
            },
            refrash(){
                this.handleScroll()
            },
            sendMessage(data){
                let that = this
                if(!that.is_login || !that.user_data.user._id){
                    return that.$toast.top('您还未登陆')
                }
                if(data == ''){
                    return that.$toast.top('输入点内容吧')
                }
                let emitData = {
                    user_id:this.user_data.user._id,  //服务器返回过来
                    content:data,
                    type:'text',
                    img:'',
                    user:{
                        loginname:this.user_data.user.loginname,
                        avatar:this.user_data.user.avatar
                    }
                }
                that.$socket.emit('message', emitData)
                that.$refs.inputChat.focus()
                that.$refs.inputChat.innerHTML=''
            },
            getChatList(page){
                let that = this

                axios.get('/api/v1/chatlist/' + page).then((res) => {
                    if (res.data.code == 201) {
                        that.$toast.top(res.data.msg)
                    } else if (res.data.code == 200) {
                        that.loading = false
                        console.log(res.data.data)
                        that.total_page = res.data.data.total_page
                        for(var i = 0;i<res.data.data.msgs.length;i++){
                            that.messages.unshift(res.data.data.msgs[i]);
                        }
                        that.page++
                    } else {
                        that.$toast.top('网络错误，请稍后重试')
                    }
                }).catch((error) => {
                    that.$toast.top('网络错误，请稍后重试')
                })
            },
            handleScroll(){
                let that = this
                if (that.getScrollTop() <= 20 && that.page <= that.total_page && that.loading == false) {
                    that.loading = true
                    if(that.first){
                        that.first = false
                        setTimeout(function(){
                            that.getChatList(that.page)
                            that.first = true
                            setTimeout(function(){
                               that.docscrollHeight = that.getPageHeight()
                            },50)
                        },1000)
                    }
                }
            },
            getScrollTop(){
                return document.querySelector(".layout").scrollTop;
            },
            //页面高度
            getPageHeight() {
                return document.querySelector(".layout").scrollHeight
            },
            checkLogin(){
                axios.get('/api/v1/checkLogin').then((res)=>{
                    if(res.data.code == 403 || res.data.code == 408){
                        this.$refs.inputChat.innerHTML = '<div contenteditable="false" style="text-align:center">您还未登录，<a style="color:#ab1f1f" href="/#/login">登陆</a>后可以畅聊哦</div>'
                    }else{
                        this.$refs.inputChat.innerHTML = ''
                        this.is_login= true
                    }
                }).catch((error)=>{
                    this.$toast.top('网络错误，请稍后重试')
                })
            },
            setLayoutHeight(limit){   //limit 偏移量
                this.$refs.layout.style.bottom = this.$refs.inputChat.offsetHeight-limit + 'px';
                this.$refs.layout.style.height = (this.$refs.chat.clientHeight - this.$refs.inputChat.offsetHeight + limit) + 'px';
                this.emitContent = this.$refs.inputChat.innerHTML
            },
            setDefaultScroll(){
                this.$refs.layout.scrollTop = this.$refs.layout.scrollHeight;
            },
            showEmojis(){
                this.isshowemoji = !this.isshowemoji;
            },
            chooseEmoji(e) {
                console.log(e.currentTarget.innerHTML);
                //this.content.txt = e.currentTarget.innerHTML;
                this.$refs.inputChat.focus();
                insertHtmlAtCaret(e.currentTarget.innerHTML+'&nbsp;');

                this.isshowemoji = false;

                function insertHtmlAtCaret(html) {
                    var sel, range;
                    if (window.getSelection) {
                        // IE9 and non-IE
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            range = sel.getRangeAt(0);
                            range.deleteContents();
                            // Range.createContextualFragment() would be useful here but is
                            // non-standard and not supported in all browsers (IE9, for one)
                            var el = document.createElement("div");
                            el.innerHTML = html;
                            var frag = document.createDocumentFragment(),
                                node, lastNode;
                            while ((node = el.firstChild)) {
                                lastNode = frag.appendChild(node);
                            }
                            range.insertNode(frag);
                            // Preserve the selection
                            if (lastNode) {
                                range = range.cloneRange();
                                range.setStartAfter(lastNode);
                                range.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(range);
                            }
                        }
                    } else if (document.selection && document.selection.type != "Control") {
                        // IE < 9
                        document.selection.createRange().pasteHTML(html);
                    }
                }
            }
        }
    }
</script>

<style>
    .chat .layout .list .info img.single{
        max-width:100px;
    }
</style>
