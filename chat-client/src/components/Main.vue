<template>
  <div class="md-layout md-alignment-center">
    <div class="md-layout-item">
      <md-field>
        <label>{{ $t('nick_name') }}</label>
        <md-input ref="nickName" v-on:keyup.enter="join"></md-input>
      </md-field>
      <md-button class="md-raised md-primary" @click="join">{{ $t('start_chat') }}</md-button>
    </div>
  </div>
</template>

<script>
import { CHAT_ROOM } from '@/constants/route';
import { SET_NICK_NAME } from '@/constants/actions'

export default {
  name: 'Main',
  mounted() {
    this.$refs.nickName.$el.focus()
  },
  methods: {
    join: function() {
      const el = this.$refs.nickName.$el;
      if (!el.value) {
        el.focus()
        return
      }
      this.$router.push(CHAT_ROOM);
      this.$store.dispatch(SET_NICK_NAME, {nickName: el.value})
    }
  }
}
</script>

<style lang="scss" scoped>
.md-layout {
  flex-direction: column;
  height: 100vh;
  text-align: center;
  .md-layout-item {
    flex: 0 0
  }
}
</style>
