<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useIndexStore } from "@/stores/index/index.js";
const store = useIndexStore();
const { data } = storeToRefs(store);
onMounted(() => {});
</script>

<template>
  <div>
    <div class="searchBar">
        <span>我是，</span>
        <select>
            <option>工作家人</option>
            <option>第一戰隊</option>
            <option>第二戰隊</option>
            <option>第三戰隊</option>
            <option>第四戰隊</option>
        </select>
        <input value="楊青原">
        <button>查詢</button>
    </div>
    <div class="cards">
      <div class="card" v-for="(item, idx) in data" :key="idx">
        <span>{{ item.name }}</span>
        <img :src="item.src" />
      </div>
    </div>
  </div>
</template>

<style>

.searchBar {
    display: flex;
    gap: 20px;
    font-size: 16px;
    margin-bottom: 50px;
    align-items: center;
}
select,
input {
    padding: 5px;
    font-size: 16px;
}
.cards {
  display: flex;
  gap: 20px;
}
.card {
  padding: 10px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
