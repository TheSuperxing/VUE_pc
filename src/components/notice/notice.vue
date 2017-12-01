<template>
  <div class="notice clear">
    <router-view></router-view>
    <notice-slider></notice-slider>
  </div>
</template>

<script>
  import NoticeSlider from "./noticeSlider.vue"
  export default {
    name: 'notice',
    components:{
      NoticeSlider
    }
  }
</script>
<style scoped lang="scss">

</style>
