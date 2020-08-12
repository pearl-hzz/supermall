import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)

Vue.use(ElementUI);
//事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
//使用懒加载的插件(需要将使用懒加载的图片路径改为src->v-lazy)
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png')
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')