<script setup lang="ts">
import { ref } from 'vue'

const productPrice = ref(100)
const productName = ref('iphone')
const productQuantity = ref(1)

const linepay_Backendurl = 'https://localhost/pay/linepay/paymentRequest';
 

async function linepaypayment() {
  try {
    let input ={
      name:productName.value,
      price:productPrice.value,
      quantity:productQuantity.value
    }
    const response = await fetch(linepay_Backendurl, { method: "POST",headers: {
    'Content-Type': 'application/json',
    },body: JSON.stringify(input) });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const linepayUrl = await response.text();
    window.location.href = linepayUrl;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error; // 在這裡重新拋出錯誤，以便呼叫者可以捕獲錯誤
  }
}
</script>

<template>
  <div class="container">
    <h1>Line Pay Cart</h1>
    <p>商品名稱： {{productName}}</p>
    <p>商品價格: {{productPrice}}</p>
    <p>購買數量：<input type="number" v-model="productQuantity" placeholder="Type here"></p>
    <button @click="linepaypayment">購買</button>
    <router-view />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
  }
}
</style>