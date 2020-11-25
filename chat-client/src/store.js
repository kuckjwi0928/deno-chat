import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: '',
    chats: [],
  },
  mutations: {
    mutateNickName: (state, name) => {
      state.nickName = name
    },
    mutateChats: (state, chat) => {
      state.chats.push(chat)
    },
  },
  actions: {
    setNickName: ({ commit }, { nickName }) => {
      commit('mutateNickName', nickName)
    },
    addChats: ({ commit }, { chat }) => {
      commit('mutateChats', chat)
    },
  },
  getters: {
    getNickName: state => (state.nickName),
    getChats: state => (state.chats),
  }
})
