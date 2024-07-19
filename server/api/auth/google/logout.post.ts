export default defineEventHandler(async (event) => {
    try {
        await clearUserSession(event);
        return sendRedirect(event, '/');
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});