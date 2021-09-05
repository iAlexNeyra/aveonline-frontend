<template>
  <div class="grid grid-cols-3">
    <div class="col-span-2">
      <PromocionItem
        v-if="promo"
        :descripcion="promo.descripcion"
        :porcentaje="promo.porcentaje"
        :fecha_inicio="promo.fecha_inicio"
        :fecha_fin="promo.fecha_fin"
      />
      <div class="flex p-8">
        <h1 class="flex-grow text-3xl font-semibold text-green-500">
          Lista de compras
        </h1>
        <span class="block text-3xl font-semibold"
          >Total a Pagar: S/ {{ pagoTotal.toFixed(2) }}</span
        >
      </div>
      <MedicamentoList
        :medicamentos="items"
        :showRemoveButton="true"
        @onRemoveItem="quitarMedicamento"
      />
      <button v-show="showSaveButton" class="btn-save" @click="onSave">
        Registar Factura
      </button>
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
import { saveFactura } from "../api/aveonlineAPI.js";
import MedicamentoList from "../components/MedicamentoList.vue";
import { ref, watchEffect, computed } from "vue";
import useMedicamentos from "../componsable/useMedicamentos.js";
import usePromociones from "../componsable/usePromociones.js";
import PromocionItem from "../components/PromocionItem.vue";
import { useRouter } from "vue-router";
export default {
  name: "FacturaAdd",
  components: {
    MedicamentoList,
    PromocionItem,
  },
  setup() {
    const { medicamentos } = useMedicamentos();
    const { promociones } = usePromociones();
    const router = useRouter();

    const items = ref([]);
    const agregarMedicamento = (id) => {
      const medicamento = medicamentos.value.find((item) => item.id == id);
      items.value.push(medicamento);
    };

    const quitarMedicamento = (index) => {
      items.value = items.value.filter((item, i) => i != index);
    };

    const showSaveButton = computed(() => items.value.length > 0);
    const checkPromo = (item) => {
      const currentDate = new Date().toJSON().slice(0, 10);
      const from = new Date(item.fecha_inicio);
      const to = new Date(item.fecha_fin);
      const check = new Date(currentDate);
      return check >= from && check <= to;
    };

    const getPromocion = computed(() => {
      return promociones.value?.find(checkPromo) || false;
    });

    const pagoTotal = computed(() => {
      const total = items.value.reduce((accum, item) => item.precio + accum, 0);
      const descuento = promociones.value?.find(checkPromo)?.porcentaje || 0;
      const totalDescuento = (descuento * total) / 100;
      return total - totalDescuento;
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

    const onSave = () => {
      const data = {
        pago_total: pagoTotal.value,
        fecha_crear: new Date().toJSON().slice(0, 10),
        id_promocion: getPromocion.value.id || 0,
        id_medicamentos: items.value.map((item) => item.id),
      };
      saveFactura(data).then((response) => {
        if (response.ok) {
          router.go(-1);
        }
      });
    };

    return {
      search,
      medicamentos: medicamentosFilter,
      items,
      agregarMedicamento,
      pagoTotal,
      showSaveButton,
      promo: getPromocion,
      quitarMedicamento,
      onSave,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  @apply p-16;
}
</style>
