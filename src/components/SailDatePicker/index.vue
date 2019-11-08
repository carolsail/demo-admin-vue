<template>
  <el-date-picker
    v-model="val"
    :type="type"
    :value-format="format"
    align="left"
    unlink-panels
    range-separator="to"
    start-placeholder="Start"
    end-placeholder="End"
    :picker-options="pickerOptions"
    size="small"
    @change="handlePicker"
  />
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    type: {
      type: String,
      default: 'daterange' // date datetime daterange datetimerange
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  data() {
    return {
      daterangeOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      val: undefined
    }
  },
  computed: {
    pickerOptions() {
      let options = {}
      switch (this.type) {
        case 'daterange':
          options = this.daterangeOptions
          break
      }
      return options
    }
  },
  methods: {
    handlePicker(value) {
      let data = _.cloneDeep(value)
      if (Array.isArray(data)) {
        if (data.length === 2 && this.type === 'daterange') {
          data[0] += ' 00:00:00'
          data[1] += ' 23:59:59'
        }
        data = data.join(' - ')
      }
      this.$emit('input', data)
      this.$emit('handlePicker')
    },
    reset() {
      this.val = undefined
    }
  }
}
</script>
