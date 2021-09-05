<template>
  <div class="container">
    <h1 class="mb-12 text-2xl font-semibold text-green-500">Nuevo Promocion</h1>
    <form>
      <div
        class="p-4 mb-2 text-red-900 bg-red-300 rounded rounded-lg"
        v-show="error"
      >
        {{ error }}
      </div>
      <div>
        <label for="descripcion" class="input-label">Descripcion: </label>
        <input
          type="text"
          name="descripcion"
          class="w-1/2 input-control"
          placeholder="Nombre"
          v-model="promocion.descripcion"
        />
      </div>
      <div>
        <label for="porcentaje" class="input-label">Porcentaje: </label>
        <input
          type="number"
          name="porcentaje"
          class="input-control"
          placeholder="%"
          v-model.number="promocion.porcentaje"
        />
      </div>
      <div>
        <label for="fecha_inicio" class="input-label">FechaInicio: </label>
        <input
          type="date"
          name="fecha_inicio"
          class="input-control"
          v-model="promocion.fecha_inicio"
        />
      </div>
      <div>
        <label for="fecha_fin" class="input-label">Fecha Fin: </label>
        <input
          type="date"
          name="fecha_fin"
          class="input-control"
          v-model="promocion.fecha_fin"
        />
      </div>
      <div>
        <button @click="onSave" type="button" class="btn-save">Grabar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { savePromocion } from "../api/aveonlineAPI.js";
export default {
  name: "PromocionAdd",
  data() {
    return {
      error: "",
      promocion: {
        descripcion: "",
        porcentaje: 0,
        fecha_inicio: "",
        fecha_fin: "",
      },
    };
  },
  methods: {
    onSave() {
      savePromocion(JSON.stringify(this.promocion)).then((response) => {
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
