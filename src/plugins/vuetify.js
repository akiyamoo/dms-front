import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { Ripple } from 'vuetify/lib/directives'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify, {
    directives: {
        Ripple
    },
    customProperties: true,
    icons: {
        iconfont: 'fa',
    },
});

export default new Vuetify({
});
