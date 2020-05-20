import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingList from '../views/ShoppingList'
import ShoppingForm from '../views/ShoppingForm'


Vue.use(VueRouter)

  const routes = [
  {
	path:"/",
	name:"ShoppingList",
	component:ShoppingList
  },
  {
	path:"/form",
	name:"ShoppingForm",
	component:ShoppingForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
