<template>
	<div class>
		<el-breadcrumb separator="/" style="postion:absolute;left:20px;top:20px;margin-bottom:30px;font-size:18px;">
			<el-breadcrumb-item :to="{ path: '/' }">用户</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">借款</a></el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">新建借款</a></el-breadcrumb-item>
		</el-breadcrumb>

		<div class="main">
			<div style=" font-size: 14px " class="login">
				<h2 style="text-align: center;color: #606266; font-size:30px">新建借款</h2>
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

					<el-form-item style="margin-right:200px;margin-top:10px">
						<el-button type='primary' 
						>贷款</el-button>
						<el-button type='primary' @click='set() '  
						>保存</el-button>
					</el-form-item>
				</el-form>   
			</div>
		</div>
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
				// if(that.loginRole==1){
				// that.$router.push({path:'/userhome'});
				// }else if(that.loginRole==2){
				// that.$router.push({path:'/guaranteehome'});
				// }else if(that.loginRole==3){
				// that.$router.push({path:'/adminhome'});
				// }
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
		display: table-cell;
		vertical-align: center;
		/* align-self: center; */
		/* width: 700px;
		height:500px;
		position:relative;
		left:50%;
        bottom:50%; */
		/* position:absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%); */
		/* margin: 0px 0px -250px -350px; */
		border: 1px solid #999999;
		border-radius: 30px;
		text-align: center;
		background-color: rgba(255,255,255,0.8);	
	}

    .main{
         display:table;
		
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
