import { createRouter, createWebHistory } from 'vue-router'
import CommunityIndexView from '@/views/community/CommunityIndexView.vue'
import ChatIndexView from '@/views/chat/ChatIndexView.vue'
import AddPostIndexView from '@/views/add/AddPostIndexView.vue'
import PlanIndexView from '@/views/plan/PlanIndexView.vue'
import UserIndexView from '@/views/user/UserIndexView.vue'
import UserSettingView from '@/views/user/UserSettingView.vue'
import UserLoginView from '@/views/user/UserLoginView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'
import store from '../store/index'

const routes = [
  {
    path:"/",
    name:"home",
    redirect:"/community/",
    meta:{
      requestAuth:false,
    },
  },
  {
    path:"/community/",
    name:"community_index",
    component:CommunityIndexView,
    meta:{
      requestAuth:false,
    },
  },
  {
    path:"/chat/",
    name:"chat_index",
    component:ChatIndexView,
    meta:{
      requestAuth:true,
    },
  },
  {
    path:"/add/",
    name:"add_post_index",
    component:AddPostIndexView,
    meta:{
      requestAuth:true,
    },
  },
  {
    path:"/plan/",
    name:"plan_index",
    component:PlanIndexView,
    meta:{
      requestAuth:true,
    },
  },
  {
    path:"/user/",
    name:"user_index",
    component:UserIndexView,
    meta:{
      requestAuth:false,
    },
  },
  {
    path:"/user/setting/",
    name:"user_setting",
    component:UserSettingView,
    meta:{
      requestAuth:false,
    },
  },
  {
    path:"/user/login/",
    name:"user_login",
    component:UserLoginView,
    meta:{
      requestAuth:false,
    },
  },
  {
    path:"/user/register/",
    name:"user_register",
    component:UserRegisterView,
    meta:{
      requestAuth:false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(!store.state.user.is_login){
    const jwt_token=localStorage.getItem("jwt_token");
    if(jwt_token){
      store.commit("updateToken",jwt_token);
      store.dispatch("getinfo",{
          success(){
              next();
          },
          error(){
            if(to.meta.requestAuth){
              next({name:"user_login"});
            }
            else{
              next();
            }
          },
      })
    }else{
      if(to.meta.requestAuth){
        next({name:"user_login"});
      }
      else{
        next();
      }
    }
  }else{
    next();
  }
})

export default router
