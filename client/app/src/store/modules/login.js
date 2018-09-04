
import * as types from '../types'
import axios from 'axios'
export const state = {
  token: sessionStorage.getItem('user-token') || '',
  status: ''
}

export const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

export const mutations = {

  [types.MUTATE_AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },

  [types.MUTATE_AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },

  [types.MUTATE_AUTH_ERROR]: (state) => {
    state.status = 'error'
  }
}

export const actions = {
  AUTH_REQUEST: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      commit(types.MUTATE_AUTH_REQUEST, payload)
      sessionStorage.setItem('user-token', 'token')
      // axios.defaults.headers.common['Authorization'] = 'token'
      axios.post('o/mql/login', payload).then(response => {
        var token = response.headers.authorization
        sessionStorage.setItem('user-token', token)
        // set axios header
        // axios.defaults.headers.common['Authorization'] = token
        commit(types.MUTATE_AUTH_SUCCESS, response)
        resolve(response)
      })
        .catch(err => {
          commit(types.MUTATE_AUTH_ERROR, err)
          sessionStorage.removeItem('user-token')
          reject(err)
        })
    })
  },

  AUTH_LOGOUT: ({ commit }) => {
    return new Promise((resolve, reject) => {
      sessionStorage.removeItem('user-token')
      // remove the axios default header
      // delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

/* export default {
  state,
  getters,
  mutations,
  actions
} */
