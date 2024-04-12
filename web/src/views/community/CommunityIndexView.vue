<template>
    <div style="height: 10vh;">
        <div class="largetitle">社区</div>
        <div class="nav">
            <div @click="change_type(type)" class="title" v-for="(type,index) in types" :key="index">{{ type }}</div>
            <div class="title" style="margin-left: auto;display: flex">
                <div style="margin-right: 5px;">学科</div>
                <select @change="change_subject" v-model="current_subject" class="form-select form-select-sm" aria-label="Default select example" style="width: 80px">
                    <option v-for="(subject,index) in subjects" :key="index" :value="subject">{{ subject }}</option>
                </select>
            </div>
        </div>
    </div>
    <div @scroll="onscroll" class="main" id="main">
        <img src="@/assets/images/title.png" alt="" width="100%"> 
        <div class="post" v-for="post in posts" :key="post.ID">
            <div @click="pull_comment(post.ID)" data-bs-toggle="offcanvas" :data-bs-target="'#post'+post.ID" aria-controls="offcanvasExample">
                <div class="row">
                    <div class="col-9">
                        <div style="margin-bottom: 10px;">{{ post.Title }}</div>
                        <div>{{ post.Type }}•{{ post.Subject }}</div>
                        <div>{{ post.CreatedAt.slice(0,10) }}</div>
                    </div>
                    <div v-if="post.ImagesURL==null" class="col-5"></div>
                    <div v-else class="col-3">
                        <img :src="post.ImagesURL[0]" alt="" style="max-width:95px; max-height:95px;">
                    </div>
                </div>
            </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" :id="'post'+post.ID" aria-labelledby="offcanvasExampleLabel" style="width: 100%;">
                <div class="offcanvas-header">
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div :id="'carousel'+post.ID" class="carousel slide">
                        <div class="carousel-indicators">
                            <button v-for="(img,index) in post.ImagesURL" :key="index" type="button" :data-bs-target="'#carousel'+post.ID" :data-bs-slide-to="index" class="active" aria-current="true" aria-label=""></button>
                        </div>
                        <div class="carousel-inner">
                            <div v-for="(img,index) in post.ImagesURL" :key="index" :class="'carousel-item'+(index==0?' active':'')">
                                <img :src="img" class="d-block" alt="" style="max-height:200px;margin: auto;">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel'+post.ID" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" :data-bs-target="'#carousel'+post.ID" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div>{{ post.Title }}</div>
                    <div>{{ post.Type }}•{{ post.Subject }}</div>
                    <div>{{ post.CreatedAt }}</div>
                    <div style="margin-top: 10px;margin-bottom: 10px;">{{ post.Content }}</div>
                    <div class="comment_nav">评论</div>
                    <div v-for="comment in comments" :key="comment.id" class="comment">
                        <div style="display: flex;">
                            <img v-if="comment.imgUrl!=''" :src="comment.imgUrl" alt="" style="max-width:20px; max-height:20px;border-radius: 50%;margin-top: 2px;">
                            <img v-else src="@/assets/images/user.png" alt="" style="max-width:20px; max-height:20px;border-radius: 50%;margin-top: 2px;">
                            <div>{{ comment.username }}</div>
                        </div>
                        <div>{{ comment.content }}</div>
                        <div>{{ comment.createdAt }}</div>
                    </div>
                </div>
                <div class="interact">
                    <input v-model="new_comment" type="text" class="form-control form-control-sm" placeholder="评论" style="width: 70%;">
                    <button @click="add_comment(post.ID)" class="btn btn-dark btn-sm">发送</button>
                    <div class="iconfont icon-dianzan"></div>
                    <div class="iconfont icon-shoucang"></div>
                </div>
            </div>
        </div>
        <div v-if="load==1" style="text-align: center;">加载中...</div>
        <div v-else-if="load==2" style="text-align: center;">到底了QAQ</div>
    </div>
    <NavBar></NavBar>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import $ from 'jquery'
import { ref } from 'vue'
import router from '@/router/index'
import { useStore } from 'vuex'

export default{
    components:{
        NavBar
    },
    setup(){
        const store=useStore();
        let posts=ref([])
        let comments=ref([])
        let load=ref(0)
        const types=["全部","资讯","知识","问答","分享"]
        const subjects=["全部","政治","数学","外语","计算机","经济","法律","地质","机械"]
        let current_page=1;
        let current_type="全部";
        let current_subject=ref("全部");
        let new_comment=ref("")
        const onscroll = () => {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.getElementById('main').scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.getElementById('main').clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.getElementById('main').scrollHeight;
            if (scrollTop + windowHeight >= scrollHeight - 10 && load.value==0){
                load.value=1;
                current_page++;
                pull_post();
            }
        }
        const pull_post=()=>{
            $.ajax({
                url:"http://8.130.144.38:8080/post/getList",
                type:"post",
                data:{
                    page:current_page,
                    type:current_type,
                    subject:current_subject.value,
                },
                success(resp){
                    console.log(resp);
                    posts.value.push.apply(posts.value,resp.data);
                    if(resp.data==null||resp.data.length!=10) load.value=2;
                    else load.value=0;
                },
            })
        }
        pull_post();
        const change_type=(type)=>{
            current_type=type;
            current_page=1;
            posts.value=[];
            pull_post();
        }
        const change_subject=()=>{
            current_page=1;
            posts.value=[];
            pull_post();
        }
        const pull_comment=id=>{
            new_comment.value="";
            $.ajax({
                url:"http://8.130.144.38:8080/up/commentlist",
                type:"post",
                data:{
                    postId:id,
                },
                success(resp){
                    console.log(resp);
                    if(resp.code==10000){
                        comments.value=resp.data;
                    }
                },
            })
        }
        const add_comment=id=>{
            if(!store.state.user.is_login){
                router.push({name:"user_login"});
                return;
            }
            $.ajax({
                url:"http://8.130.144.38:8080/up/comment",
                type:"post",
                headers:{
                    Authorization:store.state.user.token,
                },
                data:{
                    postId:id,
                    content:new_comment.value,
                },
                success(resp){
                    console.log(resp);
                    if(resp.code==10000){
                        pull_comment(id);
                    }
                },
            })
        }
        return{
            posts,
            load,
            types,
            subjects,
            new_comment,
            comments,
            current_subject,
            onscroll,
            change_type,
            change_subject,
            pull_comment,
            add_comment,
        }
    }
}
</script>

<style scoped>
div.largetitle{
    height: 6vh;
    margin-left: 10px;
    padding-top: 10px;
    font-size: 20px;
    font-weight: 500px;
}
div.nav{
    display: flex;
}
div.title{
    margin-left: 5px;
    margin-right: 5px;
}
div.main{
    height: 80vh;
    overflow-y: scroll;
}
div.post{
    border-bottom: 1px solid gray;
    height: 100px;
}
div.comment_nav{
    font-size: 20px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
}
div.comment{
    border-bottom: 1px solid gray;
    height: 100px;
}
div.interact{
    display: flex;
    box-shadow: 0 0 10px #9b9393;
}
div.iconfont{
    font-size: 20px;
    margin-left: 5px;
}
</style>
  