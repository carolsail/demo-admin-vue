<template>
  <Form v-bind="{ api, fn, ruleForm, rules }" @success="handleSubmitSuccess">
    <template #default="{ handleSubmit }">
      <el-form-item label="Name" prop="name">
        <el-input v-model.trim="ruleForm.name" @keyup.enter.native="handleSubmit()" />
      </el-form-item>
      <el-form-item label="Avatar" prop="avatar">
        <Upload v-model="ruleForm.avatar" />
      </el-form-item>
    </template>
  </Form>
</template>

<script>
import Form from '@/components/Form'
import Upload from '@/components/Upload'
import Api from '@/api/User'

export default {
  components: { Form, Upload },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
          avatar: ''
        }
      }
    }
  },
  data() {
    return {
      api: Api,
      fn: 'edit',
      redirect: '/profile/index',
      ruleForm: {
        id: this.user.id,
        name: this.user.name,
        avatar: this.user.avatar ? [this.user.avatar] : []
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度1~100个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSubmitSuccess(data) {
      await this.$store.dispatch('user/refresh', this.loginForm)
    }
  }
}
</script>
