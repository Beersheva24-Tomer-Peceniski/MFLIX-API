export function isProtectedUser(email) {
    const protectedUsers = process.env.PROTECTED_USERS
        ? process.env.PROTECTED_USERS.split(',').map(e => e.trim().toLowerCase())
        : [];
    return protectedUsers.includes(email.toLowerCase());
}