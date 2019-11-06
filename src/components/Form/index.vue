<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <slot :handleSubmit="handleSubmit" />
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="handleSubmit('ruleForm')">Submit</el-button>
        <el-button @click="handleReset('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'

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
      loading: false,
      lastSyncedFormData: {}
    }
  },
  mounted() {
    console.log(this.ruleForm)
    this.lastSyncedFormData = _.cloneDeep(this.ruleForm)
    console.log(this.lastSyncedFormData)
  },
  methods: {
    handleSubmit(formName = 'ruleForm') {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          try {
            const response = await this.api[this.fn](this.ruleForm)
            this.$emit('success', response['data'])
            this.loading = false
            // 重定向
            if (this.redirect) {
              this.$router.push(this.redirect)
            }
          } catch (error) {
            this.loading = false
          }
        } else {
          console.log('form submit error')
          this.loading = false
        }
      })
    },
    handleReset(formName) {
      console.log(this.lastSyncedFormData)
      //this.$refs[formName].resetFields()
    }
  }
}
</script>
