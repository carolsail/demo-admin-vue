<template>
  <sail-form v-bind="{ api, fn, rules, initFormDataAfterSubmit }" :rule-form.sync="ruleForm" @handleSubmit="handleSubmitSuccess">
    <template #default="{ handleSubmit }">
      <el-form-item label="Old" prop="old">
        <el-input v-model.trim="ruleForm.old" type="password" @keyup.enter.native="handleSubmit()" />
      </el-form-item>
      <el-form-item label="New" prop="new">
        <el-input v-model.trim="ruleForm.new" type="password" @keyup.enter.native="handleSubmit()" />
      </el-form-item>
      <el-form-item label="Repeat" prop="repeat">
        <el-input v-model.trim="ruleForm.repeat" type="password" @keyup.enter.native="handleSubmit()" />
      </el-form-item>
    </template>
  </sail-form>
</template>

<script>
import SailForm from '@/components/SailForm'
import Api from '@/api/User'

const defaultForm = {
  old: '',
  new: '',
  repeat: ''
}

export default {
  components: { SailForm },
  data() {
    return {
      api: Api,
      fn: 'changePassword',
      initFormDataAfterSubmit: false,
      ruleForm: Object.assign({}, defaultForm),
      rules: {
        old: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度3~15个字符', trigger: 'blur' }
        ],
        new: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度3~15个字符', trigger: 'blur' }
        ],
        repeat: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度3~15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.ruleForm = Object.assign({}, this.ruleForm)
  },
  methods: {
    handleSubmitSuccess() {
      this.ruleForm = Object.assign({}, defaultForm)
    }
  }
}
</script>
