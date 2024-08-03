// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
    modules: [
        "@nuxt/image",
        '@nuxtjs/apollo',
        'nuxt-mongoose',
        "nuxt-auth-utils",
        "@nuxt/ui",
        "@nuxtjs/robots"
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
        MONGODB_URI: process.env.MONGODB_URI,
        session: {
            name: 'sessionId',
            password: process.env.SESSION_PASSWORD,
            cookie: {
                sameSite: 'lax'
            }
        },
        oath: {
            google: {
                clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
                clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET
            }
        }
    },
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
    publicRuntimeConfig: {
        NODE_ENV: process.env.NODE_ENV,
    },
    site: { indexable: false }
})