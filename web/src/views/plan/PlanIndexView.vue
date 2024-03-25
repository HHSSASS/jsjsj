<template>
    <div class="main">计划</div>
    <NavBar></NavBar>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default{
    components:{
        NavBar
    },
}
</script>

<style scoped>
div.main{
    height: 90vh;
    overflow-y: scroll;
}
</style>
  