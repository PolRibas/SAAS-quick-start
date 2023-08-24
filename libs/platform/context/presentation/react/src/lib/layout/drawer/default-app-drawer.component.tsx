import * as React from 'react';
import { Box, Drawer, List, Toolbar, Divider } from '@mui/material';
import { LayoutContext } from '../context';
import { DrawerItemComponent } from './drawer-item.component';
import { UserMenuEntityInterface } from '@saas-quick-start/domain/user';

export const DefaultAppDrawer: React.FC = () => {
  const { userMenu, drawerWidth, isNavbarVisible, hideNavbar } =
    React.useContext(LayoutContext);

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transition: '0.5s',
      }}
    >
      <div>
        <Toolbar
          sx={{
            minHeight: '90px !important',
          }}
        />
        <Divider
          sx={{
            border: 0,
            height: '2px',
            marginBottom: '1rem',
            background:
              'linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.1), rgba(52, 71, 103, 0))',
          }}
        />
        <List sx={{ width: 'auto', transition: '0.5s' }}>
          {userMenu
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item: UserMenuEntityInterface, index: number) => (
              <React.Fragment key={`${item.code}_drawer_${index}`}>
                <DrawerItemComponent
                  {...item}
                  key={item.code + 'drawer' + index}
                />
              </React.Fragment>
            ))}
        </List>
      </div>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: 'transparent',
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={isNavbarVisible}
        onClose={hideNavbar}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            paddingX: '10px',
            background: (t) => t.palette.grey[100],
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        transitionDuration={0.5}
        sx={{
          display: { xs: 'none', sm: 'block' },
          background: 'blue',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            transition: '0.5s',
            paddingRight: '20px',
            paddingLeft: '20px',
            border: 'none',
            background: 'transparent',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
