<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title-box"></div>
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
      <el-form-item prop="username" class="login-form">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="login-form">
        <el-input v-model="loginForm.password" placeholder='请输入密码' type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginFn" class="login-btn">登录</el-button>
        <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'my-login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),
    loginFn () {
      this.$refs.loginRef.validate(async valid => {
        if (valid) {
          // 通过校验
          const { data: res } = await loginAPI(this.loginForm)
          if (res.code !== 0) return this.$message.error(res.message)
          else {
            this.$message.success(res.message)
            this.updateToken(res.token)
            this.$router.push('/')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background: url('@/assets/images/login_bg.jpg') center;
  background-size: cover;

  .login-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0 30px;
    margin: 0 30px;
    box-sizing: border-box;

    .title-box {
      background: url('@/assets/images/login_title.png') center no-repeat;
      height: 60px;
    }
    .login-btn {
      width: 100%;
    }
    .login-form {
      padding: 12px 0;
    }
  }
}
</style>
