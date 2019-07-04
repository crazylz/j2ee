<template>
  <div>
    <!-- 需要将元素设置当一个容器里面 -->
    <el-container class="container">
      <!-- 顶栏 -->
      <el-header >
        <span  class="system-name">{{systemName}}</span>
        <span class="bell" @click="bell()"><big><i class="el-icon-message-solid"></i></big></span>
        <div class="guarantee">
          <el-dropdown>
            <span style="color: white">
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
          <el-aside width="200px">
            <el-menu :default-active="$route.path" router unique-opened >
              <el-menu-item index="/reviewerhome/review" style="text-align:left" class="item">
              <i class="el-icon-s-custom"></i>审核
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
    systemName: '审核员界面',
    adminName: '审核员'
  }
}

export default {
  data: data,
  methods: {
    bell:function(){
        this.$router.push({path:'/reviewerhome/reviewerinformation'});
    },
  },
  mounted: function() {
    
  }
}
</script>

<style scoped="scoped">
/* 设置min-height调节最小高度来实现样式统一 */
.el-header{
    background-color: #1b2226;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #272a2d;
    color: #333;
    /* background-image: url('../assets/back.jpeg'); */
    text-align: center;
    line-height: 200px;
    min-height: 90vh;
  }
  
  .el-main {
    background-color:  #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 30px;
    min-height: 90vh;
  }

  .item {
    background-color: #272a2d;
    color: white;
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