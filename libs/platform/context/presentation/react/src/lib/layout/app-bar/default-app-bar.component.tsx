import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import { LayoutContext } from '../context';
import { Box } from '@mui/material';
// import { AuthContext } from '../../auth.context';
import {
  getIconByName,
} from '@saas-quick-start/platform/design/assets/react';
import { IconNames } from '@saas-quick-start/platform/design/assets/constants';


// const ArrowBackIcon = getIconByName(IconNames.ARROW_BACK);
const SettingsIcon = getIconByName(IconNames.SETTINGS);
const UserIcon = getIconByName(IconNames.USER);

export const DefaultAppBar: React.FC = () => {
  const {
    drawerWidth,
    // toggleSidebar,
    // isSidebarOpen
  } = React.useContext(LayoutContext);

  // const { selectedCompany } = React.useContext(AuthContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: drawerWidth },
        transition: '0.5s',
        backgroundColor: (theme) => theme.palette.primary.contrastText,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* <ArrowBackIcon
          color="primary"
          onClick={toggleSidebar}
          sx={{
            transform: !isSidebarOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.5s',
            cursor: 'pointer',
          }}
        /> */}
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
