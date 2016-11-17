import Vue from 'vue'
import App from './App'
import Home from './components/HelloFromVux'
import After from './components/AfterTax'
import Before from './components/BeforeTax'
import Illustration from './components/Illustration'
import Bonus from './components/AnnualBonus'
import VueRouter from 'vue-router'

import $ from 'n-zepto' 
const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)


const router = new VueRouter()

router.map({
  '/': {
    component: Before
  },
  '/before': {
    component: Before
  },
  '/after': {
    component: After
  },
  '/bonus': {
    component: Bonus
  },
  '/note': {
    component: Illustration
  }
})

router.redirect({
    '*': "/before"
});

router.start(App, '#app');


