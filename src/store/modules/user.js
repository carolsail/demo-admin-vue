import api from '@/api/User'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  id: '',
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
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
  async getInfo({ commit }) {
    try {
      const response = await api.getInfo()
      const { data } = response
      if (!data) {
        return Promise.reject('Verification failed, please Login again.')
      }
      const { id, name, avatar } = data
      commit('SET_ID', id)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // user logout
  logout({ commit }) {
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
  },

  async refresh({ dispatch, commit }) {
    try {
      const response = await api.refreshToken()
      const { data } = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      return dispatch('getInfo')
    } catch (error) {
      return Promise.reject(error)
    }
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

