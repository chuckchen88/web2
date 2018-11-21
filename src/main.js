// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import VueLazyload from 'vue-lazyload'
import moment from 'moment/moment'

import store from './store'

import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
Vue.use(VueSocketio, socketio('http://192.168.1.243:2018'));

Vue.use(VueLazyload)
Vue.use(Toast);
Vue.config.productionTip = false

Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY/MM/DD HH:mm';
    return moment(value).format(formatString);
});


new Vue({
    el: '#app',
    router: router,
    store,
    components: { App },
    template: '<App/>'
})
