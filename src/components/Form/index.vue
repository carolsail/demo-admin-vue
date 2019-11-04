<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <slot :ruleForm="ruleForm" />
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="handleSubmit('ruleForm')">立即创建</el-button>
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
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          await this.api[this.fn](this.ruleForm)
          if (this.redirect) {
            this.$router.push(this.redirect)
            this.loading = false
          }
        } else {
          console.log('form submit error')
          this.loading = false
        }
      })
    },
    handleReset(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
