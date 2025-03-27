<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import FormGenerator from "../components/FormGenerator.vue";

const formData = computed(() => store.state.formData);
const store = useStore();

const formFields = [
  { type: "input", label: "Имя", name: "name" },
  {
    type: "select",
    label: "Пол",
    name: "gender",
    options: ["Мужской", "Женский"],
  },
  { type: "checkbox", label: "Согласие", name: "agree" },
  { type: "textarea", label: "Комментарий", name: "comment" },
];

const handleSave = (data: any) => {
  console.log("Форма сохранена:", data);
  alert("Форма успешно сохранена!");
};

const handleCancel = () => {
  console.log("Форма отменена");
  store.commit("resetForm");
  alert("Форма сброшена!");
};
</script>

<template>
  <div>
    <h1>Генератор форм</h1>
    <FormGenerator
      :fields="formFields"
      :form-key="'Home'"
      @save="handleSave"
      @cancel="handleCancel"
    >
      <template #name="{ value, update }">
        <input
          type="text"
          :value="value"
          class="custom-input"
          placeholder="Введите имя"
          @input="update('name', ($event.target as HTMLInputElement).value)"
        />
      </template>

      <template #comment="{ value, update }">
        <textarea
          :value="value"
          class="custom-textarea"
          placeholder="Введите комментарий..."
          @input="
            update('comment', ($event.target as HTMLTextAreaElement).value)
          "
        ></textarea>
      </template>
    </FormGenerator>
  </div>
</template>

<style scoped>
.custom-input {
  border: 2px solid blue;
  padding: 5px;
  border-radius: 5px;
}

.custom-textarea {
  border: 2px dashed red;
  padding: 5px;
  border-radius: 5px;
}
</style>
