<template>
    <div class="main">
        <div v-if="!$store.state.user.is_login" @click="login" class="login">登录</div>
        <div v-else @click="logout" class="logout">退出登录</div>
    </div>
    <NavBar></NavBar>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { useStore } from 'vuex';
import router from '@/router/index'

export default{
    components:{
        NavBar
    },
    setup(){
        const store=useStore();
        const login=()=>{
            router.push({name:'user_login'});
        }
        const logout=()=>{
            store.dispatch("logout");
        }
        return{
            login,
            logout,
        }
    }
}
</script>

<style scoped>
div.main{
    height: 90vh;
    overflow-y: scroll;
}
div.login{
    text-align: center;
    color: blue;
}
div.logout{
    text-align: center;
    color: red;
}
</style>
  