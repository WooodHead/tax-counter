<template>
  <div class="beforetax">
	  <div><span class="tip">收入类型</span>工资、薪金所得(税前)</div>
    <group title="税前工资">
      <x-input title="" placeholder="" :value.sync="total" @keyup.enter="count" @on-change="Change"></x-input>
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
    <div v-if="balance>0">
      <h3>个人所得税计算结果</h3>
      <div><span class="tip">应纳税所得额</span><span v-if="balance>0">{{ balance }}元</span></div> 
      <div><span class="tip">适用税率</span><span v-if="tax_rate">{{ tax_rate }}%</span></div>  
      <div><span class="tip">速算扣除数</span><span v-if="first_reduce>=0">{{ first_reduce }}元</span></div> 
      <div><span class="tip">应缴税款</span><span v-if="tax_total">{{ tax_total }}元</span></div> 
      <div><span class="tip">实发工资</span><span v-if="deserve">{{ deserve }}元</span></div> 
    </div>
    <alert :show.sync="show" title="当前工资不需要扣税!" button-text="" >
      <p style="text-align:center;"></p>
    </alert>
  </div>
  </template>

<script>
/*
*应纳税所得额 = 工资收入金额 － 各项社会保险费 － 起征点(3500元)
*应纳税额 = 应纳税所得额 x 税率 － 速算扣除数
*说明：如果计算的是外籍人士（包括港、澳、台），则个税起征点应设为4800元
*/
import Vue from 'vue'
import { Flexbox, FlexboxItem, ButtonTab, ButtonTabItem, Alert, Group, Switch, XInput, Selector } from 'vux/src/components'
export default {
  components: {
    Flexbox, 
    FlexboxItem, 
    ButtonTab, 
    ButtonTabItem,
    Alert,
    Group,
    Switch, 
    XInput, 
    Selector
  },
  data () {
    return {
      show: false,
      total: '', // 税后工资
      insurance: '0', // 各项社会保险金
      threshold: '3500',
      thresholds: ['3500', '4800'],
      balance: '',
      tax_rate: '', // 税率
      first_reduce: '', // 速算扣除数
      tax_total: '',
      deserve: ''
    }
  },
  methods: {
     autoclose: function () {
        setTimeout(function () {
          document.querySelector('.weui_dialog_ft a').click()
        }, 1500)
     },
     count: function () {
      let threshold = Number(this.threshold)
      this.balance = this.total - this.insurance - threshold
      if(this.balance > 0){
        if(this.balance <= 1500){ this.tax_rate = 3; this.first_reduce = 0;}
        else if(this.balance > 1500 && this.balance <= 4500){ this.tax_rate = 10; this.first_reduce = 105;}
        else if(this.balance > 4500 && this.balance <= 9000){ this.tax_rate = 20; this.first_reduce = 555;}  
        else if(this.balance > 9000 && this.balance <= 35000){ this.tax_rate = 25; this.first_reduce = 1005;}
        else if(this.balance > 35000 && this.balance <= 55000){ this.tax_rate = 30; this.first_reduce = 2775;} 
        else if(this.balance > 55000 && this.balance <= 80000){ this.tax_rate = 35; this.first_reduce = 5505;} 
        else if(this.balance > 80000){ this.tax_rate = 45; this.first_reduce = 13505;}
        this.tax_total = this.balance * this.tax_rate / 100 - this.first_reduce
        this.deserve = this.total - this.tax_total - this.insurance
      }else{
        this.show = true
        this.balance = 0
        let _this = this
        window.setTimeout(function () { _this.show = false },1200);
       }
    },
    reset: function () {
      // 重置工资输入框的数值
      this.total = ''
      this.insurance = '0'
      // 重置计算结果
      this.balance = 0
    },
    Change: function () {
      if(!this.total){
        this.balance = 0
      }
    }
  }
}
</script>