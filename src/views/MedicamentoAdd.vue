<template>
  <div class="container">
    <h1 class="mb-12 text-2xl font-semibold text-green-500">
      Nuevo Medicamento
    </h1>
    <div
      class="p-4 mb-2 text-red-900 bg-red-300 rounded rounded-lg"
      v-show="error"
    >
      {{ error }}
    </div>
    <form>
      <div>
        <label for="nombre" class="input-label">Nombre: </label>
        <input
          type="text"
          name="nombre"
          class="w-1/2 input-control"
          placeholder="Nombre"
          v-model="medicamento.nombre"
          required="required"
        />
      </div>
      <div>
        <label for="precio" class="input-label">Precio: </label>
        <input
          type="number"
          name="precio"
          class="input-control"
          placeholder="Precio"
          v-model.number="medicamento.precio"
        />
      </div>
      <div>
        <label for="ubicacion" class="input-label">Ubicacion: </label>
        <input
          type="text"
          name="ubicacion"
          class="w-1/2 input-control"
          placeholder="Ubicación"
          v-model="medicamento.ubicacion"
        />
      </div>
      <div>
        <button @click="onSave" type="button" class="btn-save">Grabar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { saveMedicamento } from "../api/aveonlineAPI.js";
export default {
  name: "MedicamentoAdd",
  data() {
    return {
      medicamento: {
        nombre: "",
        precio: 0,
        ubicacion: "",
      },
      error: "",
    };
  },
  methods: {
    onSave() {
      saveMedicamento(JSON.stringify(this.medicamento)).then((response) => {
        if (response.ok) {
          this.$router.go(-1);
          return;
        }
        response.json().then((data) => {
          this.error = data;
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  @apply p-16;
}
</style>
