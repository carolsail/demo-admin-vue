<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="name" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="url" prop="url">
            <el-input v-model="ruleForm.url" />
          </el-form-item>
          <el-form-item label="status" prop="status">
            <el-switch v-model="ruleForm.status" />
          </el-form-item>
          <el-form-item label="description" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item label="image">
            <Upload v-model="ruleForm.img" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
export default {
  components: { Upload },
  data() {
    return {
      ruleForm: {
        name: '',
        url: '',
        status: true,
        desc: '',
        img: ['/uploads/20190531/5d8551d84e7f099ca326c6796a509bf6.jpg', '/uploads/20190507/c85e9e64165831137494501dccc07f32.jpg']
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度3~5个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit')
        } else {
          console.log('error')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
