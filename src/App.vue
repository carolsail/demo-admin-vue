<template>
  <div id="app">
    <router-view />
    <back-to-top :visibility-height="300" :back-position="50" transition-name="fade" />
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'

export default {
  name: 'App',
  components: { BackToTop }
}
</script>
