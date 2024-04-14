// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore - ignore TypeScript errors
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      "@nuxt/image",
      '@nuxtjs/apollo',
      'nuxt-mongoose'
  ],
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://localhost:8080/v1/graphql',
                httpLinkOptions: {
                    headers: {
                        //@ts-ignore
                        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                    }
                }
            }
        }
    },
    mongoose: {
        uri: process.env.MONGODB_URI,
        options: {},
        modelsDir: 'models'
    },
    runtimeConfig: {
        MONGODB_URI: process.env.MONGODB_URI
    }
})