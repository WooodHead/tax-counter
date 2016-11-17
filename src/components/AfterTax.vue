<template>
  <div class="beforetax">
    <div><span class="tip">收入类型</span>工资、薪金所得(税后)</div>
    <group title="税后工资">
      <x-input title="" placeholder="" :value.sync="afterTax" @keyup.enter="count" @on-change="Change"></x-input>
    </group>
    <group title="各项社会保险费">
      <x-input title="" placeholder="" :value.sync="insurance" @keyup.enter="count"></x-input>
    </group>
    <group :title="">
        <selector title="起征点" :options="thresholds" :value.sync="threshold"></selector>
    </group>
      
      <button-tab class="margin-top-bottom">
  	    <button-tab-item selected @click="count">计算</button-tab-item>
  	    <button-tab-item @click="reset">重置</button-tab-item>
    	</button-tab>
      <div v-if="total">
        <h3>计算结果</h3>
        <div><span class="tip">适用税率</span><span v-if="taxRate">{{ taxRate }}%</span></div>
        <div><span class="tip">应缴税款</span><span v-if="tax">{{ tax }}元</span></div> 
        <div><span class="tip">税前工资</span><span v-if="total">{{ total }}元</span></div> 
      </div>
      <alert :show.sync="show" title="当前工资不需要扣税!" button-text="" >
        <p style="text-align:center;"></p>
      </alert>
  </div>
  </template>

<script>
/*
*应纳税所得额 = （不含税收入金额 － 起征点 － 速算扣除数）/（1 － 税率）
*注意：公式中的速算扣除和与税率，对应工资个税税率表中的不含税级距。
*应纳税额 = 应纳税所得额 × 税率 － 速算扣除数
*注意：公式中的速算扣除和与税率，对应工资个税税率表中的含税级距，与税前工资计算个税方法一致。
*税前工资 = 应纳税所得额 + 起征点 + 各项社会保险金
*/
import { Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Alert, Group, XInput, Selector } from 'vux/src/components'
export default {
  components: {
    Flexbox, 
    FlexboxItem, 
    ButtonTab, 
    ButtonTabItem,
    Alert, 
    Group, 
    XInput, 
    Selector
  },
  data () {
    return {
      show: false,
      afterTax: '', // 税后工资
      total: '', // 税前工资
      insurance: '0', // 各项社会保险金
      threshold: '3500',
      thresholds: ['3500', '4800'], // 起征点
      taxableIncome: '', // 应纳税所得额
      balance: '', // 应纳税所得额(不含税)
      taxRate: '', // 税率
      fastReduce: '', // 速算扣除数
      tax: '' // 应缴税款
    }
  },
  methods: {
     count: function () {
      // threshold 将起点值转换为数字
      let threshold = Number(this.threshold)
      this.balance = this.afterTax - threshold
      if(this.balance>0){
	      if(this.balance<1455){ this.taxRate = 3; this.fastReduce = 0;}
	      else if(this.balance>1455 && this.balance<4155){ this.taxRate = 10; this.fastReduce = 105;}
	      else if(this.balance>4155 && this.balance<7755){ this.taxRate = 20; this.fastReduce = 555;}  
	      else if(this.balance>7755 && this.balance<27255){ this.taxRate = 25; this.fastReduce = 1005;}
	      else if(this.balance>27255 && this.balance<41255){ this.taxRate = 30; this.fastReduce = 2775;} 
	      else if(this.balance>41255 && this.balance<57505){ this.taxRate = 35; this.fastReduce = 5505;} 
	      else if(this.balance>57505){ this.taxRate = 45; this.fastReduce = 13505;}
	      // 应纳税所得额 =（不含税收入金额 － 起征点 － 速算扣除数）/（1 － 税率）
    	  this.taxableIncome = (this.afterTax - threshold - this.fastReduce) / (1 - this.taxRate / 100)
    	  // 应纳税额 = 应纳税所得额 × 税率 － 速算扣除数
	      this.tax = (this.taxableIncome * (this.taxRate / 100) - this.fastReduce).toFixed(2)
        // 税前工资
	      this.total = (this.taxableIncome + threshold + Number(this.insurance)).toFixed(2)
	    }else{
	    	// 显示弹窗
	        this.show = true
	        this.total = 0
	    	// 隐藏弹窗
	        let _this = this
        	window.setTimeout(function () { _this.show = false }, 1200);
       }
      },
    reset: function () {
      // 重置工资输入框的数值
      this.afterTax = ''
      this.insurance = '0'
      // 重置计算结果
      this.total = 0
      this.balance = 0
    },
    Change: function () {
    	if(!this.afterTax){
    		this.total = 0
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
	font-size: 1.4rem;
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
