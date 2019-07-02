<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <!-- 顶栏 -->
      <el-header >
        <span  class="system-name">{{systemName}}</span>
        <span class="bell" @click="bell()"><big><i class="el-icon-message-solid"></i></big></span>
        <div class="admin">
          <el-dropdown>
            <span>
              <big><i class="el-icon-user-solid"></i></big>
              {{adminName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <a href="#/login">
              <el-dropdown-item icon="el-icon-unlock">登出</el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
        
        <!-- 需要将侧栏和主页面设置当一个容器里面 -->
        <el-container>
          <!-- 侧栏 -->
          <el-aside width="200px">
            <el-menu :default-active="$route.path" router unique-opened >
              <el-menu-item index="/guaranteehome/guarantee" style="text-align:left">
              <i class="el-icon-s-custom"></i>担保请求
              </el-menu-item>

               <el-menu-item index="/guaranteehome/freeze" style="text-align:left">
              <i class="el-icon-s-order"></i>处理逾期记录
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
    systemName: '担保人界面',
    adminName: '担保人'
  }
}

export default {
  data: data,
  methods: {
    bell:function(){
        this.$router.push({path:'/guaranteehome/guaranteeinformation'});
    },
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
    margin-left:70px;
    font-size:20px;
  }
  
  .bell{
    float:right;
    margin-right:70px;
  } 
   
   
  .guarantee{
     font-size:18px;
    float:right;
    margin-right:30px;
  }
</style>