import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import mainRouter from '@/components/主页'
import addRouter from '@/components/添加'

import updateRouter from '@/components/修改'
import mainListRouter from '@/components/单子'


import searchRouter from '@/components/搜索'


Vue.use(Router)




export default new Router({
  routes: [
    {
      path: '/',
//    name: 'HelloWorld',
//    component: HelloWorld
			redirect: '/main'
    },
    {
    	path: '/main',
    	component: mainRouter,
//  	children: [
//  		{
//  			path: 'list',
//  			component: mainListRouter
//  		},
//  		{
//  			path: 'update',
//  			component: updateRouter
//  		},
//  		{
//  			path: '',
//  			redirect: '/main/list'
//  		}
//  	
//  	]
    },
    {
    	path: '/add',
    	component: addRouter
    },
    {
    	path: '/search',
    	component: searchRouter
    }
  ]
})
