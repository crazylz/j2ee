<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
			<el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">提现</a></el-breadcrumb-item>
		</el-breadcrumb>

        <el-main>
			<div style="margin-top: 30px;  ">
				<div class="withdraw">
					<div>
						<h2 style="text-align: center;color: #606266;" prop="available_money">您当前账户可提现额度：{{available_money}}</h2>
					</div>
					<div style="margin-right: 30px">
						<el-form ref='userWithdrawForm' :model='userWithdraw' label-width='80px' :rules='rules'>
							<el-form-item label='提现金额 ' prop='amount'>
								<el-input v-model='userWithdraw.amount' placeholder='请在此输入提现金额' autocomplete="off" id='withdraw_amount' clearable></el-input>
							</el-form-item>							
							<el-form-item>
								<el-button type='primary' @click='withdraw()'>提现</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</el-main>
	</div>
</template>

<script >

	export default {
		name: 'login',
		data(){
				//定义了所有参数
			return {
                available_money: '100',
				userWithdraw: {
					amount: '',
				},
				// 校验规则
				rules:{
					amount: [
                    {required: true,message: '提现金额不能为空',trigger: 'blur'},
					]
				}
			};
		},
		methods:{
			withdraw:function(){
			}
		}
	}
</script>

<style scoped>
	.withdraw{
		background: #fff;
		border: 1px solid #999999;
		border-radius: 8px;
		text-align: center;
		background-color: rgba(255,255,255,0.8);
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
