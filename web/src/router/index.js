import { createRouter, createWebHistory } from 'vue-router'
import CommunityIndexView from '@/views/community/CommunityIndexView.vue'
import ChatIndexView from '@/views/chat/ChatIndexView.vue'
import PlanIndexView from '@/views/plan/PlanIndexView.vue'
import UserIndexView from '@/views/user/UserIndexView.vue'
import UserLoginView from '@/views/user/UserLoginView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'

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

export default router
