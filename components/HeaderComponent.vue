<script setup lang="ts">

</script>

<template>
<div class="header-wrapper">
  <div class="test"></div>
  <nuxt-link to="/">
    Home
  </nuxt-link>
  <nuxt-link to="/login">
    login
  </nuxt-link>
</div>
</template>

<style scoped>
.header-wrapper {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 140px;
  background: #B81728;
  .test {
    &::after {
      content: '';
      width: 15vw;
      height: 15vw;
      display: block;
      position: absolute;
      background: #fbfbfb;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: calc(-10vw);
      border-radius: 50%;
    }
  }
}
</style>