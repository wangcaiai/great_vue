<template>
  <div class="reg-contation">
    <div class="reg-box">
      <div class="reg-title"></div>
      <!-- 注册的表单域 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword" placeholder="请再次输入密码" type="password"></el-input>
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
import { regsisterAPI } from '@/api'
export default {
  name: 'my-register',
  data () {
    const samepwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        // 如果验证失败则调用回调函数，指定一个Error对象
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}/, message: '用户名必须是1-10的大小字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码是6-15位非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: samepwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    regsisterFn () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 通过校验
          console.log(this.form)
          // 调用注册接口
          const { data: res } = await regsisterAPI(this.form)
          console.log(res)
          // 注册失败提示用户
          if (res.code !== 0) return this.$message.error(res.message)
          // 注册成功
          this.$message.success(res.message)
          // 跳转登录
          this.$router.push('/login')
        } else {
          return false
        }
      })
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
