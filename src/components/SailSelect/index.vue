<template>
  <div class="multiselect-container">
    <multiselect v-model="selected" :options="options" :selected="selected" :multiple="multiple" label="option" track-by="option" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  props: {
    ms_selected: {
      type: Object,
      default: () => ({})
    },
    ms_options: {
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
      selected: this.ms_selected,
      options: this.ms_options
    }
  },
  watch: {
    selected(data){
      if (data) {
        this.$emit('input', data.value)
      } else {
        this.$emit('input', undefined)
      }
      this.$emit('handleFilter')
    },
    value(data) {
      if (!data) {
        this.$emit('input', this.selected.value)
      }
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
