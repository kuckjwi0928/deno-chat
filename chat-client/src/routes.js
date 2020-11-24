import Main from '@/components/Main';
import ChatRoom from '@/components/ChatRoom';
import { CHAT_ROOM } from '@/constants/route';

export default [
  { path: '/', component: Main },
  { path: CHAT_ROOM, component: ChatRoom },
]
