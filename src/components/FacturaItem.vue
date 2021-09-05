<template>
  <div class="item">
    <div class="container">
      <div class="flex-grow">
        <h2 class="location">Fecha de compra: {{ fecha_crear }}</h2>
      </div>
      <div class="">
        <span class="text-3xl font-bold">S/ {{ pago_total.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromocionItem",
  props: {
    id: Number,
    fecha_crear: String,
    pago_total: Number,
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
