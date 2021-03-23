<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <div
          v-if="userName"
          class="text-h4"
          v-text="userName"
        />
        <v-btn @click="$router.push('/')">
          Назад
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list shaped>
          <v-list-item-group>
            <v-list-item
              v-for="(task, index) in todo"
              :key="`item-${index}`"
            >
              <template v-slot:default>
                <v-list-item-content>
                  <v-list-item-title v-text="task.title"/>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox
                    :input-value="task.completed"
                    disabled
                  />
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      todo: null
    }
  },
  created () {
    this.fetchUserTodo()
  },
  computed: {
    userId () { return this.$route.query.id },
    userName () { return this.$route.params.name }
  },
  methods: {
    fetchUserTodo () {
      this.$store.dispatch('api/fetchTodos', this.userId)
        .then(todo => {
          this.todo = todo
        })
    }
  }
}
</script>
