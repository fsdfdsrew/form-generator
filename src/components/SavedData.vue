<template>
  <div v-if="Object.keys(savedData).length" class="saved-data">
    <h2>Сохранённые данные</h2>
    <ul>
      <li v-for="(value, key) in savedData" :key="key">
        <strong>{{ key }}:</strong> {{ value }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const savedData = computed(() => store.state.formData);
</script>

<style scoped>
.saved-data {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}
</style>
