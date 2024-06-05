<script setup lang="ts">
import { ApiResponse } from "./ListCart.ts";
import ItemList from "./Item/ItemList.vue";
import { ref, watch } from "vue";
import axios from "axios";

const page = ref(10);
const name = ref("");
const status = ref("");
const totalPages = ref(0);
const response = ref<ApiResponse | null | string>(null);

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const fetchData = async () => {
  try {
    let url = `https://rickandmortyapi.com/api/character/?page=${page.value}`;
    
    if (name.value) {
      url += `&name=${name.value}`;
    }
    
    if (status.value) {
      url += `&status=${status.value}`;
    }

    const resp = await axios.get<ApiResponse>(url);
    response.value = resp.data;
    totalPages.value = resp.data.info.pages;
    
    if(!resp.status){
      response.value = 'error'
    }
  } catch (error) {
    response.value = "error";
  }
};

fetchData();

const nextPage = () => {
  response.value = null
  page.value++;
};

const prevPage = () => {
  response.value = null
  page.value--;
};
watch(page, () => fetchData());

const searchCharacters = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    page.value = 1;
    fetchData();
  }, 500); 
};
const search = ()=> {
  response.value = null
  fetchData()
}
</script>

<template>
  <div class="main">
    <div>
      <div class="input-search">
      <input
        type="text"
        v-model="name"
        @input="searchCharacters"
        placeholder="Search characters..."
        class="search-input"
      />
      <select v-model="status" @change="searchCharacters">
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
    <div class="btn-search"><button @click="search">
      <span>Search</span></button></div>
    </div>
    
    <div v-if="response" >
      <div class="list-items"
        v-if="
          response !== 'error' &&
          typeof response !== 'string' &&
          response.results
        "
      >
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

      <div class="nothing" v-else>Ничего не найдено</div>
    </div>

    <div class="list-items beatiful-loading" v-else>Идёт загрузка...</div>
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
  gap: 5px;
  padding: 0 20px;
}
.search-input {
  
  max-width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  
}
.btn-search{
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.beatiful-loading{
  margin: 700px 0;
}

.nothing{
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}
select {
  min-width: 100px;
  flex-shrink: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z" clip-rule="evenodd" /></svg>');
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 16px;
}

.list-items {
  padding: 70px 10px;
  max-width: 100%;
  
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  
  color: #f5f5f5;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  vertical-align: middle;

  div {
    display: flex;
    align-items: center;
  }
}



@media (width < 375px) {
  .search-input {
    max-width: 200px;


  }
  .input-search{
    padding: 0 10px;
  }
  select{
      min-width: auto;
    }
}
</style>
