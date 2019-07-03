<template>
	<div class="main">

			<!-- <transition>
			<img v-if='loginRole==1' src="../assets/timg.jpg" style="width: 100%;border-radius: 15px">
			<img v-if='loginRole==2' src="../assets/yewu1.jpg" style="width: 100%;border-radius: 15px">
			<img v-if='loginRole==3' src="../assets/login.jpg" style="width: 100%;border-radius: 15px">
		</transition> -->
		<div class="login">
			<h2 style="text-align: center;color: #606266;">账号登录</h2>
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
						<el-radio :label="3">审核员</el-radio>
						<el-radio :label="4">管理员</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item class="button">
					<el-button type='primary' @click='login()'
					>登录</el-button>
					<el-button type='primary' @click='register()'
					>注册</el-button>
				</el-form-item>
			</el-form>

			<el-row>
				<el-button type='text'>忘记密码？</el-button>
			</el-row>
		</div>
	</div>
</template>

<script >
import {post, get, post1} from '../request/http.js'

let Base64 = require('js-base64').Base64

	export default {
		name: 'login',
		data(){
				//定义了所有参数
			return {
				loginRole: 1,
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
			login:function(){
				var that=this;
				if(that.loginRole==1){
					var res = post1("/api/login", {
						account: this.userLogin.id,
						password: Base64.encode(this.userLogin.password),
						type: 2
					})
					res.then(data => {
						console.log(data);
						console.log(localStorage.getItem('session'));
						if(data.code == 0)
						{
							that.$router.push({path:'/userhome/personalinfo'});
						}
						else{
							alert(data.msg);
						}
					}).catch(error => {
						console.log(error)})
				}
				else if(that.loginRole==2){
					var res = post1("/api/login", {
						account: this.userLogin.id,
						password: Base64.encode(this.userLogin.password),
						type: 1
					})
					res.then(data => {
						console.log(data.code)
						if(data.code == 0)
						{
							that.$router.push({path:'/guaranteehome'});
						}
						else{
							alert(data.msg);
						}
					}).catch(error => {
						console.log(error)})
				}
				else if(that.loginRole==4){
					var res = post1("/api/login", {
						account: this.userLogin.id,
						password: Base64.encode(this.userLogin.password),
						type: 0
					})
					res.then(data => {
						console.log(data.code)
						if(data.code == 0)
						{
							that.$router.push({path:'/adminhome'});
						}
						else{
							alert(data.msg);
						}
					}).catch(error => {
						console.log(error)})
				}
				else{
					var res = post1("/api/login", {
						account: this.userLogin.id,
						password: Base64.encode(this.userLogin.password),
						type: 3
					})
					res.then(data => {
						console.log(data.code)
						if(data.code == 0)
						{
							that.$router.push({path:'/reviewerhome'});
						}
						else{
							alert(data.msg);
						}
					}).catch(error => {
						console.log(error)})
				}
			},
			register:function(){
				this.$router.push({path:'/register'});
			}
		}
	}
</script>

<style scoped>
/* 必须加上绝对定位，才能够有width、height，不然是相对于app入口的包含快height100%，高度为0 */
/* app.vue的入口自带了8px的左和上外边距 */
    .main{
		/* width:100%;
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%); */
		position: absolute;
		width:100%;
		height:100%;
		top:-8px;
		left:-8px;
		background-image: url(../assets/p2p.jpg);
		background-size: 100%;

	}
    
	/* .image{
		float:left;
		margin-left:16%;
		width:30%;
		height: 400px;
	} */

	.login{
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		background-color: transparent;
		border: 1px solid #999999;
		border-radius: 8px;
		text-align: center;
		background-color: rgba(255,255,255,0.8);
		
	}
  
	/* ？？？该居中方式为何无效 */
	.el-radio-group  {
		/* width:fit-content;
		text-align: center; */
		margin-left:-40px;
	}

	.button {
		margin-left:-40px;
	}
	.el-form{
		margin-right:40px;
	}

	.el-botton{
		font-size: 12px;
		color: #409eff;
		margin: 10px 10px 10px 10px;
	}

</style>
