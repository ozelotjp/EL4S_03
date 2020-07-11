<template>
  <div class="text-center">
    <div v-if="loading">処理中です…</div>
    <div v-else>
      <h1 class="text-3xl text-black">ログイン</h1>

      <p class="mt-5">Googleアカウントにてログインしてください。</p>

      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-10"
        @click="signin"
      >
        Googleアカウントでログインする
      </button>

      <p class="mt-5">
        Googleアカウントをお持ちでない方は<a
          href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"
          class="text-blue-500 visited:text-blue-500"
          >こちら</a
        >から作成。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'

export default defineComponent({
  setup(_, { root: { $firebase, $router } }) {
    const loading = ref(true)

    $firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        $router.push('/setup/event')
      }
      loading.value = false
    })

    const signin = () => {
      loading.value = true
      $firebase
        .auth()
        .signInWithRedirect(new $firebase.auth.GoogleAuthProvider())
    }

    return {
      loading,
      signin,
    }
  },
})
</script>
