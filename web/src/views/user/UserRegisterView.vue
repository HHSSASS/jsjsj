<template>
    <div class="card">
        <div class="card-body">
            <form @submit.prevent="register" style="margin-top: 5px;">
                <div class="mb-3">
                    <label for="username" class="form-label">用户名</label>
                    <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                </div>
                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">确认密码</label>
                    <input v-model="confirmPassword" type="password" class="form-control" id="confirmPassword" placeholder="请再次输入密码">
                </div>
                <div class="error-message">{{message}}</div>
                <div @click="login" class="login">已有账号？立即登录！</div>
                <button type="submit" class="btn btn-primary">注册</button>
            </form>
        </div>
    </div>
    <NavBar></NavBar>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { ref } from "vue";
import router from '@/router/index'
import $ from 'jquery'

export default{
    components:{
        NavBar
    },
    setup(){
        let username=ref('');
        let password=ref('');
        let confirmPassword=ref('');
        let message=ref('');
        const register=()=>{
            $.ajax({
                url:"http://8.130.144.38:8080/user/SignUp",
                type:"post",
                data:{
                    username:username.value,
                    password:password.value,
                    confirmPassword:confirmPassword.value,
                },
                success(resp){
                    console.log(resp)
                    if(resp.code===10000){
                        router.push({name:"user_login"});
                    }
                    else{
                        message.value="用户名或密码错误";
                    }
                },
            })
        }
        const login=()=>{
            router.push({name:'user_login'});
        }
        return{
            username,
            password,
            confirmPassword,
            message,
            register,
            login,
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
div.login{
    color: rgb(0, 119, 255) ;
}
</style>
