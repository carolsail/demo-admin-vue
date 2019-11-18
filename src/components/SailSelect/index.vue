<template>
  <div class="multiselect-container">
    <multiselect
      v-model="val"
      :options="optionArr"
      :selected="selected"
      :multiple="multiple"
      :placeholder="placeholder"
      label="option"
      track-by="option"
      :hide-selected="isSelectedHide"
      :loading="isLoading"
      :options-limit="300"
      @search-change="asyncFind"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  props: {
    selected: {
      type: [Array, Object],
      default: undefined
    },
    options: {
      type: Array,
      default: () => ([])
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Array, String],
      default: undefined
    },
    placeholder: {
      type: String,
      default: 'Select Option'
    },
    api: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      val: this.selected,
      optionArr: this.options,
      isLoading: false,
      isSelectedHide: false,
      clickSelect: false
    }
  },
  watch: {
    val(data) {
      this.clickSelect = true
      let v
      if (data) {
        v = this.multiple ? data : data.value
      }
      this.$emit('input', v)
      this.$emit('handleFilter')
    },
    value(data) {
      if (!data && !this.clickSelect) {
        this.val = this.selected
        if (this.multiple) {
          this.$emit('input', this.selected)
        } else {
          this.$emit('input', this.selected.value)
        }
      }
      this.clickSelect = false
    }
  },
  mounted() {
    this.$emit('input', this.selected.value)
    this.$emit('handleFilter')
    if (this.api) {
      this.isSelectedHide = true
    }
  },
  methods: {
    asyncFind(query) {
      if (this.api) {
        this.isLoading = true
        // 模拟异步
        setTimeout(() => {
          this.optionArr = [
            { option: 'test', value: '2' }
          ]
          this.isLoading = false
        }, 2000)
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.multiselect-container {
  display: inline-block;
  height: 40px;
  vertical-align: top;
}
</style>
