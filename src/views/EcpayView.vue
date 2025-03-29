<script setup lang="ts">

interface ecPayBackendOutput {
  CheckMacValue: string;
  MerchantTradeNo: string;
}
interface ecPayFrountendInput {
  MerchantID: string;
  MerchantTradeDate:string;
  PaymentType: string;
  TotalAmount:number;
  TradeDesc:string;
  ItemName:string;
  ReturnURL:string;
  ChoosePayment:string;
  EncryptType:number;
  ClientBackURL:string;
}

interface checkOut {
  MerchantID: string;
  MerchantTradeNo: string;
  MerchantTradeDate: string;
  TotalAmount: number;
  TradeDesc: string;
  ItemName: string;
  ReturnURL: string;
  ChoosePayment: string;
  EncryptType: number;
  PaymentType: string;
  CheckMacValue: string;
}
const Backendurl = 'https://localhost/pay/ecpay/getcheckout';
//ReturnURL:'https://localhost/pay/ecpay/getpayresult'

async function sendtoecpay() {
  const form = document.createElement("form");
  if (!form) {
    console.error("Form not found!");
    return;
  }
  form.method = "POST";
  form.action =
    "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"; 

  const tradeDate = new Date(Date.now());
  const tradeDateString = formatDate(tradeDate);
  const inputData: ecPayFrountendInput = {
    MerchantID: '3002607',
    MerchantTradeDate: tradeDateString,
    PaymentType: 'aio',
    TotalAmount: 30000,
    TradeDesc: '測試交易',
    ItemName: 'Iphone16',
    //此處須根據ngrok的webhook網址進行更改
    ReturnURL: 'https://b041-180-177-110-209.ngrok-free.app/pay/ecpay/getpayresult ',
    ChoosePayment: 'ALL',
    EncryptType: 1,
    ClientBackURL: 'http://localhost:5173/ecpayresult'
  };


  try {
    // 從後端取得資料
    const backendValue = await getBackendValue(inputData);
    if (!backendValue.CheckMacValue || !backendValue.MerchantTradeNo) {
      throw new Error('Invalid response format from backend');
    } 
    // 將從後端獲得的值填入表單欄位
    let checkout :checkOut=
    {
      ...inputData,
      MerchantTradeNo:backendValue.MerchantTradeNo,
      CheckMacValue:backendValue.CheckMacValue
    };
    for (const key in checkout) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = checkout[key as keyof checkOut].toString();
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error("Error:", error);
  }
}

function formatDate(date:Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是 0-11，需要 +1，並補 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

async function getBackendValue(input:ecPayFrountendInput): Promise<ecPayBackendOutput> {
  try {
    const response = await fetch(Backendurl, { method: "POST",headers: {
    'Content-Type': 'application/json',
    },body: JSON.stringify(input) });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    if (data['CheckMacValue'] && data['MerchantTradeNo']) {
      return data;
    } else {
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error; // 在這裡重新拋出錯誤，以便呼叫者可以捕獲錯誤
  }
}


</script>

<template>
  <div>
    <h1>This is an ECpay Test Page</h1>
    <p>商品名稱：Iphone16</p>
    <p>商品價格：30,000</p>
    <form id="sendtoecpayform" @submit.prevent="sendtoecpay" method="post" action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">
      <input type="hidden" name="MerchantID" value="3002607">
      <!-- 後端取 -->
      <input type="hidden" name="MerchantTradeNo">
      <!-- 前端 js 取 -->
      <input type="hidden" name="MerchantTradeDate">
      <input type="hidden" name="PaymentType" value="aio">
      <input type="number" name="TotalAmount" value="30000">
      <input type="hidden" name="TradeDesc" value="測試交易">
      <input type="hidden" name="ItemName" value="Iphone16">
      <input type="hidden" name="ReturnURL" value="https://你的網站.com/payment-return">
      <input type="hidden" name="ChoosePayment" value="ALL">
      <!-- 後端取 -->
      <input type="hidden" name="CheckMacValue">
      <button type="submit">前往綠界付款</button>
    </form>
  </div>
</template>

<style>

</style>
