<template>
    <div class="row nav">
        <router-link class="col-2 content" :to="{name:'community_index'}">
            <div class="iconfont icon-shequ"></div>
            <div>社区</div>
        </router-link>
        <router-link class="col-2 content" :to="{name:'chat_index'}">
            <div class="iconfont icon-xiaoxi"></div>
            <div>群聊</div>
        </router-link>
        <router-link class="col-4 content" :to="{name:'add_post_index'}">
            <div class="iconfont icon-jiashu" style="font-size: 40px;"></div>
        </router-link>
        <router-link class="col-2 content" :to="{name:'plan_index'}">
            <div class="iconfont icon-jihua"></div>
            <div>计划</div>
        </router-link>
        <router-link class="col-2 content" :to="{name:'user_index'}">
            <div class="iconfont icon-wode"></div>
            <div>我的</div>
        </router-link>
    </div>
</template>

<script>
import $ from 'jquery'
import { ref,reactive } from 'vue'
import { useStore } from 'vuex';

export default{
    setup(){
        const store=useStore();
        let input=ref(null);
        let images=ref([]);
        const post=reactive({
            imagefile:[],
            title:"",
            content:"",
            type:"",
            subject:"",
        });
        const add_post=()=>{
            let formData=new FormData();
            post.imagefile.forEach(image => {
                formData.append("images[]",image)
            });
            formData.append("title",post.title)
            formData.append("content",post.content)
            formData.append("type",post.type)
            formData.append("subject",post.subject)
            $.ajax({
                url:"http://8.130.144.38:8080/post/create",
                type:"post",
                headers:{
                    Authorization:store.state.user.token,
                },
                data:formData,
                contentType:false,
                processData: false,
                success(resp){
                    console.log(resp);
                },
            })
        }
        const setImage=(e)=>{
            post.imagefile.push(e.target.files[0]);
            images.value.push(URL.createObjectURL(e.target.files[0]))
        }
        const showFileChooser=()=>{
            input.value.click();
        }
        return{
            input,
            images,
            post,
            add_post,
            setImage,
            showFileChooser,
        }
    }
}
</script>

<style scoped>
div.row.nav{
    width: 100%;
    height: 10vh;
    box-shadow: 0 0 10px #9b9393;
    background-color: white;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    text-decoration: none;
}
.iconfont{
    font-size: 25px;
}
</style>
  