<template>
  <p>訂單完成</p>
  <p>{{ payAmount }}金額 已付款完畢</p>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const orderid = ref("");
const linepay_Backendurl = 'https://localhost/pay/linepay/paymentConfirm';
const payAmount = ref("");

onMounted(async() => {
  if(route.query.transactionId && route.query.orderId)
  {
    //orderid.value = route.query.orderId as string
    let input ={
      transactionId:route.query.transactionId,
      orderId:route.query.orderId,
    }
    const response = await fetch(linepay_Backendurl, { method: "POST",headers: {
    'Content-Type': 'application/json',
    },body: JSON.stringify(input) });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    payAmount.value = await response.text();
  } else {
    console.error("Missing transactionId or orderId in query parameters.");
  }

});

</script>
