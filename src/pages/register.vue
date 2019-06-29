<template>
	<div class="main">
		<div class="register">
			<h2 style="text-align:left; margin-left:50px;color: #606266;">账号注册</h2>
            <a style="text-decoration:none" href="#/login"><p style="text-align:right; margin:0 30px 15px 0;font-size:14px">已有账号，直接登录
				</p></a>
			<el-form ref='registerForm' :model='registerInfo' label-width='80px' :rules='rules' >
				<el-form-item label='账号' prop='id'>
					<el-input v-model='registerInfo.id' placeholder='请输入账号' autocomplete="off" id='userid' clearable></el-input>
				</el-form-item>
				<el-form-item label='密码' prop='password'>
					<el-input v-model='registerInfo.password' type='password' placeholder='请输入密码'  clearable></el-input>
				</el-form-item>
				<el-form-item label='确认密码' prop='password_sure'>
					<el-input v-model='registerInfo.password_sure' type='password'  placeholder='请再次输入密码' clearable></el-input>
				</el-form-item>
				<el-form-item label='手机号' prop='phone'>
					<el-input v-model='registerInfo.phone' placeholder='请输入手机号' clearable></el-input>
				</el-form-item>
				<el-form-item label='验证码' prop='check_num' >
					<el-input  v-model='registerInfo.check_num' placeholder='请输入手机验证码'  clearable>
						<el-button v-if="checkVisible==true" slot="append" @click="checkNum()" >发送验证码</el-button>
						<el-button v-else slot="append" @click="checkNumAgain()" :disabled='checkDisabled'>重新发送</el-button>
					</el-input>
				</el-form-item>
				
				<el-form-item style="margin-right:40px">
					<el-button type='primary' @click='register()'
					>注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script >
import {post, get, post2, post_regist} from '../request/http.js'
	export default {
		data(){
			var checkPhone=(rule,value,callback)=>{
				if(!value){
					return callback(new Error('手机号不能为空'));
				}else{
					const reg=/^1[34578]\d{9}$/ ;
					if(reg.test(value)){
						callback();
					}else{
						return callback(new Error('请输入正确的手机号'));
					}
				}
			};

			var checkpassword=(rule,value,callback)=>{
				if(this.registerInfo.password==value){
					 callback();
				}else{
					return callback(new Error('密码不一致'));
				}
			};

				//定义了所有参数
			return {
				checkDisabled:false,
				checkVisible:true,
				registerInfo: {
					id: '',
					password: '',
					password_sure:'',
					phone:'',
					check_num:null
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
					password_sure: [
					{required:true,message:'确认密码不能为空',	trigger: 'blur'},
					{validator:checkpassword,trigger:'blur'}
                    ],
                    phone:[
                    {validator:checkPhone,trigger: 'blur'}
					
                    ],
                    check_num:[
                    {required:true,message:'验证码不能为空',	trigger: 'blur'}    
                    ]
				}
			};
		},
		methods:{
			register:function(){
			var res=post_regist("/api/register",{
				account:this.registerInfo.id,
				password:this.registerInfo.password,
                vcodeInput:this.registerInfo.check_num
			})
			res.then(data=>{
				console.log(data.code);
				if(data.code==0)
				{
					alert(data.msg);
					this.$router.push({path:'/login'});
				}
				else {
					alert(data.msg);
				}
			}).catch(error=>{
            alert(error);
			})	
			},

			checkNum:function(){
			this.checkVisible=false;
			
			var res=post2("/api/vcode",{phoneNumber:this.registerInfo.phone})
			res.then(data=>{
			console.log(data);
			alert(data.msg);
			}).catch(error=>{
				alert(error);
			})
			},

			checkNumAgain:function(){
			this.checkVisible=false;
			var res=post("/api/vcode",{phoneNumber:this.registerInfo.phone})
			res.then(data=>{
			console.log(data);
			alert(data.msg);
			}).catch(error=>{
				alert(error);
			})
			}

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
