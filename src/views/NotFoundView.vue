<template>
  <div class="not-found-view">
    <section class="not-found-card">
      <span>Erro 404</span>

      <h1>Página não encontrada</h1>

      <p>
        A página que você tentou acessar não existe ou pode ter sido removida.
        Volte para a loja e continue navegando pelos produtos.
      </p>

      <div class="not-found-actions">
        <RouterLink to="/" class="primary-action">
          Voltar para início
        </RouterLink>

        <RouterLink to="/produtos" class="secondary-action">
          Ver produtos
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped src="./NotFoundView.css"></style>