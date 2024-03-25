<template>
    <div style="height: 10vh;">
        <div class="largetitle">社区</div>
        <div class="nav">
            <div @click="change_type(type)" class="title" v-for="(type,index) in types" :key="index">{{ type }}</div>
            <div class="title" style="margin-left: auto;display: flex;">
                <div style="margin-right: 5px;">学科</div>
                <div class="iconfont icon-sanhengxian"></div>
            </div>
        </div>
    </div>
    <div @scroll="onscroll" class="main" id="main">
        <img src="@/assets/images/title.png" alt="" width="100%"> 
        <div class="item" v-for="item in items" :key="item.id">
            <div data-bs-toggle="offcanvas" :data-bs-target="'#post'+item.id" aria-controls="offcanvasExample">
                <div class="row">
                    <div class="col-7">
                        <div>{{ item.Title }}</div>
                        <div>{{ item.Type }}•{{ item.Subject }}</div>
                        <div>{{ item.CreatedAt.slice(0,10) }}</div>
                    </div>
                    <div v-if="item.ImagesURL==null" class="col-5"></div>
                    <div v-else class="col-5">
                        <img :src="item.ImagesURL[0]" alt="" max-width="100%" height="95px">
                    </div>
                </div>
            </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" :id="'post'+item.id" aria-labelledby="offcanvasExampleLabel" style="width: 100%;">
                <div class="offcanvas-header">
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div>{{ item.Title }}</div>
                    <div>{{ item.Content }}</div>
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

export default{
    components:{
        NavBar
    },
    setup(){
        let items=ref([])
        let load=ref(0)
        const types=["全部","资讯","知识","问答","分享"]
        const subjects=["政治","数学","外语","计算机","经济","法律","地质","机械"]
        let current_page=1;
        let current_type="全部";
        let current_subject="全部";
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
                pull_page();
            }
        }
        const pull_page=()=>{
            console.log(current_type);
            $.ajax({
                url:"http://8.130.144.38:8080/post/getList",
                type:"post",
                data:{
                    page:current_page,
                    type:current_type,
                    subject:current_subject,
                },
                success(resp){
                    console.log(resp);
                    items.value.push.apply(items.value,resp.data);
                    if(resp.data==null||resp.data.length!=10) load.value=2;
                    else load.value=0;
                },
            })
        }
        pull_page();
        const change_type=(type)=>{
            current_type=type;
            current_page=1;
            items.value=[];
            pull_page();
        }
        return{
            items,
            load,
            types,
            subjects,
            onscroll,
            change_type,
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
    margin-left: 10px;
    margin-right: 10px;
}
div.main{
    height: 80vh;
    overflow-y: scroll;
}
div.item{
    border-bottom: 1px solid gray;
    height: 100px;
}
</style>
  