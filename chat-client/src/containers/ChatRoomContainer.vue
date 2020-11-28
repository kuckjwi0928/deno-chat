<template>
  <chat-room
      :nickName="getNickName"
      :chats="getChats"
      :send="send"
  />
</template>

<script>
import ChatRoom from '@/components/ChatRoom'
import WebSocketAdapter from '@/lib/WebSocketAdapter'
import { JOIN, CHAT, LEAVE } from '@/constants/websocketActions'
import { CHAT_FORMAT } from '@/constants/messageFormat'
import { ADD_CHATS, CLEAR_CHATS } from '@/constants/actions'

export default {
  name: "ChatRoomContainer",
  data: () => ({
    ws: undefined
  }),
  components: {
    ChatRoom
  },
  created() {
    if (!this.getNickName) {
      this.$router.push('/')
      return
    }
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
              if (this.getNickName === jsonData.nickName) {
                this.$store.dispatch(CLEAR_CHATS).then(() => {
                  this.$store.dispatch(ADD_CHATS, {
                    chat: this.$t('join_chat_room').replace('%s', jsonData.nickName)
                  })
                })
              } else {
                this.$store.dispatch(ADD_CHATS, {
                  chat: this.$t('join_chat_room').replace('%s', jsonData.nickName)
                })
              }
              break
            case CHAT:
              this.$store.dispatch(ADD_CHATS, {
                chat: CHAT_FORMAT.replace('%s', jsonData.nickName)
                    .replace('%s', jsonData.message)
              })
              break
            case LEAVE:
              this.$store.dispatch(ADD_CHATS, {
                chat: this.$t('leave_chat_room').replace('%s', jsonData.nickName)
              })
              break
            default:
              break
          }
        })
    this.ws.connect()
  },
  destroyed() {
    if (this.ws) {
      this.ws.disconnect()
      this.ws = undefined
    }
  },
  methods: {
    send(msg) {
      return new Promise(resolve => {
        this.ws.send(msg)
        resolve()
      })
    }
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
