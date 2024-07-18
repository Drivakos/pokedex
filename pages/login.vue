<script setup lang="ts">
const { loggedIn } = useUserSession()
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
          to="/"
          icon="i-heroicons-list-bullet"
          label="Go to homepage"
          color="black"
      />
    </template>
  </UCard>
</template>