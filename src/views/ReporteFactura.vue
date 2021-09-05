<template>
  <div class="p-10">
    <div class="mb-10">
      <label for="from" class="input-label">Desde</label>
      <input type="date" class="input-control" v-model="from" />
      <label for="from" class="input-label">Hasta</label>
      <input type="date" class="bg-green-500 input-control" v-model="to" />
      <button class="btn-filtrar" @click="fetchData">Filtrar</button>
    </div>
    <vue-echarts :option="options" style="height: 500px" ref="chart" />
  </div>
</template>

<script>
import { VueEcharts } from "vue3-echarts";
import { ref } from "vue";
import { format } from "date-fns";
import { getFacturas } from "../api/aveonlineAPI.js";
export default {
  name: "FacturaReporte",
  components: {
    VueEcharts,
  },
  setup() {
    const options = ref({});
    const from = ref(format(new Date(), "yyyy-MM-dd"));
    const to = ref(format(new Date(), "yyyy-MM-dd"));

    const fetchData = async () => {
      const data = await getFacturas(from.value, to.value);
      const dataset = data.reduce((accum, factura) => {
        accum[factura.fecha_crear] =
          accum[factura.fecha_crear] + factura.pago_total || factura.pago_total;
        return accum;
      }, {});
      options.value = {
        title: {
          text: "Reporte de facturas",
        },
        tooltip: {},

        xAxis: {
          data: Object.keys(dataset),
        },
        yAxis: {},
        series: [
          {
            name: "Facturas",
            type: "bar",
            data: Object.values(dataset),
          },
        ],
        color: ["#10b981"],
      };
    };

    return {
      fetchData,
      options,
      from,
      to,
    };
  },
};
</script>
<style scoped>
.btn-filtrar {
  @apply p-2 px-10 ml-4 text-green-500 border border-green-500 rounded ring-2 ring-green-500 font-semibold hover:bg-green-50;
}
</style>
