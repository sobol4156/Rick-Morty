<script setup lang="ts"></script>
<template>
  <div class="wrapper">
    <div class="wrapper-title"><h1>The Rick and Morty</h1></div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 376px;
  background-color: rgb(245, 245, 245);
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper-title {
  color: rgb(32, 35, 41);
  margin: 10px;
  text-align: center;
}
h1 {
  font-weight: 900;
  font-size: 5.625rem;
}
h1::selection{
    color: rgb(255, 152, 0);
    background: rgb(32, 35, 41);
}

@media (width< 750px) {
  h1 {
    font-size: 3.75rem;
  }
}
@media (width< 400px) {
  h1 {
    font-size: 3.125rem;
  }
}
</style>
