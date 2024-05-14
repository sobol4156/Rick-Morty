<script setup lang="ts">
import ItemList from "./Item/ItemList.vue";
import { ref, watch } from "vue";
import axios from "axios";

let page = ref(1);
const totalPages = ref(0);
const response = ref(null);

const fetchData = async () => {
  try {
    const resp = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page.value}`
    );
    response.value = resp.data;
    totalPages.value = resp.data.info.pages;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

fetchData();

const nextPage = () => {
  page.value++;
};

const prevPage = () => {
  page.value--;
};
watch(page, () => fetchData());
</script>

<template>
  <div class="main">
    <div class="input-search">
      <input
        type="text"
        v-model="searchQuery"
        @input="searchCharacters"
        placeholder="Search characters..."
        class="search-input"
      />
    </div>
    <div v-if="response" class="list-items">
      <div v-for="item in response.results">
        <ItemList
          :name="item.name"
          :species="item.species"
          :image="item.image"
          :status="item.status"
          :location="item.location.name"
          :origin="item.origin.name"
        />
      </div>
    </div>
    <div class="list-items" v-else>Идёт загрузка...</div>
    <div class="pagination">
      <button :disabled="page === 1" @click="prevPage">Prev Page</button>
      <div>
        <span>Page {{ page }} of {{ totalPages }}</span>
      </div>
      <button :disabled="page === totalPages" @click="nextPage">
        Next Page
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  position: relative;
}
.input-search {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.search-input {
  width: 40%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.list-items {
  padding: 70px 10px;
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
  gap: 10px;
  margin-bottom: 10px;
  vertical-align: middle;

  div{
    display: flex;
    align-items: center;
  }
}

@media (width < 800px) {
  .search-input {
    width: 60%;
  }
}
@media (width < 450px) {
  .search-input {
    width: 70%;
  }
}
</style>
