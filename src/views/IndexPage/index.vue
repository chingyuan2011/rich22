<script setup>
import { ref, computed } from "vue";
import { get, isEmpty } from "lodash";
import { useIndexStore } from "@/stores/index/index.js";

const store = useIndexStore();
const { getRoleData } = store;
const inputValue = ref("");
const roleData = ref(null);
const search = () => {
  roleData.value = getRoleData(inputValue.value);
};

const cards = computed(() => {
  const _cards = get(roleData.value, "cards", null);
  return !isEmpty(_cards)
    ? _cards
    :  null;
});
</script>

<template>
  <div class="ThanksPage">
    <div class="bg">
      <div class="glass"></div>
    </div>
    <div class="container">
      <h1 class="matemasie-regular">
        [影響力 22 班]
        <br />
        畢業季感恩活動
      </h1>
      <div class="searchBar">
        <input v-model="inputValue" />
        <button @click="search">查詢</button>
      </div>
      <p class="searchNote">請輸入姓名和手機末3碼(例如：楊大原123）</p>
      <p class="roleData" v-if="roleData">
        來自 {{ roleData.role.groupName }} 的 {{ roleData.role.name }} ，你好！
      </p>
      <div class="cards" v-if="cards">
        <div
          class="card"
          v-for="(item, idx) in cards"
          :key="item.content"
          :style="{
            backgroundImage: `url(imgs/card_bg${(idx % 5) + 1}.jpg)`,
          }"
        >
          <div class="content">
            <p>{{ item.content }}</p>
          </div>
          <p class="fromName">{{ item.from }}</p>
        </div>
      </div>
      <p class="note" v-else>輸入資訊開始查詢</p>
      <p class="group">
        主辦：輕易豐盛學院<br />
        指導成員：Ray、宥安、冬冬、汪汪<br />
        協作成員：小解、詠鈴、桔子、青原、鳳君、佩婷、喬涵
      </p>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Matemasie&family=Noto+Sans+TC:wght@100..900&family=Noto+Serif+TC:wght@200..900&display=swap");

.ThanksPage {
  width: 100%;
  position: relative;
  /* border: 10px solid rgb(100, 54, 60); */
  /* padding: 20px 20px 400px 20px; */
  padding-bottom: 0px;
}
.bg {
  box-sizing: border-box;
  z-index: -1;
  background-color: rgb(248, 195, 205);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(/imgs/texture.png);
}

.container {
  max-width: 830px;
  margin: 0 auto;
}

h1 {
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 600;
  color: #b60614;
  text-align: center;
  font-size: 30px;
}

.searchBar {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  font-size: 16px;
  align-items: center;
  margin-bottom: 10px;
}
.searchNote {
  font-size: 16px;
  color: #b60614;
  text-align: center;
}

button {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  background-color: #ef7c8e;
  border: 0px;
  cursor: pointer;
  color: #ffffff;
}

.roleData {
  margin-top: 30px;
  padding-bottom: 20px;
  font-weight: 700;
  font-size: 18px;
  color: #b60614;
}
input {
  flex-grow: 1;
  height: 32px;
  padding: 5px;
  font-size: 16px;
  background-color: #fae8e0;
  border: 0px;
  color: #333333;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.card {
  display: flex;
  flex-direction: column;
  background-size: cover;
  color: #666666;
  text-align: left;
  font-size: 16px;
  /* 788 * 395 */
  width: 400px;
  height: 200px;
  padding: 20px 160px 10px 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
}

.card:nth-child(even) {
  transform: translateY(100px);
}

p {
  margin: 0;
  padding: 0;
}
.content {
  flex-grow: 1;
  overflow: auto;
  white-space: pre-wrap;
}
.fromName {
  margin-top: 5px;
  text-align: right;
}

.note {
  padding: 50px 0 50px;
  font-size: 24px;
  text-align: center;
  color: #b60614;
}

.group {
  padding: 200px 0 50px;
  font-size: 16px;
  color: #b60614;
}

@media (max-width: 960px) {
  h1 {
    font-size: 26px;
  }
  .container {
    max-width: 330px;
  }
  .card {
    width: 330px;
    height: 170px;
    padding-right: 120px;
  }
  .card:nth-child(even) {
    transform: translateY(0px);
  }
}
</style>
