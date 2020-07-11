<template>
  <div class="text-center">
    <h1 class="text-3xl text-black">イベントを設定</h1>
    <hr />
    <p class="mt-5 mb-10">
      予定の入っている日を追加しよう！
    </p>
    <div v-for="(date, index) in ngDates" :key="index">
      {{ date }}
      <button @click="removeNgDate(index)">
        X
      </button>
    </div>
    <input v-model="selectedNgDate" type="date" />
    <div>
      <button
        class="text-center text-blue-500"
        :disabled="selectedNgDate === null"
        @click="addNgDate"
      >
        イベント追加
      </button>
    </div>
    <div>
      <button class="mt-5 rounded-md p-2 bg-blue-500 text-white" @click="save">
        保存
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'nuxt-composition-api'
import { IUser } from '@@/models/firestore'
import { hyphenFormatFullDate, formatFullDate } from '@/utils/format-data'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $router } }) {
    const ngDates = ref([] as string[]) // yyyy-mm-dd
    const selectedNgDate = ref(null as string | null)

    const addNgDate = () => {
      if (!selectedNgDate.value) return

      const formatedDate = formatFullDate(new Date(selectedNgDate.value))
      if (formatedDate in ngDates.value) return
      ngDates.value.push(formatedDate)
      selectedNgDate.value = null
    }
    const removeNgDate = (index: number) => {
      ngDates.value = ngDates.value.filter((_, i) => i !== index)
    }

    const save = () => {
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .set(
          {
            events: ngDates.value.map((ngDate) =>
              $firebase.firestore.Timestamp.fromDate(new Date(ngDate))
            ),
          },
          { merge: true }
        )
        .then(() => {
          $router.push('/setup/task')
        })
    }

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .get()
        .then((doc) => {
          const data = doc.data() as IUser
          ngDates.value = data.events.map((event) => {
            return hyphenFormatFullDate(event.toDate())
          })
        })
    })

    return {
      ngDates,
      selectedNgDate,
      addNgDate,
      removeNgDate,
      save,
    }
  },
})
</script>
