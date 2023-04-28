import React from 'react';
import { Avatar } from '@mui/material';

export default function UserAvatar({ user, style }) {
  const stringAvatar = name => ({
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  });

  return user.avatarUrl ? (
    <Avatar alt={user.fullName} src={user.avatarUrl} sx={style} />
  ) : (
    <Avatar {...stringAvatar(user.fullName)} sx={style} />
  );
}
