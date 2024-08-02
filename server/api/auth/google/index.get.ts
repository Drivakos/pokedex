import User from '~/server/models/User.model';

export default oauth.googleEventHandler({
    config: {
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ]
    },
    async onSuccess(event, { user, tokens }) {
        try {
            let existingUser = await User.findOne({ googleId: user.id });

            if (!existingUser) {
                existingUser = new User({
                    googleId: user.id,
                    email: user.email,
                    name: user.name,
                    profilePicture: user.picture
                });
                await existingUser.save();
            }

            await setUserSession(event, {
                user: {
                    googleId: existingUser.googleId,
                    email: existingUser.email,
                    name: existingUser.name,
                    lastLoggedInAt: new Date()
                },
            });

            return sendRedirect(event, '/');
        } catch (error) {
            console.error('Error in onSuccess handler:', error);
            return sendRedirect(event, '/');
        }
    },
    async onError(event, error) {
        console.error('Google OAuth error:', error);
        return sendRedirect(event, '/');
    }
});