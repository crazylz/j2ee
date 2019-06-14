<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
			<el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">充值</a></el-breadcrumb-item>
		</el-breadcrumb>


		<div class="invest">
				<h2 style="text-align: center;color: #606266;" prop="now_money">您当前账户可用额度：{{now_money}}</h2>
				<el-form ref='userInvestForm' :model='userInvest' label-width='80px' :rules='rules'>
					<el-form-item label='充值金额 ' prop='invest_amount'>
						<el-input v-model='userInvest.invest_amount' placeholder='请在此输入充值金额' autocomplete="off" id='investing_amount' clearable></el-input>
					</el-form-item>							
					<el-form-item>
						<el-button type='primary' @click='invest()'>充值</el-button>
					</el-form-item>
				</el-form>
		</div>
	</div>
</template>

<script >

	export default {
		name: 'invest',
		data(){
				//定义了所有参数
			return {
                now_money: '100',
				userInvest: {
					invest_amount: '',
				},
				// 校验规则
				rules:{
					invest_amount: [
                    {required: true,message: '提现金额不能为空',trigger: 'blur'},
					]
				}
			};
		},
		methods:{
			invest:function(){
			}
		}
	}
</script>

<style scoped>
	.invest{
		background: #fff;
		border: 1px solid #999999;
		border-radius: 8px;
		text-align: center;
		background-color: rgba(255,255,255,0.8);
        width:fit-content;
        margin:auto;
	}

    .middle{
        width:fit-content;
        margin:auto;
    }

	.el-main {
	    /* background-image:url('../assets/1.jpg'); */
		color: #333;
		text-align: center;
		line-height: 30px;
        
  }
	.bottom{
		font-size: 12px;
		color: #409eff;
		margin: 10px 10px 10px 10px;
	}

</style>
