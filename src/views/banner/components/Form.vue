<template>
  <div class="app-container">
    <Form v-bind="{ api, fn, redirect, ruleForm, rules }">
      <template #default="{ handleSubmit }">
        <el-row>
          <el-col :span="12">
            <el-form-item label="name" prop="name">
              <el-input v-model="ruleForm.name" @keyup.enter.native="handleSubmit()" />
            </el-form-item>
            <el-form-item label="url" prop="url">
              <el-input v-model="ruleForm.url" />
            </el-form-item>
            <el-form-item label="status" prop="status">
              <el-switch v-model="ruleForm.status" />
            </el-form-item>
            <el-form-item label="description" prop="description">
              <el-input v-model="ruleForm.description" type="textarea" />
            </el-form-item>
            <el-form-item label="image" prop="img">
              <Upload v-model="ruleForm.img" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </Form>
  </div>
</template>

<script>
import Form from '@/components/Form'
import Upload from '@/components/Upload'
import Api from '@/api/Banner'

const defaultForm = {
  name: '',
  status: true,
  url: '',
  description: '',
  img: []
}

export default {
  components: { Form, Upload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      api: Api,
      fn: this.isEdit ? 'edit' : 'create',
      redirect: '/banner/index',
      ruleForm: Object.assign({}, defaultForm),
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度1~100个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    async fetchData(id) {
      const response = await Api.info(id)
      this.ruleForm = Object.assign(this.ruleForm, {
        name: response.data.name,
        url: response.data.url,
        status: response.data.is_disabled ? true : false,
        description: response.data.description,
        img: response.data.img ? [response.data.img] : [],
        id: response.data.id
      })
    }
  }
}
</script>
