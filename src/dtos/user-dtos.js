module.exports = {
  toDefaultUserDto: (user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    fullName: user.full_name || null,
    avatarUrl: user.avatar_url || null,
    lastLogin: user.last_login || null,
    lastIp: user.lastIp || null,
    verified: !!user.verified,
    blocked: !!user.blocked,
    notifications: !!user.notifications,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  }),

  toPayloadUserDto: (user) => ({
    id: user.id,
    email: user.email,
    verified: !!user.verified,
  }),
};
