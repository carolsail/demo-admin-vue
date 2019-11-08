<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" @submit.native.prevent>
    <slot :handleSubmit="handleSubmit" />
    <el-form-item>
      <el-button :loading="loading" type="primary" @click="handleSubmit('ruleForm')">Submit</el-button>
      <el-button @click="handleReset('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import _ from 'lodash'
import { Message } from 'element-ui'
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
    },
    initFormDataAfterSubmit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      initFormData: undefined // 表单初始化数据
    }
  },
  // ps: 外部初始化数据放在mounted
  watch: {
    ruleForm: {
      deep: true,
      handler(n, o) {
        if (!this.initFormData) {
          this.initFormData = _.cloneDeep(n)
        }
      }
    }
  },
  methods: {
    handleSubmit(formName = 'ruleForm') {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          try {
            // 数据有变化的时候才提交服务器
            if (!_.isEqual(this.ruleForm, this.initFormData)) {
              this.loading = true
              const response = await this.api[this.fn](this.ruleForm)

              // 提交成功，重置initFormData, 目前只简单让数据变更为提交那刻的数据
              if (this.initFormDataAfterSubmit) {
                this.initFormData = _.cloneDeep(this.ruleForm)
              }
              this.$emit('handleSubmit', response['data'])
              this.loading = false
              if (!this.redirect) {
                // 提示操作成功信息
                Message({
                  message: response.msg ? response.msg : 'success',
                  type: 'success',
                  duration: 5 * 1000
                })
              }
            }
            // 重定向
            if (this.redirect) {
              this.$router.push(this.redirect)
            }
          } catch (error) {
            this.loading = false
          }
        } else {
          this.loading = false
        }
      })
    },
    handleReset(formName) {
      this.initFormData ? this.$emit('update:ruleForm', _.cloneDeep(this.initFormData)) : this.$refs[formName].resetFields()
      this.$emit('handleReset')
    }
  }
}
</script>
