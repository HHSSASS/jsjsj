<template>
    <slot></slot>
    <div class="row nav">
        <router-link class="col-2 content" :to="{name:'community_index'}">
            <div class="iconfont icon-shequ"></div>
            <div>社区</div>
        </router-link>
        <router-link class="col-2 content" :to="{name:'chat_index'}">
            <div class="iconfont icon-xiaoxi"></div>
            <div>群聊</div>
        </router-link>
        <div class="col-4 content" data-bs-toggle="offcanvas" data-bs-target="#add" aria-controls="offcanvasExample">
            <div class="iconfont icon-jiashu" style="font-size: 40px;"></div>
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="add" aria-labelledby="offcanvasExampleLabel" style="width: 100%;">
            <div class="offcanvas-header">
                <div @click="add_post">发布</div>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="mb-3 img">
                    <div v-for="(image,index) in images" :key="index" style="margin-right: 10px;">
                        <img :src="image" alt="" max-width="100px" height="100px">
                    </div>
                    <div @click="showFileChooser">
                        <img src="https://app6418.acapp.acwing.com.cn/images/user.png" alt="" max-width="100px" height="100px">
                    </div>
                    <input ref="input" type="file" accept="image/*" @change="setImage" style="display: none;">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">标题</label>
                    <textarea v-model="post.title" class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="请输入标题"></textarea>
                    <div>{{ post.title.length }}/100</div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">内容</label>
                    <textarea v-model="post.content" class="form-control" id="exampleFormControlTextarea1" rows="10" placeholder="请输入内容"></textarea>
                    <div>{{ post.content.length }}/1000</div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">类型</label>
                    <textarea v-model="post.type" class="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="请输入类型"></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">学科</label>
                    <textarea v-model="post.subject" class="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="请输入学科"></textarea>
                </div>
            </div>
        </div>
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
//import { useStore } from 'vuex';

export default{
    setup(){
        //const store=useStore();
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
                    //Authorization:"Bearer "+store.state.user.token,
                    Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MTE0NDI0NjksImlzcyI6Imp3dCJ9.B1C3B_SBcq4kzpOah189o1lrc_I7IRlvrlfhfF7QSZg",
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
.mb-3.img{
    display: flex;
    width:100%;
    overflow-x:scroll;
}
</style>
  