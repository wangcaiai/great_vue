<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdFormRef" label-width="100px">
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updataPwdAPI } from '@/api'
export default {
  name: 'user-pwd',
  data () {
    // 新密码与旧密码不能一致
    const samePwd = (rules, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        callback(new Error('与原来的密码一致'))
      } else {
        callback()
      }
    }
    // 确认密码与新密码一致
    const rePwd = (rules, value, callback) => {
      if (value !== this.pwdForm.new_pwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      //   检验规则
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updatePwdFn () {
    //  兜底校验
      this.$refs.pwdFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await updataPwdAPI(this.pwdForm)
          if (res.code !== 0) return this.$message.error('原密码错误')

          this.$message.success('更新密码成功！')
          this.$refs.pwdFormRef.resetFields()
          //   重置密码
          this.$store.commit('updateToken', '')
          this.$store.commit('updataUserInfo', {})
          this.$router.push('/login')
        } else {
          return false
        }
      })
    },
    resetFn () {}
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
