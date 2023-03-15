<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img class="the_img" v-if="!this.avatar" src="../../assets/images/avatar.jpg" alt="" />
      <img class="the_img" v-else :src="this.avatar" alt="">

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''" @click="updataAvatar">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updataUserAvatarApi } from '@/api'
export default {
  name: 'user-avatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    chooseImg () {
      this.$refs.iptRef.click()
    },
    onFileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        // kl
      } else {
        console.log(files[0])
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = (e) => {
          this.avatar = e.target.result
        }
      }
    },
    async updataAvatar () {
      const { data: res } = await updataUserAvatarApi(this.avatar)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.$store.dispatch('getUserInfoActios')
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img{
    width: 350px;
    height: 350px;
}
</style>
