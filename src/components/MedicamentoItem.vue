<template>
  <div class="item">
    <div class="container">
      <div class="flex-grow">
        <h2 class="title">{{ nombre }}</h2>
        <h2 class="location">Ubicación: {{ ubicacion }}</h2>
        <button @click="notify" v-if="showAddButton" class="btn-add">
          + Agregar
        </button>
      </div>
      <div class="w-32">
        <span class="text-3xl font-bold w-9">S/ {{ precio }}</span>
      </div>
      <div v-if="showRemoveButton">
        <button
          class="px-3 py-2 text-white bg-red-500 rounded-2xl"
          @click="remove"
        >
          - Quitar
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "MedicamentoItem",
  props: {
    value: Number,
    index: Number,
    nombre: String,
    precio: Number,
    ubicacion: String,
    showAddButton: Boolean,
    showRemoveButton: Boolean,
  },
  emits: ["onClick", "onRemove"],
  setup(props, { emit }) {
    const id = ref(props.value);
    const index = ref(props.index);
    const notify = () => {
      emit("onClick", id.value);
    };

    const remove = () => {
      emit("onRemove", index.value);
    };

    return {
      notify,
      remove,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  @apply p-8 pl-16 bg-gray-100 rounded-lg border border-gray-200 m-2;
}
.title {
  @apply font-bold text-2xl text-green-500;
}

.location {
  @apply font-bold text-lg;
}

.container {
  display: flex;
}
.btn-add {
  @apply mt-1 bg-green-500 p-1 m-1 rounded-lg px-5 text-white font-bold;
}
</style>
