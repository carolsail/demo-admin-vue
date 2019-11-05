import api from '@/api/User'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await api.login({ username: username.trim(), password: password })
      const { data } = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    try {
      const response = await api.getInfo(state.token)
      const { data } = response
      if (!data) {
        return Promise.reject('Verification failed, please Login again.')
      }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

