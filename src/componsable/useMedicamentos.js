import { watchEffect, ref } from "vue";
import { getMedicamentos } from "../api/aveonlineAPI";
const useMedicamentos = () => {
  const medicamentos = ref(null);

  watchEffect(async () => {
    getMedicamentos().then((data) => {
      medicamentos.value = data;
    });
  });

  return {
    medicamentos,
  };
};

export default useMedicamentos;
