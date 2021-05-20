import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import { Button,Icon,Layout,Menu,Input,Carousel,Card,Row,Col,Tabs,FormModel,message,Avatar,Drawer,Pagination,DatePicker,TimePicker} from 'ant-design-vue';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Carousel);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(FormModel);
Vue.use(Avatar);
Vue.use(Drawer);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.prototype.$message = message

import formatDate from './utils/formatDate.js'
Vue.filter('formatDate', formatDate)

Vue.config.productionTip = false;

import './assets/style/normalize.css'
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
