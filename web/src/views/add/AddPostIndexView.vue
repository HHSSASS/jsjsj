<template>
    <div class="main">
        <div>
            <div @click="add_post">发布</div>
        </div>
        <div>
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
    <NavBar></NavBar>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import $ from 'jquery'
import { ref,reactive } from 'vue'
import { useStore } from 'vuex';

export default{
    components:{
        NavBar
    },
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
div.main{
    height: 90vh;
    overflow-y: scroll;
}
.mb-3.img{
    display: flex;
    width:100%;
    overflow-x:scroll;
}
</style>
  