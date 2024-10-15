import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import {cloneDeep} from 'lodash'

const fetchData = async () => {
  const formState = {
    apiKey: "AIzaSyCZgrWUDYg4zJ2d9OwYn-MsfrgAv2nlLRQ",
    sheetID: "19W9fHnHtguH3QZYH8RXjz3VWmle9GebisOcj31DINDo",
    range: "表單回應 1",
  };

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${formState.sheetID}/values/${formState.range}?key=${formState.apiKey}`;
  let fetchData = null;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
       fetchData = processData(data.values)
    })
    .catch((error) => console.error("Error:", error));

  return fetchData;
};

const processData = (data) => {
  const result = [];
  const cloneData = cloneDeep(data);
  cloneData.shift();

  cloneData.forEach((data) => {

    result.push({
      name: data[1],
      src: processUrl(data[2])
    });
  });

  return result;
}

const processUrl = (url) => {
  const id = url.split("?id=")[1];
  return `https://drive.google.com/thumbnail?id=${id}`
}

export const useIndexStore = defineStore("index", () => {
  const data = ref([]);

  onMounted(async () => {
    data.value = await fetchData();
  });

  return {
    data
  }
});
