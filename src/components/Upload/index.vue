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
            <a :href="file | prefixImage" target="_blank">
              <el-image :src="file | prefixImage" :fit="'fill'" />
            </a>
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
      default: false
    },
    limitType: {
      type: Array,
      default: () => { return ['image/jpeg', 'image/png'] }
    },
    limitSize: {
      type: Number,
      default: 5
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
      if (this.multiple) {
        const arr = this.value
        arr.push(response.val)
        this.emitInput(arr)
      } else {
        const arr = [response.val]
        this.emitInput(arr)
      }
    },
    handleError(err) {
      console.log(err)
    },
    handleBeforeUpload(file) {
      const isTypeLimit = this.limitType.indexOf(file.type) >= 0
      const isSizeLimit = file.size / 1024 / 1024 < this.limitSize
      if (!isTypeLimit) {
        this.$message.error('上传文件格式有误!')
      }
      if (!isSizeLimit) {
        this.$message.error(`上传文件大小不能超过 ${this.limitSize}MB!`)
      }
      return isTypeLimit && isSizeLimit
    },
    handleRemove(key) {
      const arr = this.value
      arr.splice(key, 1)
      this.emitInput(arr)
    }
  }
}
</script>

<style scoped>
  .file-preview ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .file-preview ul li {
    height: 100px;
    margin: 3px 0;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding: 5px;
  }

  .file-preview ul li .el-image {
    height: 90px;
    width: 90px;
  }

  .file-preview ul li .el-icon-delete {
    position: absolute;
    right: 0;
    margin: 5px;
    font-size: 20px;
    cursor: pointer;
  }
</style>
