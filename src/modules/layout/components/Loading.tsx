import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1b1b38' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loading;
