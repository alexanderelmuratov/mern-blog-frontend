import React from 'react';
import { Box, Stack, Skeleton } from '@mui/material';

export default function PostSkeleton() {
  return (
    <Box>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Box>
          <Box>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ marginRight: 10 }}
            />
            <Box>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </Box>
          </Box>
          <Box>
            <Skeleton variant="text" width="80%" height={45} />
            <Box>
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
