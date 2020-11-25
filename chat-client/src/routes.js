import VueRouter from 'vue-router'
import Main from '@/components/Main'
import ChatRoomContainer from '@/containers/ChatRoomContainer'
import { CHAT_ROOM } from '@/constants/route'

export default new VueRouter({
  routes: [
    { path: '/', component: Main },
    { path: CHAT_ROOM, component: ChatRoomContainer },
  ]
})
