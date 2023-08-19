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

  const DrawerItem: React.FC<ItemNav> = (item) => {
    const IconComponent = item.icon
      ? getIconByName(item.icon as IconNames)
      : null;
    const isActive = item.exact
      ? pathname === item.link
      : item.link && pathname.startsWith(item.link);

    return (
      <ListItemButton
        key={item.code}
        onClick={() => {
          if (item.children) {
            setMenuOpen((prevState) => ({
              ...prevState,
              [item.code]: !prevState[item.code],
            }));
          } else if (item.link) {
            push(item.link);
          }
        }}
        sx={{
          height: '48px',
          backgroundColor: isActive ? theme.palette.primary.dark : undefined,
          borderLeft: isActive
            ? `4px solid ${theme.palette.secondary.main}`
            : '4px solid transparent',
          width: drawerWidth,
          overflow: 'hidden',
          transition: 'width 0.5s',
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
            width: drawerWidth,
            overflow: 'hidden',
            transition: 'width 0.5s',
          },
        }}
      >
        {IconComponent && (
          <ListItemIcon>
            <IconComponent color="secondary" />
          </ListItemIcon>
        )}
        {isSidebarOpen && (
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
        )}
        {isSidebarOpen && item.children ? (
          menuOpen[item.code] ? (
            <ExpandLess color="secondary" />
          ) : (
            <ExpandMore color="secondary" />
          )
        ) : null}
      </ListItemButton>
    );
  };

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
        <Toolbar />
        <List sx={{ width: drawerWidth, transition: '0.5s' }}>
          {DrawerMenu.map((item: ItemNav) => (
            <>
              {item.children && <Divider color="primary" />}

              <DrawerItem {...item} exact={true} />
              {item.children && (
                <Collapse in={menuOpen[item.code]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child: ItemNav) => (
                      <DrawerItem {...child} child />
                    ))}
                  </List>
                </Collapse>
              )}
            </>
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
        backgroundColor: 'primary',
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
            background: theme.palette.primary.main,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
