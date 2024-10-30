import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { cardHandler } from './process.js'

// https://docs.google.com/spreadsheets/d/1Np4BAKjkspdUJI9QNKXCvRgojvvZGU4LdynWMHFOk3k/edit?resourcekey=&gid=1002593271#gid=1002593271

const fetchData = async () => {
  const formState = {
    apiKey: "AIzaSyCZgrWUDYg4zJ2d9OwYn-MsfrgAv2nlLRQ",
    sheetID: "1Np4BAKjkspdUJI9QNKXCvRgojvvZGU4LdynWMHFOk3k",
    range: "表單回應 1",
  };

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${formState.sheetID}/values/${formState.range}?key=${formState.apiKey}`;
  let fetchData = null;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fetchData = data.values;
    })
    .catch((error) => console.error("Error:", error));

  return fetchData;
};
export const useIndexStore = defineStore("index", () => {
  const personData = ref({});
  const data = ref([]);

  const getRoleData = (value) =>  personData.value[value] || null

  onMounted(async () => {
    data.value = await fetchData();
    personData.value = cardHandler(data.value);
  });

  return {
    getRoleData
  }
});
