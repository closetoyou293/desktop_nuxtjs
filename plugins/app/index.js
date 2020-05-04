import Vue from 'vue';

//App
import App from '~/components/box/app.vue' //Not Delete
import APPNone from '~/app/none.vue' //Not Delete
import APPPower from '~/app/power.vue' //Not Delete

import APPSetting from '~/app/setting/main.vue'

//SetApp
Vue.component('App', App); //Not Delete
Vue.component('APPNone', APPNone); //Not Delete
Vue.component('APPPower', APPPower); //Not Delete

Vue.component('APPSetting', APPSetting);