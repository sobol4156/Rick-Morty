<script setup lang='ts'>
import {defineProps} from 'vue'


const props = defineProps({
    name: String,
    species: String,
    image: String,
    status: String,
    location: String,
    origin: String
})
</script>

<template>
      <div class="item">
        <img
            :src="props.image"
          alt="person"
        />
        <div class="character-info">
          <div class="info-general block-info">
            <h2 class="text-link">{{ props.name }}</h2>
            <div class="info-alive">
              <span class="status-icon" :class="status === 'Alive'? '' : 'dead-icon'"></span>
              <span class="status-text">{{ props.status }} - {{ props.species }}</span>
            </div>
          </div>
          <div class="block-info">
            <span class="text-gray">Last known location:</span>
            <span class="text-link">{{ props.location }}</span>
          </div>
          <div class="block-info">
            <span class="text-gray">First seen in:</span>
            <span class="text-link">{{ props.origin }}</span>
          </div>
        </div>
      </div>
</template>

<style scoped>
.item {
  background-color: #3a3c41;
  border-radius: 10px;
  display: flex;

  img {
    height: 180px;
    width: 180px;
    border-radius: 10px 0 0 10px;
  }

  .character-info {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    gap: 5px;
    font-weight: 400;
    width: 370px;

    .block-info {
      display: flex;
      flex-direction: column;
      h2 {
        margin: 0;
        font-weight: 900;
      }
    }
  }
}

.text-gray {
  color: rgb(158, 158, 158);
  font-size: 13px;
  font-weight: 500;
}
.text-link {
  cursor: pointer;
}
.text-link:hover {
  color: rgb(255, 152, 0);
}

.info-alive {
  display: flex;
  align-items: center;
  gap: 5px;

  .status-icon {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: rgb(85, 204, 68);
  }
  .dead-icon {
  background-color: red;
}

  .status-text {
    font-size: 12px;
    font-weight: 700;
  }
}

@media (width < 650px) {
  .item {
    flex-direction: column;
    width: 400px;
    img {
      width: 100%;
      height: auto;
      border-radius: 10px 10px 0 0;
    }
  }
}

@media (width < 450px) {
  .item {
    flex-direction: column;

    width: 300px;
  }
}
</style>