import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  useTheme,
  Divider,
} from '@mui/material';
import { getIconByName } from '@saas-quick-start/platform/design/assets/react';
import { IconNames } from '@saas-quick-start/platform/design/assets/constants';
import { LayoutContext } from '../context';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { DrawerItemComponent } from './drawer-item.component';

interface ItemNav {
  code: string;
  icon?: string;
  link?: string;
  parentId?: string;
  children?: ItemNav[];
  exact?: boolean;
  child?: boolean;
}

export const DefaultAppDrawer: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState<{ [key: string]: boolean }>(
    {}
  );
  const { userMenu, drawerWidth, isSidebarOpen } =
    React.useContext(LayoutContext);
  const translation = useTranslations('menu');
  const { push, pathname } = useRouter();
  const theme = useTheme();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const DrawerMenu = React.useMemo(() => {
    return userMenu.reduce((acc: ItemNav[], item: ItemNav) => {
      if (item.parentId) {
        const parent = acc.find((i) => i.code === item.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(item);
        } else {
          acc.push({
            code: item.parentId,
            children: [item],
          });
        }
      } else {
        const findItem = acc.find((i) => i.code === item.code);
        if (findItem) {
          Object.assign(findItem, item);
        } else {
          acc.push(item);
        }
      }
      return acc;
    }, []);
  }, [userMenu]);

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
          {DrawerMenu.map((item: ItemNav, index: number) => (
            <React.Fragment key={`${item.code}_drawer_${index}`}>
              <DrawerItemComponent
                {...item}
                exact={true}
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
        open={mobileOpen}
        onClose={handleDrawerToggle}
        transitionDuration={0.5}
        ModalProps={{ keepMounted: true }}
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
