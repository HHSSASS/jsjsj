<template>
    <div class="card">
        <div class="card-body">
            <form @submit.prevent="login" style="margin-top: 5px;">
                <div class="mb-3">
                    <label for="username" class="form-label">用户名</label>
                    <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                </div>
                <div class="error-message">{{message}}</div>
                <div @click="register" class="register">没有账号？立即注册！</div>
                <button type="submit" class="btn btn-primary">登录</button>
            </form>
        </div>
    </div>
    <NavBar></NavBar>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { useStore } from "vuex";
import { ref } from "vue";
import router from '@/router/index'

export default{
    components:{
        NavBar
    },
    setup(){
        const store=useStore();
        let username=ref('');
        let password=ref('');
        let message=ref('');
        const login=()=>{
            message.value="";
            store.dispatch("login",{
                username:username.value,
                password:password.value,
                success(){
                    store.dispatch("getinfo",{
                        success(){
                            router.push({name:'home'});
                        },
                        error(){}
                    })
                },
                error(){
                    message.value="用户名或密码错误";
                }
             })
        }
        const register=()=>{
            router.push({name:'user_register'});
        }
        return{
            username,
            password,
            message,
            login,
            register,
        }
    }
}
</script>

<style scoped>
div.card{
    height: 90vh;
    overflow-y: scroll;
}
button{
    width:100%;
}
div.error-message{
    color:red;
}
div.register{
    color: rgb(0, 119, 255) ;
}
</style>
