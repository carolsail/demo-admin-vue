<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <slot :ruleForm="ruleForm" />
      <el-form-item>
        <el-button type="primary" @click="handleSubmit('ruleForm')">立即创建</el-button>
        <el-button @click="handleReset('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    ruleForm: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    api: {
      type: Object,
      default: undefined
    },
    fn: {
      type: String,
      default: 'create'
    },
    redirect: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          await this.api[this.fn](this.ruleForm)
          if (this.redirect) {
            this.$router.push(this.redirect)
          }
        } else {
          console.log('error')
        }
      })
    },
    handleReset(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
