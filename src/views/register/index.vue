<template>
  <div class="reg-contation">
    <div class="reg-box">
      <div class="reg-title"></div>
      <!-- 注册的表单域 -->
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="regsisterFn" class="btn-reg">注册</el-button>
          <el-link type="info" >去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-register',
  data () {
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    regsisterFn () {
    }
  }
}
</script>

<style lang="less" scoped>
.reg-contation {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 355px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .reg-title {
      height: 60px;
      background: url("../../assets/images/login_title.png") no-repeat center;
    }
    .btn-reg {
      width: 100%;
    }
  }
}
</style>
