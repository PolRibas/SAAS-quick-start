import React from 'react';
import { LayoutProvider } from './context';
import { AppBarSelector } from './app-bar';
import { AppDrawerSelector } from './drawer';
import { AppContentSelector } from './content';
import { Box } from '@mui/material';
import { UserMenuEntityInterface } from '@saas-quick-start/domain/user';

interface LayoutProps {
  children: React.ReactNode;
  userMenu: UserMenuEntityInterface[];
}

export const DesignLayout = ({ children, userMenu }: LayoutProps) => {
  return (
    <LayoutProvider userMenu={userMenu}>
      <Box sx={{ display: 'flex', transition: '0.5s' }}>
        <AppBarSelector />
        <AppDrawerSelector />
        <AppContentSelector>{children}</AppContentSelector>
      </Box>
    </LayoutProvider>
  );
};
