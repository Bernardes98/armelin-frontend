<template>
  <div class="simple-page">
    <section class="simple-page-content">
      <p>Sobre</p>
      <h1>Armelin Perfumes</h1>

      <span>
        A Armelin Perfumes nasce com o objetivo de oferecer fragrâncias marcantes, elegantes e
        acessíveis para diferentes estilos e momentos.
      </span>
    </section>
  </div>
</template>

<style scoped>
.simple-page {
  min-height: 60vh;
  background: #fffaf6;
}

.simple-page-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 90px 24px;
}

.simple-page-content p {
  margin: 0 0 10px;
  color: #9a6a45;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.simple-page-content h1 {
  margin: 0;
  color: #1f1712;
  font-size: clamp(42px, 5vw, 68px);
  line-height: 1;
}

.simple-page-content span {
  display: block;
  max-width: 680px;
  margin-top: 20px;
  color: #6d5a4c;
  font-size: 18px;
  line-height: 1.7;
}
</style>