<template>
    <div class="main">
        <div v-if="$store.state.user.is_log" class="user">
            <div class="image">
                <img :src="$store.state.user.image" alt="">
            </div>
            <div class="username">{{ $store.state.user.username }}</div>
            <button class="btn btn-primary">打卡</button>
        </div>
        <div v-else @click="login" class="user">
            <div class="image">
                <img src="@/assets/images/user.png" alt="">
            </div>
            <div class="username">未登录</div>
        </div>
        <div class="row" style="text-align: center;">
            <div class="col-4">关注</div>
            <div class="col-4">粉丝</div>
            <div class="col-4">收藏</div>
        </div>
    </div>
    <NavBar></NavBar>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import router from '@/router/index'

export default{
    components:{
        NavBar
    },
    setup(){
        const login=()=>{
            router.push({name:"user_login"});
        }
        return{
            login,
        }
    }
}
</script>

<style scoped>
div.main{
    height: 90vh;
    overflow-y: scroll;
}
div.user{
    display: flex;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}
div.image>img{
    width: 80px;
    border-radius: 50%;
}
div.username{
    margin-left: 10px;
    display: flex;
    align-items: center;
}
</style>
  