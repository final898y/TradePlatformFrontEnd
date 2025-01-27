<script setup lang="ts">
import { reactive } from 'vue'

let testUserData = reactive({});
let loading = reactive({ isLoading: true });  // 添加加载状态

const baseUrl = 'https://localhost/users/search';
const params = new URLSearchParams({ uid: "UID2024080817555212345679" });
const url = `${baseUrl}?${params.toString()}`;

async function getUserDetail(){
  fetch(url, { method: "GET" })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data && data['data']) {
      testUserData = reactive(data['data']);
    } else {
      throw new Error('Data not found in the response');
    }
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  })
  .finally(() => {
    loading.isLoading = false;
  });
}

</script>

<template>
  <div class="datalist">
    <h1>This is an fetch Test Page</h1>
    <button @click="getUserDetail">查詢資料庫</button>
    <ul v-if="!loading.isLoading">
      <li v-for="(value, key, index) in testUserData" :key="index">
        {{ index+1 }}. {{ key }}: {{ value }}
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .datalist {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .datalist ul {
    list-style-type:none;
    padding-top: 10px;
    border-style: inset;
    border-color: aquamarine;
    border-width: 0.3em;
    margin: 10px;
}
  .datalist ul li {
    margin-bottom: 3px;
    color: whitesmoke;
}}
</style>
