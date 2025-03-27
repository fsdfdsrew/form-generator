import { createStore } from "vuex";

interface State {
  formData: Record<string, any>;
}

const store = createStore<State>({
  state: {
    formData: {},
  },
  mutations: {
    setFormData(
      state,
      { formKey, data }: { formKey: string; data: Record<string, any> }
    ) {
      if (!state.formData[formKey]) {
        state.formData[formKey] = {};
      }
      state.formData[formKey] = { ...state.formData[formKey], ...data };
      sessionStorage.setItem("formData", JSON.stringify(state.formData));
    },
    resetFormData(state, formKey) {
      state.formData = { ...state.formData, [formKey]: {} };
      sessionStorage.setItem("formData", JSON.stringify(state.formData));
    },

    restoreFormData(state) {
      const savedData = JSON.parse(sessionStorage.getItem("formData") || "{}");
      state.formData = savedData;
    },
  },
  actions: {
    saveFormData({ commit }, data: Record<string, any>) {
      commit("setFormData", data);
      console.log("Данные формы сохранены в Vuex:", data);
    },
  },
  getters: {
    getFormData: (state) => state.formData,
  },
});

export default store;
