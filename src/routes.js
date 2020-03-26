import pageBuyer from './page/homepage.vue'
import payment from './page/payment.vue'
import login from './page/login.vue'

export const routes = [
  {
    path: '/',
    component: login,
    name: 'page-buyer',
  },  
  {
    path: '/page-buyer',
    component: pageBuyer,
    name: 'page-buyer',
    children:[{
      path: ':category',
      component: pageBuyer,
    }]
  },
  {
    path: '/payment',
    component: payment,
    name: 'payment',
  },  
  
]