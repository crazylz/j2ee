<template>
	<div class="register">
		<h2 style="text-align: center;color: #606266;">账号注册</h2>

			<el-form ref='userLoginForm' :model='userLogin' label-width='80px' :rules='rules'>
				<el-form-item label='账号' prop='id'>
					<el-input v-model='userLogin.id' placeholder='请输入账号' autocomplete="off" id='userid' clearable></el-input>
				</el-form-item>
				<el-form-item label='密码' prop='password'>
					<el-input v-model='userLogin.password' type='password' placeholder='请输入密码' autocomplete="off" id='password' clearable></el-input>
				</el-form-item>
				<el-form-item label='手机号' prop='phone'>
					<el-input v-model='userLogin.phone' placeholder='请输入手机号' autocomplete="off" id='phone' clearable></el-input>
				</el-form-item>
				<el-form-item label='验证码' prop='check_num'>
					<el-input v-model='userLogin.check_num' placeholder='请输入验证码' autocomplete="off" id='check_num' clearable></el-input>
				</el-form-item>
				<el-form-item style="margin-right:80px">
					<el-button type='primary' @click='register()'
					>注册</el-button>
				</el-form-item>
			</el-form>
		</div>
</template>

<script >

	export default {
		name: 'login',
		data(){
				//定义了所有参数
			return {
				loginRole: 1,
				userLogin: {
					id: '',
                    password: '',
                    phone:''
				},
				// 校验规则
				rules:{
					id: [
					{required: true,message: '用户名不能为空',trigger: 'blur'}
					],
					password: [
					{required:true,message:'密码不能为空',	trigger: 'blur'},
					{min:5,message:'密码长度必须大于5个字符字符',}
                    ],
                    phone:[
                    {required:true,message:'手机号不能为空',	trigger: 'blur'}
					// {length:11,message:'密码长度必须为11个字符字符',}
                    ],
                    check_num:[
                    {required:true,message:'验证码不能为空',	trigger: 'blur'}    
                    ]
				}
			};
		},
		methods:{
			login:function(){
				var that=this;
				if(that.loginRole==1){
				that.$router.push({path:'/userhome'});
				}else if(that.loginRole==2){
				that.$router.push({path:'/guaranteehome'});
				}else if(that.loginRole==3){
				that.$router.push({path:'/adminhome'});
				}
			},
			register:function(){
				this.$router.push({path:'/register'});
			}
		}
	}
</script>

<style scoped>
	.register{
        width:450px;
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		background: #fff;
		border: 1px solid #999999;
		border-radius: 8px;
		text-align: center;
		background-color: rgba(255,255,255,0.8);
		
	}

	.el-form{
		margin-right:30px;
	}
	.el-main {
	    /* background-image:url('../assets/1.jpg'); */
		color: #333;
		text-align: center;
		line-height: 30px;
		min-height:100vh;
  }
	.bottom{
		font-size: 12px;
		color: #409eff;
		margin: 10px 10px 10px 10px;
	}
	.fade-enter-active,
	.fade-leave-active {
	    transition: all 0.35s ease;
	}

	.fade-enter,
	.fade-leave-active {
	    opacity: 0;
	}

</style>
