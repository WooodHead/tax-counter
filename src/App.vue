<template>
  <div id="app">
  <sticky>
    <tab :line-width=1>
      <tab-item selected>个人所得税计算器</tab-item>
    </tab>
  </sticky>
  <router-view class="view"></router-view>
  <div>
  <tabbar>
    <tabbar-item selected v-link="{path:'/before'}">
      <img slot="icon" src="./assets/icon_nav_button.png">
      <span slot="label">税前</span>
    </tabbar-item>
    <tabbar-item v-link="{path:'/after'}">
      <img slot="icon" src="./assets/icon_nav_msg.png">
      <span slot="label">税后</span>
    </tabbar-item>
    <tabbar-item v-link="{path:'/bonus'}">
      <img slot="icon" src="./assets/icon_nav_cell.png">
      <span slot="label">年终奖</span>
    </tabbar-item>
    <tabbar-item v-link="{path:'/note'}">
      <img slot="icon" src="./assets/icon_nav_article.png">
      <span slot="label">说明</span>
    </tabbar-item>
  </tabbar>
</div>  
  </div>
</template>

<script>
import BeforeTax from './components/BeforeTax'
import AfterTax from './components/AfterTax'
import $ from 'n-zepto' 
import { Tabbar, TabbarItem, Sticky, Tab, TabItem } from 'vux/src/components'
const touch = require('assets/touch.js')
export default {
  components: {
    BeforeTax,
    AfterTax,
    Tabbar,
    TabbarItem,
    Sticky, 
    Tab, 
    TabItem
  },
  compiled: function () {
    window.onhashchange = function () {
      let hash = location.hash.replace('#!/','')
      let index = 0
      if(hash==='before'||hash===""){
        index = 0
      }else if(hash==='after'){
        index = 1
      }else if(hash==='bonus'){
        index = 2
      }else if(hash==='note'){
        index = 3
      }
      $('.weui_tabbar>a').eq(index).click()
    }
    //左右滑动切换功能，左滑切换到下一个，右滑切换到上一个
    $('body').on('swipeleft', function () {
      $('.v-link-active').next().click()
    })
    $('body').on('swiperight', function () {
      $('.v-link-active').prev().click()
    })
  }
}

</script>
<style lang="less">
@import '~vux/src/styles/reset';
</style>
<style>
  html {
    height: 100%;
  }
  body {
    display: flex;
    justify-content: center;
    min-height: 100%;
    background-color: #fbf9fe;
  }
  h1{
    text-align: center;
    color: #42b983;
  }
  #app,.view {
    width: 100%;
    box-sizing: border-box;
  }
  .view {
    margin: 44px 0 55px 0;
  }

  .weui_tabbar, .vux-sticky {
    position: fixed !important;
  }
  .padding {
		padding: 10px;
	}
</style>

