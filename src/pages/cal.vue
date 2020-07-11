<template>
  <div class="text-center">
    <!-- 年月 -->
    <h1 class="text-3xl text-black">2020/08</h1>
    <table>
      <!-- 日付単位でのループ開始 -->
      <tr class="mt-10">
        <!-- 日付 -->
        <th class="w-full block text-3xl text-left font-thin text-blue-500">
          02
        </th>
        <td class="w-full block">
          <span class="mr-3">12:00-13:00</span>課題１
        </td>
        <!-- 予定単位でのループ開始 -->
      </tr>

      <tr class="mt-10">
        <th class="w-full block text-3xl text-left font-thin text-blue-500">
          03
        </th>
        <td class="w-full block">
          <span class="mr-3">14:00-16:00</span>課題２
        </td>
      </tr>
      <!-- 予定単位でのループ終了 -->
      <!-- 日付単位でのループ終了 -->
    </table>
    <a href="/list" class="text-center text-blue-500">リストで確認</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  middleware: 'authenticated',
})
</script>
