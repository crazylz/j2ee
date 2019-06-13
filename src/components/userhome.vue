<template>
<section>
  <el-container class="container">
    <!--左边-->
    <el-aside style="width:200px;">
      <el-container>
        <el-header>
          <span class="system-name">{{systemName}}</span>
        </el-header>
        <el-main>
          <el-menu :default-active="$route.path" router unique-opened style="background-color:rgb(35, 31, 56) ,color:white">
              <el-menu-item index="/userhome/persondata">
              <i class="el-icon-message"></i>个人资料
              </el-menu-item>
              <el-submenu index="1">
                  <template slot="title"><i class="el-icon-menu"></i>借款</template>
                  <el-menu-item-group>
                  <el-menu-item index="/userhome/existingloans">已有借款</el-menu-item>
                  <el-menu-item index="/userhome/newloans">新建借款</el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                  <template slot="title"><i class="el-icon-setting"></i>购买产品</template>
                  <el-menu-item-group>
                  <el-menu-item index="/userhome/existingproducts">已购产品</el-menu-item>
                  <el-menu-item index="/userhome/newproducts">新建购买</el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/userhome/withdraw">
              <i class="el-icon-message"></i>提现
              </el-menu-item>
              <el-menu-item index="/userhome/invest">
              <i class="el-icon-message"></i>充值
              </el-menu-item>
              <el-menu-item index="/userhome/repay">
              <i class="el-icon-message"></i>还款
              </el-menu-item>
              </el-menu>
        </el-main>
      </el-container>
    </el-aside>

    <!--内容-->
    <el-container>
      <!--页眉-->
      <el-header class="header">
        <el-row>
          <el-col :span="18" class="header-title">
            <span v-if="collapsed" class="system-name">{{systemName}}</span>
            <span >
              <i class="fa fa-align-justify"></i>
            </span>
          </el-col>
          <el-col :span="6"><span class="el-dropdown-link userinfo-inner">你好：{{userName}}用户</span></el-col>
        </el-row>
      </el-header>

      <!--中间-->
      <el-main class="main">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</section>
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

  },
  mounted: function() {

  }
}
</script>

<style scoped="scoped"
  lang="scss">
$width: 100%;
$height: 100%;
$background-color: #0b0a3e;
$header-color: #fff;
$header-height: 60px;

.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .el-aside {
        .el-header {
            line-height: $header-height;
            background-color: $background-color;
            color: $header-color;
            text-align: center;
        }
        .el-container {
            height: $height;
            .el-main {
                padding: 0;
            }
        }
    }

    .main {
        width: $width;
        height: $height;
    }

    /* .menu-button {
        width: 14px;
        cursor: pointer;
    } */

    .userinfo-inner {
        cursor: pointer;
    }

    .el-menu {
        height: $height;
    }

    .header {
        background-color: $background-color;
        color: $header-color;
        text-align: center;
        line-height: $header-height;
        padding: 0;

        .header-title {
            text-align: left;
            span {
                padding: 0 20px;
            }
        }
    }

    .system-name {
        font-size: large;
        font-weight: bold;
    }
}
</style>