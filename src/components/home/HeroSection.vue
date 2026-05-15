<template>
  <section class="hero-section">
    <div class="hero-content">
      <p class="hero-kicker">Lançamento coleção exclusiva</p>

      <h1>Perfumes marcantes para todos os momentos</h1>

      <p class="hero-description">
        Descubra fragrâncias elegantes, intensas e sofisticadas para transformar sua presença
        em uma assinatura inesquecível.
      </p>

      <div class="hero-actions">
        <RouterLink to="/produtos" class="primary-button">Conhecer produtos</RouterLink>
        <RouterLink to="/sobre" class="secondary-button">Sobre a marca</RouterLink>
      </div>
    </div>

    <div class="hero-card">
      <div class="hero-card-info">
        <span>Produto destaque</span>
        <h2>Fine Silk</h2>
        <p>Luxuoso e Aveludado</p>
      </div>

      <img
        src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
        alt="Perfume Fine Silk"
      />
    </div>
  </section>
</template>

<style scoped src="./HeroSection.css"></style>