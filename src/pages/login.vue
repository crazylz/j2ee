<template>
	<div>
        <el-main>
			<div style="margin-top: 30px;  ">
				<div class="login">
					<div>
						<h2 style="text-align: center;color: #606266;">账号登录</h2>
					</div>
					<div style="margin-right: 30px">
						<el-form ref='userLoginForm' :model='userLogin' label-width='80px' :rules='rules'>
							<el-form-item label='账号' prop='id'>
								<el-input v-model='userLogin.id' placeholder='请输入账号' autocomplete="off" id='userid' clearable></el-input>
							</el-form-item>
							<el-form-item label='密码' prop='password'>
								<el-input v-model='userLogin.password' type='password' placeholder='请输入密码' autocomplete="off" id='password' clearable></el-input>
							</el-form-item>
							<el-form-item prop='role'>
								<el-radio-group v-model="loginRole" border>
									<el-radio :label="1">普通用户</el-radio>
									<el-radio :label="2">担保人</el-radio>
									<el-radio :label="3">管理员</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item>
								<el-button type='primary' @click='login("userLoginForm")'
								>登录</el-button>
								<el-button type='primary' @click='login("userLoginForm")'
								>注册</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div class="bottom">
						<el-row>
							<el-button type='text'>忘记密码？</el-button>
						</el-row>
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
				loginRole:1,
				userLogin: {
					id: '',
					password: ''
				},
				// 校验规则
				rules:{
					id: [
					{required: true,message: '用户名不能为空',trigger: 'blur'}
					],
					password: [
					{required:true,message:'密码不能为空',	trigger: 'blur'},
					{min:5,message:'密码长度必须大于5个字符字符',}
					]
				}
			};
		},
		methods:{
			// login:function(userLoginForm){
			// 	var that=this;
			// 	this.$refs['userLoginForm'].validate((valid)=>{
			// 		if(valid){//表单验证成功
			// 			var password=document.getElementById('password').value;
			// 			var userid=document.getElementById('userid').value;
			// 			sessionStorage.setItem('role', this.loginRole);
			// 			sessionStorage.setItem('userid', userid);
			// 			let postData = this.$qs.stringify({//数据数组
			// 				id: userid,
			// 				password: password,
			// 			 	role: this.loginRole
			// 			});
			// 			this.$ajax({
			// 				method:'post',
			// 				url:'http://localhost:5000/login',
			// 				data:postData
			// 			}).then(function (response){
			// 				if (response.data.success == 'true') {//登陆成功
			// 					console.log(response.data);
			// 					var sessionStorage = window.sessionStorage;
			// 					sessionStorage.setItem('username',response.data.name);
			// 					sessionStorage.setItem('isHead',response.data.is_head);
			// 					sessionStorage.setItem('grade_classid',response.data.grade_classid);
			// 					if(that.loginRole==1){
			// 						that.$router.push({path:'/home'});
			// 					}else if(that.loginRole==2){
			// 						that.$router.push({path:'/business_home'})
			// 					}else{
			// 						that.$router.push({path:'/admin_home'})
			// 					}
			// 				} else {
			// 				// console.log(response.data.success);
			// 					that.$msgbox({
			// 						title:'登录失败',
			// 						message:"密码或用户名错误",
			// 						type:'error'
			// 					});
			// 				}
			// 			}).catch(function (error){
			// 				that.$msgbox({
			// 					title: '登录失败',
			// 					message: '服务器异常:(',
			// 					type: 'error'
			// 				});
			// 			})
			// 		}
					// else{//表单验证失败
					// 	this.$msgbox({
					// 		title: '登录失败',
					// 		message: '请检查输入',
					// 		type: 'error'
					// 	});
					// }
			// 	});
			// },
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
		border-radius: 8px;
		text-align: center;
		background-color: rgba(255,255,255,0.8);
		
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
