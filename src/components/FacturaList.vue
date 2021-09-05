<template>
  <ul>
    <h1 class="m-5 text-4xl font-medium text-center">Lista de Facturas</h1>
    <div class="flex">
      <router-link to="/facturas/add" class="btn">Nueva</router-link>
      <router-link to="/facturas/simular" class="btn">Simular</router-link>
    </div>
    <div>
      <label for="from" class="input-label">Desde</label>
      <input type="date" class="input-control" v-model="from" />
      <label for="from" class="input-label">Hasta</label>
      <input type="date" class="input-control" v-model="to" />
      <button class="btn-filtrar" @click="fetchData">Filtrar</button>
    </div>
    <li v-for="item in facturas" :key="item.id">
      <FacturaItem
        :fecha_crear="item.fecha_crear"
        :pago_total="item.pago_total"
      />
    </li>
  </ul>
</template>
<script>
import FacturaItem from "./FacturaItem.vue";
import { getFacturas } from "../api/aveonlineAPI.js";
import { ref, onMounted } from "vue";
import { format } from "date-fns";
export default {
  name: "PromocionList",
  components: {
    FacturaItem,
  },
  data() {
    return {};
  },
  setup() {
    const from = ref(null);
    const to = ref(null);
    from.value = format(new Date(), "yyyy-MM-dd");
    to.value = format(new Date(), "yyyy-MM-dd");
    const facturas = ref(null);
    const fetchData = () => {
      getFacturas(from.value, to.value).then((data) => {
        facturas.value = data;
      });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      facturas,
      fetchData,
      from,
      to,
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
.btn-filtrar {
  @apply p-2 px-10 ml-4 text-green-500 border border-green-500 rounded ring-2 ring-green-500 font-semibold hover:bg-green-50;
}
</style>
