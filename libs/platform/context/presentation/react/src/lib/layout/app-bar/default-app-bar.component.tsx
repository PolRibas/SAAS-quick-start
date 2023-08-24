import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import { LayoutContext } from '../context';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
// import { AuthContext } from '../../auth.context';
import { getIconByName } from '@saas-quick-start/platform/design/assets/react';
import { AuthContext } from '../../auth.context';
import { useRouter } from 'next/router';

const MenuOpen = getIconByName('MenuOpen');
const Menu = getIconByName('Menu');
const SettingsIcon = getIconByName('AddLocation');
const UserIcon = getIconByName('ManageAccounts');

export const DefaultAppBar: React.FC = () => {
  const { drawerWidth, toggleSidebar, isSidebarOpen } =
    React.useContext(LayoutContext);

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const { selectedCompany, user } = React.useContext(AuthContext);
  const router = useRouter();

  const breadcrumbs = router.pathname
    .split('/')
    .filter((p) => p)
    .map((p, idx, array) => {
      let label;

      if (p.startsWith('[') && p.endsWith(']')) {
        const key = p.substring(1, p.length - 1); // Extrae el nombre del parámetro sin los corchetes
        label = router.query[key] ? router.query[key] : p; // Usa el valor del query si está disponible, de lo contrario usa p
      } else {
        label = p.split('-').join(' ');
      }

      return {
        label,
        href: '/' + array.slice(0, idx + 1).join('/'),
      };
    });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: drawerWidth },
        transition: '0.5s',
        top: '0.75rem',
        padding: '0px 20px',
        zIndex: 1,
        backgroundColor: 'transparent',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
          paddingY: '10px',
          backgroundColor: isActive ? 'white' : 'transparent',
          borderRadius: '0.5rem',
          boxShadow: isActive
            ? 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem'
            : undefined,
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontSize: '12px',
            }}
          >
            {!isSidebarOpen ? (
              <MenuOpen
                color="primary"
                onClick={toggleSidebar}
                sx={{
                  transform: !isSidebarOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.5s',
                  cursor: 'pointer',
                  marginRight: '10px',
                  width: '14px',
                  height: '14px',
                }}
              />
            ) : (
              <Menu
                color="primary"
                onClick={toggleSidebar}
                sx={{
                  transform: !isSidebarOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.5s',
                  cursor: 'pointer',
                  marginRight: '10px',
                  width: '14px',
                  height: '14px',
                }}
              />
            )}
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                fontSize: '12px',
              }}
            >
              {breadcrumbs.map((breadcrumb, idx) =>
                idx === breadcrumbs.length - 1 ? (
                  <Typography
                    key={breadcrumb.href}
                    color="text.primary"
                    sx={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {breadcrumb.label}
                  </Typography>
                ) : (
                  <Link
                    key={breadcrumb.href}
                    underline="hover"
                    onClick={() => {
                      router.push(breadcrumb.href);
                    }}
                    color="inherit"
                    sx={{
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {breadcrumb.label}
                  </Link>
                )
              )}
            </Breadcrumbs>
          </Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              marginTop: '4px',
            }}
            color="text.primary"
          >
            {selectedCompany?.name || user?.email || user?.username}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'flex-start',
          }}
        >
          {/* {selectedCompany?.company?.name ? (
            <Box>{selectedCompany?.company?.name}</Box>
          ) : null} */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {/* <ArrowBackIcon
            color="primary"
            onClick={toggleSidebar}
            sx={{
              transform: !isSidebarOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.5s',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          /> */}
          <SettingsIcon
            sx={{ marginRight: '10px', cursor: 'pointer' }}
            color="primary"
          />
          <UserIcon color="primary" sx={{ cursor: 'pointer' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
