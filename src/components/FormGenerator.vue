<script lang="ts" setup>
import { defineProps, defineEmits, useSlots, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const slots = useSlots();

interface FormField {
  type: "input" | "select" | "checkbox" | "textarea";
  label: string;
  name: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

const props = defineProps<{
  fields: FormField[];
  formKey: string;
}>();

const emit = defineEmits(["save", "cancel"]);

const formData = computed(() => store.state.formData[props.formKey] || {});

// При изменении значения обновляем Vuex
const updateValue = (name: string, value: any) => {
  store.commit("setFormData", {
    formKey: props.formKey,
    data: { [name]: value },
  });
};

// Сохраняем данные
const saveForm = () => {
  const invalidFields = props.fields.filter(
    (field) => field.required && !formData.value[field.name]
  );

  if (invalidFields.length > 0) {
    alert(
      `Пожалуйста, заполните обязательные поля: ${invalidFields
        .map((f) => f.label)
        .join(", ")}`
    );
    return;
  }

  store.dispatch("saveFormData", {
    formKey: props.formKey,
    data: formData.value,
  });
  emit("save", formData.value);
};

// Очищаем данные при отмене
const cancelForm = () => {
  store.commit("resetFormData", props.formKey);
  emit("cancel");
};

// При загрузке страницы загружаем данные из Vuex
onMounted(() => {
  store.commit("restoreFormData");
});
</script>

<template>
  <form class="form-generator container">
    <div v-for="field in fields" :key="field.name" class="form-group">
      <label>{{ field.label }}</label>

      <!-- Кастомные слоты -->
      <slot
        v-if="slots[field.name]"
        :name="field.name"
        :value="formData[field.name]"
        :update="updateValue"
      ></slot>

      <!-- Обычные поля -->
      <template v-else>
        <input
          v-if="field.type === 'input'"
          v-model="formData[field.name]"
          @input="
            updateValue(field.name, ($event.target as HTMLInputElement).value)
          "
        />

        <select
          v-if="field.type === 'select'"
          v-model="formData[field.name]"
          @change="
            updateValue(field.name, ($event.target as HTMLSelectElement).value)
          "
        >
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <input
          v-if="field.type === 'checkbox'"
          type="checkbox"
          v-model="formData[field.name]"
          @change="
            updateValue(field.name, ($event.target as HTMLInputElement).checked)
          "
        />

        <textarea
          v-if="field.type === 'textarea'"
          v-model="formData[field.name]"
          @input="
            updateValue(
              field.name,
              ($event.target as HTMLTextAreaElement).value
            )
          "
        ></textarea>
      </template>
    </div>

    <div class="form-actions">
      <button type="button" @click="saveForm" class="btn-save">
        Сохранить
      </button>
      <button type="button" @click="cancelForm" class="btn-cancel">
        Отмена
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use "../assets/styles/main.scss" as *;

.form-generator {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .form-group {
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
      margin-bottom: 5px;
    }

    input,
    select,
    textarea {
      padding: 8px;
      border-radius: $border-radius;
      border: 1px solid $secondary-color;
      font-size: 16px;
    }
  }

  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: center;

    button {
      padding: 10px 20px;
      border: none;
      border-radius: $border-radius;
      cursor: pointer;
      font-size: 16px;
    }

    button:first-child {
      background: $primary-color;
      color: white;
    }

    button:last-child {
      background: $secondary-color;
      color: white;
    }
  }
}
</style>
