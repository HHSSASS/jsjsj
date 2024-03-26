<template>
    <div class="main">
        <div v-if="$store.state.user.is_login" class="user">
            <div v-if="$store.state.user.image===''" class="image">
                <img src="@/assets/images/user.png" alt="">
            </div>
            <div v-else class="image">
                <img :src="$store.state.user.image" alt="">
            </div>
            <div class="username">{{ $store.state.user.username }}</div>
            <div v-if="$store.state.user.is_check" class="check">已连续打卡{{ $store.state.user.check_day+1 }}天</div>
            <button @click="check" v-else class="btn btn-primary text-nowrap">学习打卡</button>
            <div @click="setting" class="iconfont icon-shezhi"></div>
        </div>
        <div v-else class="user">
            <div @click="login" class="image">
                <img src="@/assets/images/user.png" alt="">
            </div>
            <div @click="login" class="username">未登录</div>
            <div @click="setting" class="iconfont icon-shezhi"></div>
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
import $ from 'jquery'
import { useStore } from 'vuex'

export default{
    components:{
        NavBar
    },
    setup(){
        const store=useStore();
        const login=()=>{
            router.push({name:"user_login"});
        }
        const setting=()=>{
            router.push({name:"user_setting"});
        }
        const check=()=>{
            $.ajax({
                url:"http://8.130.144.38:8080/user/check",
                type:"post",
                headers:{
                    Authorization:store.state.user.token,
                },
                success(resp){
                    console.log(resp);
                    if(resp.code==10000){
                        store.commit("updateCheck",true);
                    }
                },
            })
        }
        return{
            login,
            setting,
            check,
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
div.check{
    margin-left: 120px;
    display: flex;
    align-items: center;
}
.btn{
    margin-left: 140px;
    margin-top: 15px;
    height: 50px;
}
div.iconfont{
    margin-left: auto;
    margin-right: 10px;
    font-size: 20px;
}
</style>
  