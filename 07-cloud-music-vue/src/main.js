import Vue from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import router from './router';
import store from './store';
import Fastclick from 'fastclick';
import '@assets/iconfonts/iconfont.css';
import '@assets/styles/reset.scss';
import {
    Swipe,
    SwipeItem,
    Lazyload,
    Sticky,
    Popup,
    Form,
    Field,
    Button,
    Icon,
    Tab,
    Tabs,
    PullRefresh,
} from 'vant';
import 'vant/lib/index.css';
Vue.config.productionTip = false;
Fastclick.attach(document.body);
Vue.use(VueCookies);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Sticky);
Vue.use(Popup);
Vue.use(Form).use(Field);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Tab).use(Tabs);
Vue.use(PullRefresh);
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
