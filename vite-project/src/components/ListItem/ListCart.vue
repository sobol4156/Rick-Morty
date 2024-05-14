<script setup lang="ts">
import ItemList from "./Item/ItemList.vue";
import {ref} from 'vue'
import axios from 'axios'

let page = 1
const response = ref(null)

const fetchData = async () => {
  try{
    const resp = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
    response.value = resp.data
    console.log(resp.data.results[0])
  }catch(error){
    console.error('Ошибка при получении данных:', error);
  }
}

fetchData()

</script>

<template>
  <div>

    <div v-if="response" class="list-items">
      <div v-for="item in response.results">
        <ItemList :name="item.name" :species="item.species" :image="item.image"/>
      </div>
    </div>
    <div class="list-items" v-else>Идёт загрузка...</div>
    <div class="pagination">
      <button></button>
      <button></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-items {
  padding: 81px 10px;
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1920px;
  color: #f5f5f5;
}
.pagination {
  display: flex;
  justify-content: center;
}


</style>
