<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card dark>
          <v-card-title>Пользователи</v-card-title>
          <v-card-text>
            <v-simple-table
              class="v-simple-table-pointer"
              v-if="items.length"
              dark
              dense
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <td
                      v-for="head in headers"
                      :key="head"
                    >
                      {{ head }}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="item.id"
                    @click="$router.push({
                      name: 'Пользователь',
                      query: { id: item.id },
                      params: { name: item.name }
                    })"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.phone }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <div class="v-card-actions-flex my-4">
              <v-btn-toggle rounded>
                <v-btn @click="setPage(1)">First</v-btn>
                <v-btn @click="decreasePage">Prev</v-btn>
                <v-btn @click="increasePage">Next</v-btn>
                <v-btn @click="setPage(lastPage)">Last</v-btn>
              </v-btn-toggle>
              <div
                class="text-body-2"
                v-text="'Текущая страница: ' + page"
              />
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      items: [],
      headers: ['Имя', 'Email', 'Телефон'],
      total: 0,
      page: 1,
      limit: 5
    }
  },
  created () {
    this.page = this.storedPage
    this.setTotal()
    this.fetchUsers()
  },
  watch: {
    page (newValue) {
      this.$store.commit('setPage', newValue)
    }
  },
  computed: {
    ...mapState({
      storedPage: 'page'
    }),
    lastPage () { return Math.ceil(this.total / this.limit) }
  },
  methods: {
    increasePage () {
      this.page++
      this.fetchUsers()
        .then(res => {
          /**
           * Если нам приходит пустой массив
           * декриминируем this.page и повторяем запрос
           */
          if (!res.length) {
            this.page--
            this.fetchUsers()
          }
        })
        .catch(err => console.log(err))
    },
    decreasePage () {
      if (this.page > 1) {
        this.page--
        this.fetchUsers()
      } else {
        console.log('Такой страницы не существует')
      }
    },
    setPage (page = 1) {
      this.page = page
      this.fetchUsers()
    },
    fetchUsers () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('api/fetchUsers', {
          page: this.page,
          limit: this.limit
        })
          .then(users => {
            this.items = users.data
            resolve(users.data)
          })
          .catch(err => {
            console.log(err)
            reject(Error(`Fetching Error: ${err}`))
          })
      })
    },
    setTotal () {
      this.$store.dispatch('api/fetchTotal')
        .then(total => {
          this.total = total
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="less">
.v-simple-table-pointer {
  tbody td {
    cursor: pointer;
  }
}

.v-card-actions-flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}
</style>
