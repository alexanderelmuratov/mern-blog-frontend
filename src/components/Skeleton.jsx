import React from 'react';
import { Box, Stack, Skeleton } from '@mui/material';

export default function PostSkeleton() {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        marginBottom: 2,
        bgcolor: '#fff',
        borderRadius: '4px',
      }}
    >
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={426} />
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ marginRight: 2 }}
            />
            <Box>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </Box>
          </Box>
          <Box>
            <Skeleton variant="text" width="80%" height={45} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
