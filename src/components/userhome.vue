<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <!-- 顶栏 -->
      <el-header >
        <span  class="system-name">{{systemName}}</span>
        <span class="bell" @click="bell()"><big><i class="el-icon-message-solid"></i></big></span>
        <div class="user">
          <el-dropdown>
            <span>
              <big><i class="el-icon-user-solid"></i></big>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">个人资料</el-dropdown-item>
              <el-dropdown-item icon="el-icon-wallet">充值/提现</el-dropdown-item>
              <a href="#/login">
              <el-dropdown-item icon="el-icon-unlock">登出</el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{userName}}用户</span>
        </div>
      </el-header>
        
        <!-- 需要将侧栏和主页面设置当一个容器里面 -->
        <el-container>
          <!-- 侧栏 -->
          <el-aside width="200px">
            <el-menu :default-active="$route.path" router unique-opened >
              <!-- <el-menu-item index="/userhome/persondata">
              <i class="el-icon-user"></i>个人资料
              </el-menu-item> -->
               <el-menu-item index="/userhome/loans">
              <i class="el-icon-discount"></i>借款
               </el-menu-item>
               <el-menu-item index="/userhome/products">
              <i class="el-icon-shopping-cart-2"></i>购买产品
               </el-menu-item>           
              <!-- <el-menu-item index="/userhome/withdraw">
              <i class="el-icon-bank-card"></i>提现
              </el-menu-item>
              <el-menu-item index="/userhome/invest">
              <i class="el-icon-wallet"></i>充值
              </el-menu-item> -->
              <el-menu-item index="/userhome/repay">
              <i class="el-icon-sold-out"></i>还款
              </el-menu-item>
            </el-menu>
          </el-aside>

          <el-main>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
        </el-container>
    </el-container>
    </div>
</template>



<script>
let data = () => {
  return {
    systemName: '用户界面',
    userName: 'lz'
  }
}

export default {
  data: data,
  methods: {
    bell:function(){
				this.$router.push({path:'/userhome/information'});
			}
   },
  mounted: function() {

  }
}
</script>

<style scoped="scoped">
/* 设置min-height调节最小高度来实现样式统一 */
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    min-height: 90vh;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 30px;
    min-height: 90vh;
  }

  .system-name{
    float:left;
    margin-left:35px;
    font-size:20px;
  }
  
   .bell{
    float:right;
    margin-right:70px;
  }
   
   
   .user{
     font-size:18px;
    float:right;
    margin-right:30px;
  }
 
</style>