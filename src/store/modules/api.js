import axios from 'axios'

const state = {
  base_url: 'https://jsonplaceholder.typicode.com',
  api: {
    GET: {
      users: '/users',
      todos: '/todos'
    }
  }
}

const getters = {
  users (state) { return state.base_url + state.api.GET.users },
  todos (state) { return state.base_url + state.api.GET.todos }
}

const actions = {
  /**
   * Так как нам не приходит никакой мета инфы,
   * запрашиваем весь список пользователей и возвращаем
   * длину массива
   */
  fetchTotal ({ getters }) {
    return new Promise((resolve, reject) => {
      axios.get(getters.users)
        .then(res => {
          resolve(res.data.length)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  fetchUsers ({ getters }, options) {
    return new Promise((resolve, reject) => {
      axios.get(getters.users, {
        params: {
          _page: options.page,
          _limit: options.limit
        }
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  fetchTodos ({ getters }, userId) {
    return new Promise((resolve, reject) => {
      axios.get(getters.todos, {
        params: {
          userId: userId
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
