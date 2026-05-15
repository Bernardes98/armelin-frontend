<template>
  <div class="home-view">
    <ProductCarousel
      kicker="Produtos selecionados"
      title="Fragrâncias em destaque"
      description="Uma curadoria inicial com perfumes marcantes para apresentar a proposta da loja."
      :products="featuredProducts"
      @add-to-cart="cartStore.addProduct"
    />

    <section class="collections-section">
      <div class="section-header">
        <p>Explore por estilo</p>
        <h2>Escolha sua fragrância ideal</h2>
        <span>
          Navegue por categorias e encontre perfumes femininos, masculinos e compartilháveis.
        </span>
      </div>

      <div class="collection-grid">
        <RouterLink to="/produtos?categoria=Feminino" class="collection-card">
          <strong>Femininos</strong>
          <span>Fragrâncias elegantes, florais, doces e sofisticadas.</span>
        </RouterLink>

        <RouterLink to="/produtos?categoria=Masculino" class="collection-card">
          <strong>Masculinos</strong>
          <span>Perfumes intensos, amadeirados, frescos e marcantes.</span>
        </RouterLink>

        <RouterLink to="/produtos?categoria=Unissex" class="collection-card">
          <strong>Unissex</strong>
          <span>Notas versáteis para diferentes estilos e momentos.</span>
        </RouterLink>
      </div>
    </section>

    <section class="benefits-section">
      <div class="benefit-card">
        <strong>Entrega rápida</strong>
        <span>Envio para todo o Brasil com acompanhamento do pedido.</span>
      </div>

      <div class="benefit-card">
        <strong>Compra segura</strong>
        <span>Ambiente preparado para vendas online com segurança.</span>
      </div>

      <div class="benefit-card">
        <strong>Fragrâncias especiais</strong>
        <span>Produtos selecionados para diferentes estilos e ocasiões.</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import ProductCarousel from '../components/product/ProductCarousel.vue'
import { products } from '../data/products'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const featuredProducts = products
</script>

<style scoped src="./HomeView.css"></style>