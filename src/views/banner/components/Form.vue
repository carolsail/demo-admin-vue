<template>
  <div class="app-container">
    <sail-form v-bind="{ api, fn, redirect, rules }" :rule-form.sync="ruleForm" @handleReset="handleReset()">
      <template #default="{ handleSubmit }">
        <el-row>
          <el-col :span="24">
            <el-form-item label="name" prop="name">
              <el-input v-model="ruleForm.name" @keyup.enter.native="handleSubmit()" />
            </el-form-item>
            <el-form-item label="url" prop="url">
              <el-input v-model="ruleForm.url" />
            </el-form-item>
            <el-form-item label="status" prop="is_disabled">
              <el-switch v-model="ruleForm.is_disabled" />
            </el-form-item>
            <el-form-item label="description" prop="description">
              <!-- <el-input v-model="ruleForm.description" type="textarea" /> -->
              <tinymce v-model="ruleForm.description" :height="150" />
            </el-form-item>
            <el-form-item label="image" prop="img">
              <sail-upload v-model="ruleForm.img" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </sail-form>
  </div>
</template>

<script>
/* global tinymce */
import SailForm from '@/components/SailForm'
import SailUpload from '@/components/SailUpload'
import Tinymce from '@/components/Tinymce'
import Api from '@/api/Banner'

const defaultForm = {
  name: '',
  is_disabled: true,
  url: '',
  description: '',
  img: []
}

export default {
  components: { SailForm, SailUpload, Tinymce },
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
  mounted() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      // 触发里面watch，初始化表单初始数据
      this.ruleForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    async fetchData(id) {
      const response = await Api.info(id)
      this.ruleForm = Object.assign(this.ruleForm, {
        name: response.data.name,
        url: response.data.url,
        is_disabled: !!response.data.is_disabled,
        description: response.data.description,
        img: response.data.img ? [response.data.img] : [],
        id: response.data.id
      })
    },
    handleReset() {
      tinymce.activeEditor.setContent(this.ruleForm.description)
    }
  }
}
</script>
