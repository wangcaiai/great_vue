<template>
<div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>文章列表</span>
  </div>
  <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
            v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <!-- 循环渲染分类的可选项 -->
              <el-option
              :label="item.cate_name"
                :value="item.id"
                v-for="item in cateList"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small"
              >筛选</el-button
            >
            <el-button type="info" size="small"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showDialogFn"
          >发表文章</el-button
        >
      </div>
       <!-- 文章表格区域 -->
       <el-table :data="artList" style="width: 100%" border stripe>
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChangeFn"
        @current-change="handleCurrentChangeFn"
        :current-page.sync="q.pagenum"
        :page-sizes="[2, 3, 5, 10]"
        :page-size.sync="q.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  fullscreen
  @close="dialogCloseFn"
  :before-close="handleClose">
  <el-form
          :model="pubForm"
          :rules="pubFormRules"
          ref="pubFormRef"
          label-width="100px"
        >
          <el-form-item label="文章标题" prop="title">
            <el-input
              v-model="pubForm.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select
              v-model="pubForm.cate_id"
              placeholder="请选择分类"
              style="width: 100%"
            >
              <!-- 循环渲染分类的可选项 -->
              <el-option
                :label="item.cate_name"
                :value="item.id"
                v-for="item in cateList"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <!-- 使用 v-model 进行双向的数据绑定 -->
            <quill-editor v-model="pubForm.content" @change="contentChangeFn"></quill-editor>
          </el-form-item>
          <el-form-item label="文章封面">
            <!-- 用来显示封面的图片 -->
            <img
              src="../../assets/images/cover.jpg"
              alt=""
              class="cover-img"
              ref="imgRef"
            />
            <br />
            <!-- 文件选择框，默认被隐藏 -->
            <input
              type="file"
              style="display: none"
              accept="image/*"
              ref="iptFileRef"
              @change="onCoverChangeFn"
            />
            <!-- 选择封面的按钮 -->
            <el-button type="text" @click="selCover">+ 选择封面</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="pubArticleFn('已发布')"
              >发布</el-button
            >
            <el-button type="info" @click="pubArticleFn('草稿')"
              >存为草稿</el-button
            >
          </el-form-item>
        </el-form>
</el-dialog>
</el-card>
</div>
</template>

<script>
import { getArtCateListAPI, pubArticleAPI, getArtListAPI } from '@/api'
import imgObj from '../../assets/images/cover.jpg'
export default {
  name: 'art-list',
  data () {
    return {
      dialogVisible: false,
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubForm: {
        // 表单的数据对象
        title: '',
        cate_id: '',
        content: '', // 文章内容
        cover_img: null, // 用户选择的封面图片（null 表示没有选择任何封面）
        state: '' // 文章的发布状态，可选值有两个：草稿、已发布
      },
      pubFormRules: {
        // 表单的验证规则对象
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '文章标题的长度为1-30个字符',
            trigger: 'blur'
          }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        cover_img: [
          { required: true, message: '请选择封面', trigger: 'blur' }
        ]
      },
      cateList: [],
      artList: [],
      total: 0
    }
  },
  created () {
    this.getArtCateListFn()
    this.getArtListFn()
  },
  methods: {
    showDialogFn () {
      this.dialogVisible = true
    },
    async getArtListFn () {
      const { data: res } = await getArtListAPI(this.q)
      this.artList = res.data
      this.total = res.total
    },
    async handleClose (done) {
      const confirmResult = await this.$confirm('此操作会将未保存的文章内容丢失，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult === 'cancel') return
      done()
    },
    async getArtCateListFn () {
      const { data: res } = await getArtCateListAPI()
      console.log(res)
      this.cateList = res.data
    },
    selCover () {
      this.$refs.iptFileRef.click()
    },
    onCoverChangeFn (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.pubForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', imgObj)
      } else {
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
    },
    pubArticleFn (str) {
      this.pubForm.state = str
      this.$refs.pubFormRef.validate(async valid => {
        if (valid) {
          const fd = new FormData()
          fd.append('title', this.pubForm.title)
          fd.append('cate_id', this.pubForm.cate_id)
          fd.append('content', this.pubForm.content)
          fd.append('cover_img', this.pubForm.cover_img)
          fd.append('state', this.pubForm.state)
          const { data: res } = await pubArticleAPI(fd)
          console.log(res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          console.log(this.pubForm)
          this.dialogVisible = false
          this.getArtListFn()
        } else {
          return false
        }
      })
    },
    contentChangeFn () {
      this.$refs.pubFormRef.validateField('content')
    },
    dialogCloseFn () {
      this.$refs.pubFormRef.resetFields()
      this.$refs.imgRef.setAttribute('src', imgObj)
    },
    handleSizeChangeFn (sizes) {
      this.q.pagesize = sizes
      this.getArtListFn()
    },
    handleCurrentChangeFn (nowpage) {
      this.q.pagenum = nowpage
      this.getArtListFn()
    }
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
::v-deep .ql-editor {
  min-height: 300px;
}

// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}

.el-pagination {
  margin-top: 15px;
}

.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
::v-deep .detail-box {
  img {
    width: 500px;
  }
}
</style>
