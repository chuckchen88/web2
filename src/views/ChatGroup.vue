<template>
    <div>
        <nav-header :showcolor="shownavcolor" :navname="shownavname" style="position:fixed"></nav-header>
        <div class="chat" ref="chat">
            <div class="layout" ref="layout">
                <div class="more">加载更多</div>
                <div class="time">20:32</div>
                <div class="message">chuck进入了房间</div>
                <div class="list">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list own">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="fl-l con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list own">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="fl-l con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list own">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="fl-l con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list own">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="fl-l con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="list own">
                    <div class="head-img"><img src="../assets/images/head-img.png"></div>
                    <div class="fl-l con">
                        <h3>chuck</h3>
                        <div class="info">
                            你能把我怎么地哈哈哈哈哈哈哈哈哈哈<img data-v-378b9486="" src="static/images/emoji/1.png">
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="input">
                <div class="emojis" v-bind:class="{'show':isshowemoji}">
                    <div class="emoji" v-for="n in 68" ref="emojiItem" @click="chooseEmoji">
                        <img :src="'../static/images/emoji/'+n+'.png'">
                    </div>
                </div>
                <button class="fl-r sendbtn">
                    发送
                </button>
                <div class="btn-icons fl-l" style="padding-top:.2em;">
                    <label style="display:inline-block;">
                        &nbsp;<img width="26" src="../assets/images/camera.png">&nbsp;
                        <input type="file" accept="image/*" style="display:none;">
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

    export default {
        data(){
            return{
                isshowemoji: false,
                shownavcolor:true,
                shownavname:'聊天室'
            }
        },
        components:{
            NavHeader
        },
        mounted () {
            this.setLayoutHeight();
            this.setDefaultScroll();
            window.onresize = () => {
                if (!this.timer) {   //优化resize可能带来的卡顿问题
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        that.setLayoutHeight();
                        that.setDefaultScroll();
                        that.timer = false
                    }, 400)
                }
            }
        },
        methods:{
            setLayoutHeight(){
                this.$refs.layout.style.bottom = this.$refs.inputChat.offsetHeight-36 + 'px';
                this.$refs.layout.style.height = (this.$refs.chat.clientHeight - this.$refs.inputChat.offsetHeight + 36) + 'px';
            },
            setDefaultScroll(){
                this.$refs.layout.scrollTop = this.$refs.layout.scrollHeight;
            },
            showEmojis(){
                this.isshowemoji = !this.isshowemoji;
                this.setDefaultScroll;
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

<style scoped>

</style>
