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

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        PokeDex
      </h3>
      <UButton
          v-if="!loggedIn"
          to="/api/auth/google"
          icon="icon-social-google"
          label="Login with Google"
          color="black"
          external
      />
      <UButton
          v-else
          @click="logout"
          icon="i-heroicons-logout"
          label="Logout"
          color="black"
      />
    </template>
  </UCard>
</template>
