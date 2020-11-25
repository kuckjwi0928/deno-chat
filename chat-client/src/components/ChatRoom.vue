<template>
  <div>
    <md-content>{{ nickName }}</md-content>
    <div v-for="(chat, index) in chats" :key="index">{{ chat }}</div>
  </div>
</template>

<script>
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
    }
  },
}
</script>

<style lang="scss" scoped>
.md-content {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
