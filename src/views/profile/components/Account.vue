<template>
  <sail-form v-bind="{ api, fn, rules }" :rule-form.sync="ruleForm" @handleSubmit="handleSubmitSuccess">
    <template #default="{ handleSubmit }">
      <el-form-item label="Name" prop="name">
        <el-input v-model.trim="ruleForm.name" @keyup.enter.native="handleSubmit()" />
      </el-form-item>
      <el-form-item label="Avatar" prop="avatar">
        <sail-upload v-model="ruleForm.avatar" />
      </el-form-item>
    </template>
  </sail-form>
</template>

<script>
import SailForm from '@/components/SailForm'
import SailUpload from '@/components/SailUpload'
import Api from '@/api/User'

const defaultForm = {
  id: '',
  name: '',
  avatar: []
}

export default {
  components: { SailForm, SailUpload },
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
    this.ruleForm = Object.assign(this.ruleForm, {
      id: this.user.id,
      name: this.user.name,
      avatar: this.user.avatar ? [this.user.avatar] : []
    })
  },
  methods: {
    async handleSubmitSuccess(data) {
      await this.$store.dispatch('user/refresh', this.loginForm)
    }
  }
}
</script>
