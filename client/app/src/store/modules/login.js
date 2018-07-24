
import * as types from '../types'
// TODO: O.AuthService Call
// import * as serviceNames from '../../serviceNames'
import axios from 'axios'

const state = {
  token: sessionStorage.getItem('user-token') || '',
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const mutations = {

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

const actions = {
  AUTH_REQUEST: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      commit(types.MUTATE_AUTH_REQUEST, payload)
      sessionStorage.setItem('user-token', 'token')
      axios.defaults.headers.common['Authorization'] = 'token'
      resolve(true)
      // axios.post('url', payload).then(response => {
      //   const token = response.data.token
      //   sessionStorage.setItem('user-token', token)
      //   // set axios header
      //   axios.defaults.headers.common['Authorization'] = token
      //   commit(types.MUTATE_AUTH_SUCCESS, response)
      //   resolve(response)
      // })
      //   .catch(err => {
      //     commit(types.MUTATE_AUTH_ERROR, err)
      //     sessionStorage.removeItem('user-token')
      //     reject(err)
      //   })
    })
  },

  AUTH_LOGOUT: ({ commit }) => {
    return new Promise((resolve, reject) => {
      sessionStorage.removeItem('user-token')
      // remove the axios default header
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
