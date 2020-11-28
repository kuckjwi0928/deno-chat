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
    clearChats: (state) => {
      state.chats = []
    }
  },
  actions: {
    setNickName: ({ commit }, { nickName }) => {
      commit('mutateNickName', nickName)
    },
    addChats: ({ commit }, { chat }) => {
      commit('mutateChats', chat)
    },
    clearChats: ({ commit }) => {
      return new Promise((resolve) => {
        commit('clearChats')
        resolve()
      })
    }
  },
  getters: {
    getNickName: state => (state.nickName),
    getChats: state => (state.chats),
  }
})
