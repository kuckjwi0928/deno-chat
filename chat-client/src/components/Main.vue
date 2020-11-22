<template>
  <div>
    <div>
      <label>
        <input type="text" :placeholder="$t('input_nick_name')" ref="nickName" />
      </label>
    </div>
    <button @click="join">{{ $t('start_chat') }}</button>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    join: function() {
      if (!this.$refs.nickName.value) {
        this.$refs.nickName.focus()
      }
      // TODO(kuckjwi): join chat room
    }
  }
}
</script>
