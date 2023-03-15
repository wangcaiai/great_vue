<template>
  <el-container class="mian-container">
    <!-- 头部 -->
    <el-header>
        <!-- 左侧logo -->
        <img src="../../assets/images/logo.png" alt="">
        <!-- 右侧菜单 -->
        <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
        >
        <el-submenu index="1">
      <template slot="title">
        <!-- 头像 -->
        <img src="../../assets/images/logo.png" alt="" class="avatar">
        <span>个人中心</span>
      </template>
      <el-menu-item index="1-1"><i class="el-icon-s-operation"></i> 基本资料</el-menu-item>
      <el-menu-item index="1-2"><i class="el-icon-camera"></i> 更换头像</el-menu-item>
      <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
    </el-submenu>
    <el-menu-item index="2" style="overflow: hidden;" @click="logoutFn"><i class="el-icon-switch-button">退出</i> </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏用户信息区域 -->
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic">
          <img src="../../assets/images/logo.png" alt="" v-else>
          <span>欢迎{{ nickname || username }}}</span>
        </div>
        <!-- 侧边栏导航-菜单 -->
        <el-menu
      :unique-opened= true
      default-active="/home"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      >
      <template v-for="item in menus">
         <!-- 首页按钮栏 -->
      <el-menu-item v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
        <i :class="item.icon"></i>
        <span>{{ item.title }}}</span>
      </el-menu-item>
      <!-- 文章管理栏 -->
      <el-submenu v-else :index="item.indexPath" :key="item.indexPath">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item v-for="obj, index in item.children" :index="obj.indexPath" :key="index">
        <i :class="obj.icon"></i>
        <span>{{ obj.title }}</span>
      </el-menu-item>
      </el-submenu>
      </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 主体区域 -->
        <el-main>
          main.vue后台
        </el-main>
        <!-- 底部 -->
        <el-footer>
          @wangcai
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenusListAPI } from '@/api'
export default {
  name: 'my-layout',
  data () {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  methods: {
    logoutFn () {
      this.$confirm('您确认退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空token
        this.$store.commit('updataToken', '')
        // 清空用户信息
        this.$store.commit('updataUserInfo', {})
        // 跳转登录页
        this.$router.push('/login')
      }).catch((err) => err)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    async getMenusListFn () {
      const res = await getMenusListAPI()
      console.log(res)
      this.menus = res.data.data
    }
  },
  created () {
    this.getMenusListFn()
  }
}
</script>

<style lang="less" scoped>

.mian-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }

  .el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
}
</style>
