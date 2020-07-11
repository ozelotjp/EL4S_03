<template>
  <div class="text-center">
    <h1 class="text-3xl text-black">課題を設定</h1>
    <hr />
    <div>
      <div v-for="(task, i) in form" :key="i">
        <table>
          <tr>
            <th>課題名称</th>
            <td>
              <input
                v-model="task.name"
                type="text"
                placeholder="課題名称を入力"
              />
            </td>
          </tr>
          <tr>
            <th>所要時間</th>
            <td>
              <input
                v-model="task.hours"
                type="number"
                placeholder="課題所要時間を入力"
                class="text-left"
              />時間
            </td>
          </tr>
          <tr>
            <th>実施日付</th>
            <td>
              <input
                v-model="task.date"
                type="text"
                placeholder="実施日付を入力（任意）"
              />
            </td>
          </tr>
        </table>
        <hr />
      </div>
      <div>
        <button class="text-center text-blue-500" @click="addTask">
          項目を追加
        </button>
      </div>

      <button
        class="mt-5 rounded-md p-2 bg-blue-500 text-white"
        @click="register"
      >
        課題を登録
      </button>

      <!--<button @click="debug">デバッグbtn</button>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'
import { ITask, IUser } from '@@/models/firestore'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $router } }) {
    const form = ref(
      [] as { id?: string; name: string; hours: number; date: string }[]
    )

    const addTask = () => {
      form.value.push({
        name: '',
        hours: 1,
        date: '',
      })
    }
    addTask()

    const register = async () => {
      let day = 1 // 1 ~ 31
      const snap = await $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .get()
      const events = (snap.data() as IUser).events.map((event) =>
        event.toDate().getDate()
      )

      const tasks = form.value.map((task) => {
        for (;;) {
          day++
          if (events.includes(day)) {
            continue
          }
          break
        }
        return {
          name: task.name,
          hours: task.hours,
          date: $firebase.firestore.Timestamp.fromDate(
            new Date(`2020/08/${day}`)
          ),
        }
      }) as ITask[]

      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .set(
          {
            tasks,
          },
          { merge: true }
        )
      $router.push('/list')
    }

    const debug = () => {
      form.value = [
        { name: '課題１', hours: 1, date: '' },
        { name: '課題２', hours: 1, date: '' },
        { name: '課題３', hours: 1, date: '' },
        { name: '課題４', hours: 1, date: '' },
        { name: '課題５', hours: 1, date: '' },
      ]
    }

    return {
      form,
      addTask,
      register,
      debug,
    }
  },
})
</script>
