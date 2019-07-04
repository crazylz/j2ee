<template>
	<div class="main">
		<div class="register">
			<h2 style="text-align:left; margin-left:50px;color: #606266;">忘记密码</h2>
            <a style="text-decoration:none" href="#/login"><p style="text-align:right; margin:0 30px 15px 0;font-size:14px">已有账号，直接登录
				</p></a>
			<el-form ref='forgetForm' :model='forgetInfo' label-width='80px' :rules='rules' >
				<el-form-item label='账号名' prop='account'>
					<el-input v-model='forgetInfo.account' placeholder='请输入帐号名' clearable></el-input>
				</el-form-item>
				<el-form-item label='身份证号' prop='idCardNumber'>
					<el-input v-model='forgetInfo.idCardNumber' placeholder='请输入身份证号' clearable></el-input>
				</el-form-item>

				<el-form-item label='新密码' prop='password'>
					<el-input v-model='forgetInfo.password' type='password' placeholder='请输入新密码'  clearable></el-input>
				</el-form-item>

				<el-form-item label='确认密码' prop='checkpassword'>
					<el-input v-model='forgetInfo.checkpassword' type='password' placeholder='请确认密码'  clearable></el-input>
				</el-form-item>
				
				<el-form-item style="margin-right:40px">
					<el-button type='primary' @click='handleForget()'
					>确认</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script >
import {post, get, post2, post_regist} from '../request/http.js'

let Base64 = require('js-base64').Base64

	export default {
		data(){
			var checkpassword=(rule,value,callback)=>{
				if(this.forgetInfo.password==value){
					 callback();
				}else{
					return callback(new Error('密码不一致'));
				}
			};

			return {
				forgetInfo: {
					account:'',
					idCardNumber: '',
					password: '',
					checkpassword:''
				},
				// 校验规则
				rules:{
					account:[
					{required: true,message: '账号名不能为空',trigger: 'blur'}
					],
					idCardNumber: [
					{required: true,message: '身份证号不能为空',trigger: 'blur'}
					],
					password: [
					{required:true,message:'密码不能为空',	trigger: 'blur'},
					{min:5,message:'密码长度必须大于5个字符字符',}
					],
					checkpassword: [
					{required:true,message:'密码不能为空',	trigger: 'blur'},
					{validator:checkpassword, trigger: 'blur'},
					{min:5,message:'密码长度必须大于5个字符字符',}
					],
				}
			};
		},
		methods:{
			handleForget(){
				if(this.forgetInfo.password != this.forgetInfo.checkpassword){
					this.$msgbox({
							title: '提示',
							message: '新密码与确认密码不匹配',
							type: 'error'
                    });
				}
				else{
					var res = post("/api/forgetPassword", {newPassword:Base64.encode(this.forgetInfo.password), 
					idCardNumber:this.forgetInfo.idCardNumber, 
					account:this.forgetInfo.account});

					res.then(result=>{
						if(result.code == 0){
							this.$msgbox({
								title: '提示',
								message: result.msg,
								type: 'success'
							});
							
							this.forgetInfo = {
								account:'',
								idCardNumber: '',
								password: '',
							};
						}
						else{
							this.$msgbox({
								title: '提示',
								message: result.msg,
								type: 'error'
							});
						}
					})
				}
				
			},

		}
	}
</script>

<style scoped>
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

	.register{
        width:390px;
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
		margin-right:40px;
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
	

</style>
