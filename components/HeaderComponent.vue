<template>
<div class="header-wrapper">
  <div class="test"></div>
  <nuxt-link to="/">
    Home
  </nuxt-link>
  <nuxt-link to="/login" v-if="!loggedIn">
    login
  </nuxt-link>
  <UButton
      v-else
      @click="logout"
      icon="i-heroicons-logout"
      label="Logout"
      color="black"
  />
</div>
</template>

<script setup lang="ts">
const { loggedIn, clear } = useUserSession();
async function logout() {
  try {
    await fetch('/api/auth/google/logout', {
      method: 'POST',
    });
    await clear();
  } catch (error) {
    console.error('Error logging out:', error);
  }
}
</script>

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
      background: #d4ecf3;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: calc(-10vw);
      border-radius: 50%;
    }
  }
}
</style>