<template>
  <div class="notice clear">
    <header-nav></header-nav>
    <div id="noticeCont">
      <router-view></router-view>
      <notice-slider></notice-slider>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import NoticeSlider from "./noticeSlider.vue"
  import FooterNav from "../footer.vue";
	import HeaderNav from "../header.vue";
  export default {
    name: 'notice',
    components:{
      NoticeSlider,
      HeaderNav,
			FooterNav,
    }
  }
</script>
<style scoped lang="scss">
  #noticeCont{
    width: 1200px;
		margin: 150px auto;
		min-height: 345px;
  }
</style>
