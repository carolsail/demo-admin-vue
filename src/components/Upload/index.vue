<template>
  <div>
    <el-upload
      :data="dataObj"
      :multiple="multiple"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :action="action"
    >
      <slot name="action">
        <el-button size="small" type="info">Choose File</el-button>
      </slot>
    </el-upload>

    <div v-show="files.length>=1" class="file-preview">
      <slot :files="files" name="preview">
        <ul>
          <li v-for="(file, k) in files" :key="k">
            <el-image :src="file" :fit="'fill'" style="width:100px;height:100px;" />
            <i class="el-icon-delete" @click="handleRemove(k)" />
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataObj: {
      type: Object,
      default: () => ({})
    },
    multiple: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => { [] }
    }
  },
  data() {
    return {
      action: process.env.VUE_APP_BASE_API + '/ajax/upload'
    }
  },
  computed: {
    files() {
      return this.value
    }
  },
  methods: {
    emitInput(v) {
      this.$emit('input', v)
    },
    handleSuccess(response) {
      const arr = this.value
      arr.push(response.val)
      this.emitInput(arr)
    },
    handleError(err) {
      console.log(err)
    },
    handleBeforeUpload() {
      console.log('文件格式大小限制')
    },
    handleRemove(key) {
      const arr = this.value
      arr.splice(key, 1)
      this.emitInput(arr)
    }
  }
}
</script>
