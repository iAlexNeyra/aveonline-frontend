<template>
  <div class="grid grid-cols-3">
    <div class="col-span-2">
      <div class="flex p-8">
        <h1 class="flex-grow text-3xl font-semibold text-green-500">
          Simular de compra
        </h1>
        <div>
          <span class="block text-2xl font-semibold text-right"
            >Total: S/ {{ pagoTotal.toFixed(2) }}</span
          >
          <span class="block text-2xl font-semibold text-right"
            >Descuento: S/ {{ descuento.toFixed(2) }}</span
          >
          <span class="block text-2xl font-semibold text-right"
            >Total a Pagar: S/ {{ (pagoTotal - descuento).toFixed(2) }}</span
          >
        </div>
      </div>
      <div class="flex">
        <label for="fecha_compra" class="input-label">Fecha</label>
        <input type="date" class="w-64 input-control" v-model="fechaCompra" />
        <button class="btn-save" @click="onSimular">Simular</button>
      </div>
      <MedicamentoList
        :medicamentos="items"
        :showRemoveButton="true"
        @onRemoveItem="quitarMedicamento"
      />
    </div>
    <div class="p-2">
      <label class="input-label"> Buscar</label>
      <input
        v-model="search"
        type="text"
        placeholder="Buscar"
        class="w-3/4 input-control"
      />
      <MedicamentoList
        @onClickItem="agregarMedicamento"
        :showAddButton="true"
        :medicamentos="medicamentos"
      />
    </div>
  </div>
</template>

<script>
import { simularCompra } from "../api/aveonlineAPI.js";
import MedicamentoList from "../components/MedicamentoList.vue";
import { ref, watchEffect, computed } from "vue";
import useMedicamentos from "../componsable/useMedicamentos.js";
export default {
  name: "FacturaAdd",
  components: {
    MedicamentoList,
  },
  setup() {
    const { medicamentos } = useMedicamentos();

    const items = ref([]);
    const agregarMedicamento = (id) => {
      const medicamento = medicamentos.value.find((item) => item.id == id);
      items.value.push(medicamento);
    };

    const quitarMedicamento = (index) => {
      items.value = items.value.filter((item, i) => i != index);
    };

    const showSaveButton = computed(() => items.value.length > 0);

    const descuento = ref(0);
    const pagoTotal = computed(() => {
      const total = items.value.reduce((accum, item) => item.precio + accum, 0);
      return total;
    });

    const search = ref("");
    const medicamentosFilter = ref([]);
    watchEffect(() => {
      if (medicamentos.value) {
        medicamentosFilter.value = medicamentos.value.filter((medicamento) => {
          if (!search.value) {
            return true;
          }

          return (
            medicamento.nombre
              .toUpperCase()
              .indexOf(search.value.toUpperCase()) >= 0
          );
        });
      }
    });

    const fechaCompra = ref(new Date().toJSON().slice(0, 10));

    const onSimular = async () => {
      const id_medicamentos = items.value.map((item) => item.id);
      descuento.value = await simularCompra(fechaCompra.value, id_medicamentos);
    };

    return {
      search,
      medicamentos: medicamentosFilter,
      items,
      agregarMedicamento,
      pagoTotal,
      showSaveButton,
      quitarMedicamento,
      onSimular,
      fechaCompra,
      descuento,
    };
  },
};
</script>

<style scoped>
.container {
  @apply p-16;
}
</style>
