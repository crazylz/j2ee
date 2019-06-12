<template>
	<div>
        <el-main>
			<div style="margin-top: 30px; font-size: 14px">
				<div class="login">
					<div>
						<h2 style="text-align: center;color: #606266; font-size:30px">新建贷款</h2>
					</div>
					<div style="margin: 0px">
						<el-form ref='userLoginForm' :model='Loan' label-width='200px' :rules='rules'>
							<el-form-item label='账号' prop='id' class="input">
								<el-input v-model='Loan.id' placeholder='请输入账号' autocomplete="on" id='userid' clearable></el-input>
							</el-form-item>
							<el-form-item label='借款额' prop='loans' class="input">
								<el-input v-model='Loan.loans' type='text' placeholder='请输入借款额' autocomplete="off" id='loans' clearable></el-input>
							</el-form-item>
                            <el-form-item label='利息' prop='interest' class="input">
								<el-input v-model='Loan.interest' autocomplete="off" id='interest' clearable></el-input>
							</el-form-item>
                            <div class="repay">
                                <span class="demonstration">还款日期</span>
                                <el-date-picker
                                v-model="Loan.date"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                            &nbsp;
							<el-form-item style="margin-right:170px; margin-bottom=0px">
                                <!-- 跳转成功页面 -->
								<el-button type='primary' 
								>新建贷款</el-button>
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
				Loan: {
					id: '',
                    loans: '',
                    interest:'10%',
                    date:'2019-6-12'
				},
				// 校验规则
				rules:{
					id: [
					{required: true,message: '用户名不能为空',trigger: 'blur'}
					],
					loans: [
					{required:true,message:'贷款额不能为空',	trigger: 'blur'},
					// {min:5,message:'密码长度必须大于5个字符字符',}
					]
                },
                

            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                }



			};
		},
		methods:{

		}
	}
</script>

<style >
	.login{
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		background: #fff;
		border: 1px solid #999999;
		border-radius: 30px;
		text-align: center;
		background-color: rgba(255,255,255,0.8);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

		
	}

	.el-main {
	    /* background-image:url('../assets/1.jpg'); */
		color: #333;
		text-align: center;
		line-height: 30px;
	    min-height:0%; 
  }
    .repay{
        right:0px;
    }
    .input{
        margin-right:140px;
    }
</style>
