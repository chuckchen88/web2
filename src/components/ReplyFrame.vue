<template>

        <div class="input-table" v-show="currentId == typeData.selectId && typeData.isshow == true">
            <div class="input" contenteditable="true" placeholder="说说你的想法" ref='leaveContent'>
                {{typeData.defaultVal}}
            </div>
            <div class="btn-icons">
                <label style="display:inline-block;">
                    &nbsp;<img width="26" src="../assets/images/camera.png">&nbsp;
                    <input type="file" accept="image/*" @change="update" style="display:none;">
                </label>
                <img @click="showEmojis" width="26" src="../assets/images/emoji.png">
            </div>
            <ul class="pics" style="display:block;">
                <li class="pic">
                    <div class="del-btn"><img src="../assets/images/del-red.png"></div>
                    <img src="../assets/images/home_bg.jpg">
                </li>
                <li class="pic">
                    <div class="del-btn"><img src="../assets/images/del-red.png"></div>
                    <img src="../assets/images/home_bg.jpg">
                </li>
                <li class="pic">
                    <div class="del-btn"><img src="../assets/images/del-red.png"></div>
                    <img src="../assets/images/home_bg.jpg">
                </li>
            </ul>
            <div class="emojis" v-bind:class="{'show':isshowemoji}">
                <div class="emoji" v-for="n in 68" ref="emojiItem" @click="chooseEmoji">
                    <img :src="'../static/images/emoji/'+n+'.png'">
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
                isshowemoji:false
            }
        },
        methods:{
            update(e){
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                param.append('file',file,file.name);//通过append向form对象添加数据
                param.append('chunk','0');//添加form表单中其他数据
                console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                console.log('hihihi');
                /*this.axios.post('http://upload.qiniu.com/',param,config)
                    .then(response=>{
                        console.log(response.data);
                    })*/
            },
            sendWords(){
                let content = this.$refs.leaveContent.innerHTML;
                console.log(content);

              /*  axios.post(this.typeData.url).then((result)=>{

                })*/

            },
            showEmojis(){
                this.isshowemoji = !this.isshowemoji;
            },
            onInput(event) {
                //event.data contains the value of the textarea
            },
            chooseEmoji(e){
                console.log(e.currentTarget.innerHTML);
                //this.content.txt = e.currentTarget.innerHTML;
                this.$refs.leaveContent.focus();
                insertHtmlAtCaret(e.currentTarget.innerHTML);

                this.isshowemoji = false;

                function insertHtmlAtCaret(html) {
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
</style>
