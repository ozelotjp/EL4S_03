<template>
  <div>
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">
          デバッグ用
        </div>
        <p class="text-gray-700 text-base">
          クリックで移動します
        </p>
        <ul class="text-gray-700 text-base list-inside list-decimal">
          <li>
            <nuxt-link to="/auth/login">
              /auth/login
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/auth/logout">
              /auth/logout
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/setup/event">
              /setup/event
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/setup/task">
              /setup/task
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/cal">
              /cal
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/list">
              /list
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">
          /users/{userId}
        </div>
        <pre class="text-gray-700 text-base">{{ user }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'
import { IUser, HasId } from '@@/models/firestore'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase } }) {
    const user = ref({} as IUser)

    $firebase
      .firestore()
      .collection('users')
      .doc($firebase.auth().currentUser!.uid)
      .get()
      .then((doc) => {
        const data = doc.data() as IUser
        user.value = {
          ...data,
        }
      })

    return {
      user,
    }
  },
})
</script>
