<template>
  <div>
    <h1 class="m-5 text-3xl font-medium text-center">Lista de medicamentos</h1>
    <router-link to="/medicamentos/add" class="btn">Nuevo</router-link>
    <MedicamentoList :medicamentos="medicamentos" />
  </div>
</template>

<script>
import MedicamentoList from "../components/MedicamentoList.vue";
import useMedicamentos from "../componsable/useMedicamentos.js";
export default {
  name: "Medicamentos",
  setup() {
    const { medicamentos } = useMedicamentos();
    return {
      medicamentos,
    };
  },
  components: {
    MedicamentoList,
  },
};
</script>

<style scoped>
.btn {
  display: block;
  @apply bg-green-500 text-white p-2 m-5 rounded rounded-sm w-64 text-center;
}
</style>
