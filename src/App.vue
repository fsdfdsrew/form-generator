<script setup lang="ts">
import SavedData from "./components/SavedData.vue";
</script>

<template>
  <div>
    <nav>
      <router-link to="/">🏠 Главная</router-link>
      <router-link to="/form-a">📋 Форма A</router-link>
      <router-link to="/form-b">📝 Форма B</router-link>
    </nav>

    <router-view />

    <SavedData />
  </div>
</template>

<style scoped lang="scss">
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

header {
  background: #333;
  padding: 10px;
  margin-bottom: 20px;
}

nav {
  display: flex;
  gap: 10px;

  a {
    color: black;
    text-decoration: none;
    padding: 5px 10px;

    &:hover {
      background: #d1d1d1;
      border-radius: 5px;
    }
  }
}

main {
  max-width: 800px;
  margin: auto;
}
</style>
