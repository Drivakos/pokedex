// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      "@nuxt/image",
      '@nuxtjs/apollo'
  ],
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://localhost:8080/v1/graphql',
                httpLinkOptions: {
                    headers: {
                        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                    }
                }
            }
        }
    },
})