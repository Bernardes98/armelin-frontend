<template>
  <div class="home-view">
    <HeroSection />

    <section class="featured-section">
      <div class="section-header">
        <p>Produtos selecionados</p>
        <h2>Fragrâncias em destaque</h2>
        <span>
          Uma curadoria inicial com perfumes marcantes para apresentar a proposta da loja.
        </span>
      </div>

      <div class="products-grid">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="cartStore.addProduct"
        />
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
import HeroSection from '../components/home/HeroSection.vue'
import ProductCard from '../components/product/ProductCard.vue'
import { products } from '../data/products'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const featuredProducts = products.slice(0, 4)
</script>

<style scoped src="./HomeView.css"></style>