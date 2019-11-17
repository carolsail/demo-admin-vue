<template>
  <div class="multiselect-container">
    <multiselect v-model="val" :options="options" :selected="selected" :multiple="multiple" label="option" track-by="option" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  props: {
    selected: {
      type: Object,
      default: () => ({})
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
    }
  },
  data() {
    return {
      val: this.selected,
      clickSelect: false
    }
  },
  watch: {
    val(data) {
      this.clickSelect = true
      const v = data ? data.value : undefined
      if (this.multiple) {
        
      }
      this.$emit('input', v)
      this.$emit('handleFilter')
    },
    value(data) {
      if (!data && !this.clickSelect) {
        this.val = this.selected
        this.$emit('input', this.selected.value)
      }
      this.clickSelect = false
    }
  },
  mounted() {
    this.$emit('input', this.selected.value)
    this.$emit('handleFilter')
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
