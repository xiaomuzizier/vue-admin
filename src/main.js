import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
// import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'

import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import All from './views/main/All.vue'
import Project from './views/project/project.vue'
import Owner from './views/project/owner.vue'
import Company from './views/project/company.vue'
import manifest from './views/project/project.vue'
import echarts from './views/charts/echarts.vue'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

axios.get(`http://182.61.13.156/nav/`).then( (res)=> {
    var list= res.data;
    console.log('166',list);
    var projectLength=list.projectName.length;
    var ownerLength=list.ownerName.length;
    var companyLength=list.companyName.length;

    var projectName=list.projectName;
    var ownerName=list.ownerName;
    var companyName=list.companyName;
    console.log('a',projectLength);
    function genData(){
        console.log('aaa');
        var projectData = [{ path: '/all', component: All, name: 'All',hidden:true},
            { path: '/abandoned', component: All, name: 'abandoned',hidden:true},
            { path: '/merged', component: All, name: 'merged',hidden:true}];
        var ownerData = [];
        var companyData = [];

        for (var i = 0; i < projectLength-1; i++) {
            let   name1 = projectName[i];
            projectData.push({
                path: '/'+name1,
                component:Project,
                name:name1
            });
        }
        for (var i = 0; i < ownerLength-1; i++) {
            let   name2 = ownerName[i];
            ownerData.push({
                path: '/'+name2,
                component:Owner,
                name:name2
            });
        }
        for (var i = 0; i < companyLength-1; i++) {
            let   name3 = companyName[i];
            companyData.push({
                path: '/'+name3,
                component:Company,
                name:name3
            });
        }

        return {
            projectData: projectData,
            ownerData: ownerData,
            companyData: companyData
        };
    };



    var dat=genData();
    return dat;
}).then((response)=>{
  var project=response.projectData;
  console.log('ss',project)
  var owner=response.ownerData;
  var company=response.companyData;
  var routes= [
      {
          path: '/login',
          component: Login,
          name: '',
          hidden: true
      },
      {
          path: '/404',
          component: NotFound,
          name: '',
          hidden: true
      },
      {
          path: '/',
          component: Home,
          name: '项目',
          iconCls: 'el-icon-message',//图标样式class
          children:project
      },
      {
          path: '/',
          component: Home,
          name: '用户',
          iconCls: 'fa fa-id-card-o',
          children: owner
      },
      {
          path: '/',
          component: Home,
          name: '公司',
          iconCls: 'fa fa-bar-chart',
          children: company
      },
      {
          path: '*',
          hidden: true,
          redirect: { path: '/404' }
      }];
    const router = new VueRouter({
        routes
    })
    new Vue({
        //el: '#app',
        //template: '<App/>',
        router,
        store,
        //components: { App }
        render: h => h(App)
    }).$mount('#app')

})
    .catch( (error)=> {
        console.log(error);
    });
//NProgress.configure({ showSpinner: false });

// const router = new VueRouter({
//   routes
// })
// new Vue({
//   //el: '#app',
//   //template: '<App/>',
//   router,
//   store,
//   //components: { App }
//   render: h => h(App)
// }).$mount('#app')

