<template>
  <div class="text-center">
    <h1 class="text-3xl text-black">課題一覧</h1>
    <table class="table-auto w-full mt-5">
      <thead>
        <tr>
          <th class="px-4 py-2">日付</th>
          <th class="px-4 py-2">予定</th>
          <th class="px-4 py-2">所要時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td class="border px-4 py-2">{{ task.date }}</td>
          <td class="border px-4 py-2">{{ task.name }}</td>
          <td class="border px-4 py-2">{{ task.hours }}時間</td>
        </tr>
      </tbody>
    </table>

    <a href="/cal" class="text-center text-blue-500">カレンダーで確認</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'
import { IUser } from '@@/models/firestore'
import { formatDate } from '@/utils/format-data'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase } }) {
    const tasks = ref([] as { name: string; hours: number; date: string }[])
    $firebase
      .firestore()
      .collection('users')
      .doc($firebase.auth().currentUser!.uid)
      .get()
      .then((doc) => {
        const data = doc.data() as IUser
        data.tasks.forEach((task) => {
          tasks.value.push({
            name: task.name,
            hours: task.hours,
            date: formatDate(task.date.toDate()),
          })
        })
      })

    return {
      tasks,
    }
  },
})
</script>
