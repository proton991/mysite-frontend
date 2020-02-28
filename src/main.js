import Vue from 'vue'
import App from './App.vue'
import VueParticles from 'vue-particles'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import './custom.scss'
import '@/icons'
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import echarts from 'echarts'
import hljs from 'highlight.js'
import '@/assets/css/idea.css'
Vue.directive('highlight', el => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
});
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueParticles);
Vue.use(ElementUI);
Vue.use(mavonEditor);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
