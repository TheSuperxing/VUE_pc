<template>
  <div class="error">
    <router-view></router-view>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
    import FooterNav from "../footer.vue";
    export default {
        name: 'Error',
        components:{
            FooterNav,
        },
        mounted(){
            $(".copyring").remove()
        }
    }
</script>
<style scoped lang="scss">
  .error{
    width: 100%;
    min-height: 600px;
    .footer{
        height: 110px;
        position: fixed;
        left: 0;
        bottom: 0;
        .footerNav{
            
        
        }
    }
    
  }
  
</style>
