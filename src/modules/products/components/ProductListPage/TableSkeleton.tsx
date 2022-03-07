import { Box, Skeleton } from '@mui/material';
import React from 'react';

const TableSkeleton = () => {
  const array = Array.from({ length: 20 });
  return (
    <>
      {array.map((item: any, index) => {
        return (
          <Box key={index} sx={{ width: '100%', height: '50px', display: 'flex' }}>
            <Skeleton sx={{ height: '100%', width: '5%', marginRight: '10px' }} />
            <Skeleton sx={{ height: '100%', width: '30%', marginRight: '10px' }} />
            <Skeleton sx={{ height: '100%', width: '20%', marginRight: '10px' }} />
            <Skeleton sx={{ height: '100%', width: '10%', marginRight: '10px' }} />
            <Skeleton sx={{ height: '100%', width: '15%', marginRight: '10px' }} />
            <Skeleton sx={{ height: '100%', width: '10%' }} />
          </Box>
        );
      })}
    </>
  );
};

export default TableSkeleton;
