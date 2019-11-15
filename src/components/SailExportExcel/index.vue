<template>
  <sail-modal>
    <slot />
  </sail-modal>
</template>

<script>
import SailModal from '@/components/SailModal'
export default {
  components: { SailModal }
}
</script>
