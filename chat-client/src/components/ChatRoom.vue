<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{ $t('chat_room') }}</span>
        <md-button class="leave" @click="leave">나가기</md-button>
      </md-app-toolbar>
      <md-app-content class="chat-room">
        <span>{{ $t('your_nick_name') }} {{ nickName }}</span>
        <div id="room" class="room">
          <p class="chat-content" v-for="(chat, index) in chats" :key="index">{{ chat }}</p>
        </div>
        <div class="input-zone">
          <md-field>
            <label>{{ $t('input_message') }}</label>
            <md-input ref="inputMessage" v-on:keyup.enter="sendMessage" v-model="message"></md-input>
            <md-button class="md-raised md-primary" @click="sendMessage">{{ $t('send') }}</md-button>
          </md-field>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { CHAT, LEAVE } from '@/constants/websocketActions'

export default {
  name: "ChatRoom",
  props: {
    nickName: {
      required: true,
      type: String,
    },
    chats: {
      required: true,
      type: Array,
    },
    send: {
      required: true,
      type: Function
    }
  },
  data: () => ({
    message: '',
    roomDiv : undefined,
  }),
  mounted() {
    this.$refs.inputMessage.$el.focus()
    this.roomDiv = this.$el.querySelector("#room")
  },
  updated() {
    this.roomDiv.scrollTop = this.roomDiv.scrollHeight
  },
  methods: {
    async sendMessage() {
      if (!this.message) {
        return
      }
      await this.send({
        'action': CHAT,
        'nickName': this.nickName,
        'message': this.message
      })
      this.message = ''
    },
    async leave() {
      await this.send({
        'action': LEAVE,
        'nickName': this.nickName,
      })
      await this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.md-title {
  flex: 1;
}
.chat-room {
  height: 95vh;
  .room {
    height: 80vh;
    overflow-y: scroll;
    border: 1px solid darkgray;
  }
  .input-zone {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 12px;
    width: 100%;
    text-align: center;
  }
  .chat-content {
    margin-left: 5px;
  }
}
</style>
