<template>
  <ul>
    <h1 class="m-5 text-3xl font-medium text-center">Lista de Promociones</h1>
    <router-link to="/promociones/add" class="btn">Nuevo</router-link>
    <li v-for="item in promociones" :key="item.id">
      <PromocionItem
        :descripcion="item.descripcion"
        :porcentaje="item.porcentaje"
        :fecha_inicio="item.fecha_inicio"
        :fecha_fin="item.fecha_fin"
      />
    </li>
  </ul>
</template>
<script>
import PromocionItem from "./PromocionItem.vue";
import { getPromociones } from "../api/aveonlineAPI.js";
import { ref, onMounted } from "vue";
export default {
  name: "PromocionList",
  components: {
    PromocionItem,
  },
  setup() {
    const promociones = ref(null);
    const fetchData = () => {
      getPromociones().then((data) => {
        promociones.value = data;
      });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      promociones,
      fetchData,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  display: block;
  @apply bg-green-500 text-white p-2 m-5 rounded rounded-sm w-64 text-center;
}
</style>
