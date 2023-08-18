import React from 'react';
import { DefaultAppContentProps } from './app-content.types';
import { Box } from '@mui/material';
import { LayoutContext } from '../context';

export const DefaultAppContent: React.FC<DefaultAppContentProps> = ({
  children,
}) => {
  const { drawerWidth } = React.useContext(LayoutContext);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingTop: `64px`,
        transition: { sm: 'width 0.5s' },
      }}
    >
      {children}
    </Box>
  );
};
