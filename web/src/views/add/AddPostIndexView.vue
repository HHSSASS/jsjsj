<template>
    <div class="main">
        <div>
            <div class="add" @click="add_post">发布</div>
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
                <textarea v-model="post.content" class="form-control" id="exampleFormControlTextarea1" rows="8" placeholder="请输入内容"></textarea>
                <div>{{ post.content.length }}/1000</div>
            </div>
            <div class="mb-3 row">
                <div class="col-5">
                    <label for="exampleFormControlTextarea1" class="form-label">类型</label>
                    <select v-model="post.type" class="form-select" aria-label="Default select example">
                        <option v-for="(type,index) in types" :key="index" :value="type">{{ type }}</option>
                    </select>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                    <label for="exampleFormControlTextarea1" class="form-label">学科</label>
                    <select v-model="post.subject" class="form-select" aria-label="Default select example">
                        <option v-for="(subject,index) in subjects" :key="index" :value="subject">{{ subject }}</option>
                    </select>
                </div>
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
import router from '@/router/index'

export default{
    components:{
        NavBar
    },
    setup(){
        const store=useStore();
        const types=["资讯","知识","问答","分享"]
        const subjects=["政治","数学","外语","计算机","经济","法律","地质","机械"]
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
                    router.push({name:"home"});
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
            types,
            subjects,
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
    margin-left: 10px;
    margin-right: 10px;
}
div.add{
    float: inline-end;
    font-size: 20px;
    font-weight: 500px;
}
.mb-3.img{
    display: flex;
    width:100%;
    overflow-x:scroll;
}
</style>
  