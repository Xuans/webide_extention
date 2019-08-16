import Vue from 'vue';
import VueRouter from 'vue-router';
import _import from '../util/_import';
Vue.use(VueRouter);
let routes=[
    // {
    //     path:"/",
    //     redirect:'/new'
    // },
    {
        path:'/new',
        component:_import('newItem/new'),
        redirect:'/new/item',
        children:[{
           path:'item',
           component:_import('newItem/chooseItem')
        },{
            path:'option/:id',
            component:_import('newItem/chooseOption')
         },
         {
            path:'install',
            component:_import('newItem/install')
         },
         {
            path:'finished',
            component:_import('newItem/finished')
         }
    ]
    },
    {
      path:'/dependency',
      component:_import('dependency/dependency')
  }

]
export default new VueRouter({routes:routes});