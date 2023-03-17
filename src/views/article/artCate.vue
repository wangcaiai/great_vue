<template>
<div>
    <el-card class="box-card">
  <div slot="header" class="clearfix header-box">
    <span>文章分类</span>
    <el-button size="mini" type="primary" @click="dialogVisible = true, this.isEdit = false, this.editID = ''">添加分类</el-button>
  </div>
    <!-- 表格区域 -->
    <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column
          label="序号"
          type="index"
          width="100"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
            <template v-slot="scope">
                <el-button type="primary" size="mini" @click="updateFn(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="removeFn(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
</el-card>
<!-- 对话框 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  @close="dialogCloseFn"
  >
  <!-- 添加的表单 -->
  <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="addForm.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="addForm.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelFn">取 消</el-button>
    <el-button type="primary" @click="confirmFn">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { getArtCateListAPI, AddArtCateAPI, UpdataCateAPI, delArtCateAPI } from '@/api'
export default {
  name: 'art-cate',
  data () {
    return {
      cateList: [],
      dialogVisible: false,
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      addForm: { // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      isEdit: false,
      editID: ''
    }
  },
  created () {
    this.getArtCateFn()
  },
  methods: {
    async getArtCateFn () {
      const res = await getArtCateListAPI()
      this.cateList = res.data.data
    },
    cancelFn () {
      this.dialogVisible = false
      this.$refs.addRef.resetFields()
    },
    confirmFn () {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          if (this.isEdit) {
            const { data: res } = await UpdataCateAPI({ id: this.editID, ...this.addForm })
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
            this.getArtCateFn()
          } else {
            const { data: res } = await AddArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
            this.getArtCateFn()
          }
          this.dialogVisible = false
          this.$refs.addRef.resetFields()
        } else {
          return false
        }
      })
    },
    dialogCloseFn () {
      this.$refs.addRef.resetFields()
    },
    updateFn (obj) {
      this.isEdit = true
      this.editID = obj.id
      this.dialogVisible = true
      this.$nextTick(() => {
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    async removeFn (obj) {
      const { data: res } = await delArtCateAPI(obj.id)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getArtCateFn()
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
