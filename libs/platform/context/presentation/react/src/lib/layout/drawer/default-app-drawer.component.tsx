import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { LayoutContext } from '../context';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import {
  getIconByName,
} from '@saas-quick-start/platform/design/assets/react';
import { IconNames } from '@saas-quick-start/platform/design/assets/constants';

// import { Divider } from '@mui/material';

// const SettingsIcon = getIconByName(IconNames.SETTINGS);

export const DefaultAppDrawer = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { userMenu, drawerWidth, isSidebarOpen } =
    React.useContext(LayoutContext);
  const translation = useTranslations('menu');
  const { push, pathname } = useRouter();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
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
        <Toolbar />
        <List sx={{ width: drawerWidth, transition: '0.5s' }}>
          {userMenu.map((item) => {
            const IconComponent = userMenu
              ? getIconByName(item.icon as IconNames)
              : null;
            const isActive = item.link && pathname.startsWith(item.link);
            return (
              <ListItem
                key={item.code}
                disablePadding
                onClick={() => item.link && push(item.link)}
                sx={{
                  height: '48px',
                  backgroundColor: isActive
                    ? theme.palette.primary.dark
                    : undefined,
                  borderLeft: isActive
                    ? `4px solid ${theme.palette.secondary.main}}`
                    : '4px solid transparent',
                  width: drawerWidth,
                  overflow: 'hidden',
                  transition: 'width 0.5s',
                }}
              >
                <ListItemButton>
                  {IconComponent ? (
                    <ListItemIcon>
                      <IconComponent color="secondary" />
                    </ListItemIcon>
                  ) : null}
                  {isSidebarOpen ? (
                    <ListItemText
                      sx={{
                        maxWidth: drawerWidth - 50,
                        transition: 'maxWidth 0.5s ease-in-out',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        color: theme.palette.secondary.main,
                      }}
                      primary={translation(item.code)}
                    />
                  ) : null}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {/* <Divider sx={{
          backgroundColor: theme.palette.secondary.main,
        }} /> */}
      </div>
      {/* <div>
        <Divider />
        <List sx={{ width: drawerWidth, transition: '0.5s' }}>
          <ListItem
            disablePadding
            sx={{
              borderLeft: '4px solid transparent',
              maxWidth: drawerWidth,
              height: 45,
              overflow: 'hidden',
              transition: '0.5s',
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              {isSidebarOpen ? (
                <ListItemText
                  sx={{
                    maxWidth: drawerWidth - 50,
                    transition: 'maxWidth 0.5s ease-in-out',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                  primary={translation('settings')}
                />
              ) : null}
            </ListItemButton>
          </ListItem>
        </List>
      </div> */}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: 'primary',
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        transitionDuration={0.5}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          background: 'blue',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            transition: '0.5s',
            background: theme.palette.primary.main,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        color="primary.main"
        transitionDuration={0.5}
        sx={{
          display: { xs: 'none', sm: 'block' },
          background: 'blue',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            transition: '0.5s',
            background: theme.palette.primary.main,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
