<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <!-- 顶栏 -->
      <el-header >
        <span  class="system-name">{{systemName}}</span>
        <span class="adminname" >你好：{{adminName}}管理员</span>
      </el-header>
        
        <!-- 需要将侧栏和主页面设置当一个容器里面 -->
        <el-container>
          <!-- 侧栏 -->
          <el-aside width="200px">
            <el-menu :default-active="$route.path" router unique-opened >
              <el-menu-item index="/adminhome/users">
              <i class="el-icon-s-custom"></i>用户
              </el-menu-item>
               <el-menu-item index="/adminhome/produce">
              <i class="el-icon-s-order"></i>产品
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
    systemName: '管理员界面',
    adminName: 'lz'
  }
}

export default {
  data: data,
  methods: {

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
  
  .adminname{
    float:right;
    margin-right:100px;
    font-size:20px;
  }
  
</style>