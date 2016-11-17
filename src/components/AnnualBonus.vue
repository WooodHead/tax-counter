<template>
  <div class="beforetax">
    <div><span class="tip">收入类型</span>年终奖所得</div>
    <group title="年终奖金">
      <x-input :keyboard="number" :value.sync="bonus" @keyup.enter="count" @on-change="Change"></x-input>
    </group>
      <button-tab class="margin-top-bottom">
  	    <button-tab-item selected @click="count">计算</button-tab-item>
  	    <button-tab-item @click="reset">重置</button-tab-item>
    	</button-tab>
      <div v-if="BonusAfterTax">
        <h3>计算结果</h3>
        <div><span class="tip">平均每月</span><span v-if="average">{{ average }}</span></div>
        <div><span class="tip">适用税率</span><span v-if="taxRate">{{ taxRate }}%</span></div>
        <div><span class="tip">速算扣除数</span><span v-if="taxRate">{{ fastReduce }}</span></div>
        <div><span class="tip">应缴税款</span><span v-if="tax">{{ tax }}元</span></div> 
        <div><span class="tip">税后收入</span><span v-if="bonus">{{ BonusAfterTax }}元</span></div> 
      </div>
      <alert :show.sync="show" title="当前工资不需要扣税!" button-text="" >
        <p style="text-align:center;"></p>
      </alert>
  </div>
  </template>

<script>
/*
*应纳税所得额 = 年终奖金
*应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数
*/
import { Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Alert, Group, XInput, Selector, XNumber } from 'vux/src/components'
export default {
  components: {
    Flexbox, 
    FlexboxItem, 
    ButtonTab, 
    ButtonTabItem,
    Alert, 
    Group, 
    XInput, 
    Selector,
    XNumber
  },
  data () {
    return {
      show: false,
      average: '', // 平均每月
      bonus: '', // 年终奖金
      taxRate: '', // 税率
      fastReduce: '', // 速算扣除数
      tax: '', // 应缴税款
      BonusAfterTax: '' // 税后收入
    }
  },
  methods: {
     count: function () {
      let threshold = Number(this.threshold)
      //计算月平均
      this.average = (this.bonus / 12).toFixed(2)
      // 根据月平均推断 税率 和 速算扣除数
      if(this.average > 0){
        if(this.average <= 1500){ this.taxRate = 3; this.fastReduce = 0;}
        else if(this.average>1500 && this.average<=4500){ this.taxRate = 10; this.fastReduce = 105;}
        else if(this.average>4500 && this.average<=9000){ this.taxRate = 20; this.fastReduce = 555;}  
        else if(this.average>9000 && this.average<=35000){ this.taxRate = 25; this.fastReduce = 1005;}
        else if(this.average>35000 && this.average<=55000){ this.taxRate = 30; this.fastReduce = 2775;} 
        else if(this.average>55000 && this.average<=80000){ this.taxRate = 35; this.fastReduce = 5505;} 
        else if(this.average>80000){ this.taxRate = 45; this.fastReduce = 13505;}
	      
    	  // 应纳税额 = 应纳税所得额 × 税率 － 速算扣除数
	      this.tax = (this.bonus * (this.taxRate / 100) - this.fastReduce).toFixed(2)
        // 税后收入
	      this.BonusAfterTax = (this.bonus - this.tax).toFixed(2)
	    }else{
        this.show = true
        this.BonusAfterTax = 0
        let _this = this
        window.setTimeout(function () { _this.show = false },1200);
       }
      },
    reset: function () {
      // 重置年终奖输入框的数值
      this.average = ''
      // 重置计算结果
      this.BonusAfterTax = 0
    },
    Change: function () {
      if(!this.bonus){
        this.BonusAfterTax = 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html, body, div, span, input, form, select {
	margin: 0;
	padding: 0;
}
html {
	font-size: 62.5%;
}
body {
	font-size: 1.2rem;
}
.margin-top-bottom {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}
.beforetax {
	text-align: left;
  padding: 20px;
}
.weui_cell {
  padding: 0;
}
.beforetax input,.beforetax select {
  box-sizing: border-box;
  margin-right: 10px;
  height: 30px;
  line-height: 30px;
  padding-left: 8px;
}
.beforetax .tip {
	display: inline-block;
	width: 90px;
}
</style>
