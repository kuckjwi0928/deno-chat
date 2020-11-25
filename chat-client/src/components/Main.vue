<template>
  <div class="md-layout md-alignment-center">
    <div class="md-layout-item">
      <md-field>
        <label>{{ $t('nick_name') }}</label>
        <md-input ref="nickName"></md-input>
      </md-field>
      <md-button class="md-raised md-primary" @click="join">{{ $t('start_chat') }}</md-button>
    </div>
  </div>
</template>

<script>
import { CHAT_ROOM } from '@/constants/route';

export default {
  name: 'Main',
  methods: {
    join: function() {
      const el = this.$refs.nickName.$el;
      if (!el.value) {
        el.focus()
        return
      }
      this.$router.push(CHAT_ROOM);
      this.$store.dispatch('setNickName', {nickName: el.value})
    }
  }
}
</script>

<style lang="scss" scoped>
.md-layout {
  flex-direction: column;
}
</style>
