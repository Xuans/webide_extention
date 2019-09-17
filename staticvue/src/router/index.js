import Vue from 'vue';
import VueRouter from 'vue-router';
import _import from '../util/_import';
Vue.use(VueRouter);
let routes=[
   //  {
   //      path:"/",
   //      redirect:'/new'
   //  },
    {
        path:'/new',
        component:_import('newItem/new'),
        redirect:'/new/item',
        children:[{
           path:'item',
           name:'Item',
           component:_import('newItem/chooseItem')
        },{
            path:'option/:id',
            name:"Option",
            component:_import('newItem/chooseOption')
         },
         {
            path:'install',
            name:"Install",
            component:_import('newItem/install')
         },
         {
            path:'finished',
            name:'Finished',
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