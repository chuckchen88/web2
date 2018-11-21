import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const key = 'user'
const store = new Vuex.Store({
    state () {
        return {
            user: null,
            myNews:false,
            isLogin:true,
            newsTabIndex:0
        }
    },
    getters: {
        getStorage: function (state) {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem(key))
            }
            return state.user
        },
        getMyNews:function(state){
            state.myNews = JSON.parse(localStorage.getItem('myNews'))
            return state.myNews
        }
    },
    mutations: {
        $_setStorage (state, value) {
            state.user = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        $_removeStorage (state) {
            state.user = null
            localStorage.removeItem(key)
        },
        $_setMyNews (state) {
            state.myNews = true
            localStorage.setItem('myNews', JSON.stringify(true))
        },
        $_removeMyNews (state) {
            state.myNews = false
            localStorage.removeItem('myNews')
        }
    }
})

export default store
