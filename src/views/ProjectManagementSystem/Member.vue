<template>
  <top/>
  <div class="container0">
    <Sidebar3/>
    <div class="container1"></div>
  </div>
</template>

<script>
import top from "../../components/topofstudent.vue"
import Sidebar3 from "../../components/Sidebar3.vue";
export default{
    components:{
        top,
        Sidebar3
    }
}
</script>

<style scoped>
  .container0{
    width: 100%;
    display: flex;
  }
  .container1{
    
  }
</style>