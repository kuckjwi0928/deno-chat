<template>
  <div>
    <md-content>
      <chat-room :nickName="getNickName" :chats="getChats" />
    </md-content>
  </div>
</template>

<script>
import ChatRoom from '@/components/ChatRoom'
import WebSocketAdapter from '@/lib/WebSocketAdapter'
import { JOIN, CHAT } from '@/constants/websocketActions'

export default {
  name: "ChatRoomContainer",
  data: () => ({
    ws: undefined
  }),
  components: {
    ChatRoom
  },
  created() {
    this.ws = new WebSocketAdapter(process.env.VUE_APP_CHAT_SERVER_URL,
() => {
          this.ws.send({
            'action': JOIN,
            'nickName': this.getNickName
          })
        }, (e) => {
          const { data } = e
          const jsonData = JSON.parse(data)
          switch (jsonData.action) {
            case JOIN:
              this.$store.dispatch('addChats', { chat: this.$t('join_chat_room').replace('%s', jsonData.nickName) })
              break;
            case CHAT:
              // TODO(kuckjwi): chat...
              break
            default:
              break;
          }
        })
    this.ws.connect()
  },
  destroyed() {
    this.ws.disconnect()
    this.ws = undefined
  },
  computed: {
    getNickName() {
      return this.$store.getters.getNickName
    },
    getChats() {
      return this.$store.getters.getChats
    }
  }
}
</script>
