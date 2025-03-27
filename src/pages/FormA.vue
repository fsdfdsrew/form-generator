<template>
  <div class="container">
    <h1>Форма A с кастомными элементами</h1>
    <FormGenerator
      :fields="formFields"
      :form-key="'formA'"
      @save="handleSave"
      @cancel="handleCancel"
    >
      <!-- Кастомный input с иконкой -->
      <template #name="{ value, update }">
        <div class="custom-input">
          <input
            type="text"
            :value="value"
            placeholder="Введите имя..."
            @input="update('name', ($event.target as HTMLInputElement).value)"
          />
          <span>🔍</span>
        </div>
      </template>

      <!-- Кастомный чекбокс -->
      <template #agree="{ value, update }">
        <label class="custom-checkbox">
          <input
            type="checkbox"
            :checked="value"
            @change="
              update('agree', ($event.target as HTMLInputElement).checked)
            "
          />
          <span>✔</span>
          <span>Я согласен с условиями</span>
        </label>
      </template>
    </FormGenerator>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import FormGenerator from "../components/FormGenerator.vue";
import { useStore } from "vuex";

const store = useStore();
const formData = computed(() => store.state.formData);

const formFields = [
  { type: "input", label: "Имя", name: "name" },
  { type: "checkbox", label: "Согласие", name: "agree", required: true },
];

const handleSave = (data: any) => {
  console.log("Форма A сохранена:", data);
  alert("Форма A успешно сохранена!");
};

const handleCancel = () => {
  console.log("Форма A отменена");
  store.commit("resetForm");
  alert("Форма A сброшена!");
};
</script>

<style scoped>
.custom-input {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
}

.custom-input input {
  border: none;
  outline: none;
  flex-grow: 1;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-checkbox input {
  width: 20px;
  height: 20px;
}
</style>
