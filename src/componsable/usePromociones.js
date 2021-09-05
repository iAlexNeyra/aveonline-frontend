import { watchEffect, ref } from "vue";
import { getPromociones } from "../api/aveonlineAPI";
const usePromociones = () => {
  const promociones = ref(null);

  watchEffect(async () => {
    getPromociones().then((data) => {
      promociones.value = data;
    });
  });

  return {
    promociones,
  };
};

export default usePromociones;
