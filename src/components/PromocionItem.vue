<template>
  <div class="item">
    <div class="container">
      <div class="flex-grow">
        <h2 class="title">{{ descripcion }}</h2>
        <h2 class="location">
          Valida del: {{ fecha_inicio }} al {{ fecha_fin }}
        </h2>
      </div>
      <div class="">
        <span class="text-3xl font-bold">{{ porcentaje }}% de descuento</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromocionItem",
  props: {
    id: Number,
    descripcion: String,
    porcentaje: Number,
    fecha_inicio: String,
    fecha_fin: String,
  },
};
</script>

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
</style>
