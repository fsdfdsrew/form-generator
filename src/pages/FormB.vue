<script lang="ts" setup>
import FormGenerator from "../components/FormGenerator.vue";
import { useStore } from "vuex";

const store = useStore();

const formFields = [
  { type: "input", label: "Фамилия", name: "surname", required: true },
  {
    type: "select",
    label: "Страна",
    name: "country",
    options: ["Россия", "США", "Германия"],
  },
  { type: "textarea", label: "Комментарий", name: "comment" },
];

const handleSave = (data: any) => {
  console.log("Форма B сохранена:", data);
  alert("Форма B успешно сохранена!");
};

const handleCancel = () => {
  console.log("Форма B отменена");
  store.commit("resetForm");
  alert("Форма B сброшена!");
};
</script>

<template>
  <div>
    <h1>Форма B</h1>
    <FormGenerator
      :fields="formFields"
      :form-key="'formB'"
      @save="handleSave"
      @cancel="handleCancel"
    />
  </div>
</template>
