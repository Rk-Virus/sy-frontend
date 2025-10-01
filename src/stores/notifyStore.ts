import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export default defineStore("notify", () => {
  const start: Ref<string | null> = ref(null);
  const error: Ref<string | null> = ref(null);
  const warn: Ref<string | null> = ref(null);
  const success: Ref<string | null> = ref(null);
  const alert: Ref<string | null> = ref(null);

  const setStart = (data: string | null) => {
    start.value = data;
    setTimeout(() => {
      start.value = null;
    }, 10000);
  };

  const setError = (data: string | null) => {
    error.value = data;
    setTimeout(() => {
      error.value = null;
    }, 10000);
  };

  const setWarn = (data: string | null) => {
    warn.value = data;
    setTimeout(() => {
      warn.value = null;
    }, 10000);
  };

  const setSuccess = (data: string | null) => {
    success.value = data;
    setTimeout(() => {
      success.value = null;
    }, 10000);
  };

  const setAlert = (data: string | null) => {
    alert.value = data;
    setTimeout(() => {
      alert.value = null;
    }, 10000);
  };

  const clearAll = () => {
    start.value = null;
    error.value = null;
    warn.value = null;
    success.value = null;
    alert.value = null;
  };

  const viewDialog: Ref<string> = ref('');

  return {
    start,
    error,
    warn,
    success,
    alert,
    setStart,
    setError,
    setWarn,
    setSuccess,
    setAlert,
    clearAll,
    viewDialog,
  };
});
