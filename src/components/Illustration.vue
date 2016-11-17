<template>
	<div class="padding">
		<div>
			<h3>个人所得税计算公式</h3>
			<p>应纳税所得额 = 工资收入金额 － 各项社会保险费 － 起征点(3500元)</p>
			<p>应纳税额 = 应纳税所得额 x 税率 － 速算扣除数</p>
			<p>说明：如果计算的是外籍人士（包括港、澳、台），则个税起征点应设为4800元。</p>
		</div>
		<table>
			<tbody align="center">
			    <tr>
			        <th style="">级数</th>
			        <th>应纳税所得额(含税)x1</th>
			        <th>应纳税所得额(不含税)x2</th>
			        <th style="">税率(%)</th>
			        <th style="">速算扣除数</th></tr>
			    <tr>
			        <td>1</td>
			        <td>x1&lt;=1500</td>
			        <td>x2&lt;=1455</td>
			        <td>3</td>
			         <td>0</td>
			     </tr>
			    <tr>
			        <td>2</td>
			        <td>1500&lt;x1&lt;=4,500 </td>
			        <td>1455&lt;x2&lt;=4,155 </td>
			        <td>10</td>
			        <td>105</td>
			    </tr>
			    <tr>
			        <td>3</td>
			        <td>4,500&lt;x1&lt;=9,000</td>
			        <td>4,155&lt;x2&lt;=7,755 </td>
			        <td>20</td>
			        <td>555</td>
			    </tr>
			    <tr>
			        <td>4</td>
			        <td>9,000&lt;x1&lt;=35,000</td>
			        <td>7,755&lt;x2&lt;=27,255</td>
			        <td>25</td>
			        <td>1,005</td>
			    </tr>
			    <tr>
			        <td>5</td>
			        <td>35,000&lt;x1&lt;=55,000</td>
			        <td>27,255&lt;x2&lt;=41,255</td>
			        <td>30</td>
			        <td>2,775</td>
			    </tr>
			    <tr>
			        <td>6</td>
			        <td>55,000&lt;x1&lt;=80,000 </td>
			        <td>41,255&lt;x2&lt;=57,505 </td>
			        <td>35</td>
			        <td>5,505</td>
			    </tr>
			    <tr>
			        <td>7</td>
			        <td>x1&gt;80,000</td>
			        <td>x2&gt;57,505</td>
			        <td>45</td>
			        <td>13,505</td>
			    </tr>
			</tbody>
		</table>
		<div>
			<h3>年终奖计算公式</h3>
			<p>应纳税所得额 = 年终奖金</p>
			<p>应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数</p>
		</div>
    </div>
</template>