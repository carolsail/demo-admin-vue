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
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'daterange' // date datetime daterange datetimerange
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    value: {
      type: [Array, String],
      default: undefined
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
      }
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
    },
    val: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.$emit('handleFilter')
      }
    }
  }
}
</script>
