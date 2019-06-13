<template>
	<div >
        <el-main>
			<div style=" font-size: 14px">
				<div class="login">
					<div>
						<h2 style="text-align: center;color: #606266; font-size:30px">新建购买</h2>
					</div>
					<div style="margin: 0px">
						<el-form ref='userLoginForm' :model='Loan' label-width='200px' :rules='rules'>
							<el-form-item label='账号' prop='id' class="input">
								<el-input v-model='Loan.id' placeholder='请输入账号' autocomplete="on" id='userid' clearable></el-input>
							</el-form-item>
							<el-form-item label='购买额' prop='loans' class="input">
								<el-input v-model='Loan.loans' type='text' placeholder='请输入借款额' autocomplete="off" id='loans' clearable></el-input>
							</el-form-item>
                            <el-form-item label='利息' prop='interest' class="input">
								<el-input v-model='Loan.interest' autocomplete="off" id='interest' clearable></el-input>
							</el-form-item>
                            <div class="repay">
                                <span class="demonstration">取回日期</span>
                                <el-date-picker
                                v-model="Loan.date"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>

                                <el-form-item style="margin-right:200px;margin-top:10px">
								    <el-button type='primary' 
								    >购买</el-button>
								    <el-button type='primary' @click='set()'
								    >保存</el-button>
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
                    return time.getTime() < Date.now();
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
		 mounted(){
			this.Loan.id=localStorage.getItem('id');
			this.Loan.loans=localStorage.getItem('loans');
        },
		methods:{
            get:function(){
				var that=this;
				if(that.loginRole==1){
				that.$router.push({path:'/userhome'});
				}else if(that.loginRole==2){
				that.$router.push({path:'/guaranteehome'});
				}else if(that.loginRole==3){
				that.$router.push({path:'/adminhome'});
				}
			},
			set:function(){
				localStorage.setItem('id',this.Loan.id);
				localStorage.setItem('loans',this.Loan.loans);
			}
		}
	}
</script>

<style scoped>
	.login{
		position:absolute;
		/* 可以修改组件的位置 */
		top:200px;
		left:400px; 
		/* transform:translate(50%,50%); */
		background: #fff;
		border: 1px solid #999999;
		border-radius: 30px;
		text-align: center;
		background-color: rgba(255,255,255,0.8);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

		
	}

	.el-main {
		/* background-size: 100% 100%;
	    background-image:url("../../assets/background.jpg"); */
        height:93%;
        width:85%;
		color: #333;
		text-align: center;
		position:absolute;
    	top:60px;
    	left:200px;

		/* line-height: 30px; */
	    /* min-height:0%;  */
  }
    .repay{
        right:0px;
    }
    .input{
        margin-right:140px;
    }
    .el-form-item__content{
        margin-left: 0px;
    }
</style>
