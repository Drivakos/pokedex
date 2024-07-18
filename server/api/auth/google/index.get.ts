export default oauth.googleEventHandler({
    config: {
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]
    },
    async onSuccess(event, { user, tokens }) {
        await setUserSession(event, {
            user: {
                googleId: user.id,
                email: user.email,
                name: user.name
            }
        })
        return sendRedirect(event, '/')
    },
    async onError(event, error) {
        return sendRedirect(event, '/')
    }
})