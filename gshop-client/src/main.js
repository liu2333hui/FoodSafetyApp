// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


/*
 * Mint-ui registration
 */
import { Tabbar, TabItem} from 'mint-ui';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
import { Field } from 'mint-ui';
Vue.component(Field.name, Field);


import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);


//Vue.component("MessageBox", MessageBox)


import { Button, Upload , Card,Row,Col, Select,Option} from 'view-design';
Vue.component('I-Button', Button);
Vue.component('I-Upload', Upload);
Vue.component('Card', Card)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Select', Select)
Vue.component('Option', Option)

import { Menu, MenuItem, MenuGroup, Icon} from 'view-design';
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('MenuGroup', MenuGroup)
Vue.component('Icon', Icon)

import 'view-design/dist/styles/iview.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
