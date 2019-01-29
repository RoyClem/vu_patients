import Vue from 'vue'
import Router from 'vue-router'
import searchResults from './components/SearchResults'
 
Vue.use(Router)

export default new Router({
    base: '/',
    mode: 'history',
    routes: [
        {
            path: '/search/:slug',
            name: 'search',
            component: searchResults
        },
   ]
});