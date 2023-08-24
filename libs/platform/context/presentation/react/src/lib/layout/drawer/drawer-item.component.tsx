import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Card,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IconNames } from '@saas-quick-start/platform/design/assets/constants';
import { getIconByName } from '@saas-quick-start/platform/design/assets/react';
import { useRouter } from 'next/router';
import React from 'react';
import { LayoutContext } from '../context';
import { useTranslations } from 'next-intl';

interface ItemNav {
  code: string;
  icon?: string;
  link?: string;
  parentId?: string;
  children?: ItemNav[];
  exact?: boolean;
  child?: boolean;
}

export const DrawerItemComponent: React.FC<ItemNav> = (item) => {
  const { push, pathname } = useRouter();
  const { isSidebarOpen } = React.useContext(LayoutContext);
  const translation = useTranslations('menu');

  const IconComponent = item.icon
    ? getIconByName(item.icon as IconNames)
    : null;
  const isActive = item.link && pathname.startsWith(item.link);

  return (
    <ListItemButton
      key={item.code}
      sx={{
        padding: 1,
        paddingY: 1,
        marginBottom: 1,
        borderRadius: '0.5rem',
        transition:
          'width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        boxShadow: isActive
          ? 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem'
          : undefined,
      }}
      onClick={() => {
        if (item.link) push(item.link);
      }}
    >
      {IconComponent && (
        <ListItemIcon
          sx={{
            padding: 0,
            margin: 0,
            backgroundColor: isActive ? 'primary.main' : undefined,
            minWidth: '2rem',
            marginRight: '1rem',
            minHeight: '2rem',
            borderRadius: '0.5rem',
            display: 'grid',
            placeItems: 'center',
            boxShadow:
              'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem',
          }}
        >
          <IconComponent
            sx={{
              fill: (t) => isActive ? t.palette.primary.contrastText : t.palette.primary.main,
            }}
            fontSize={'small'}
          />
        </ListItemIcon>
      )}

      <span
        style={{
          fontSize: '0.875rem',
          fontWeight: 500,
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          maxWidth: isSidebarOpen ? '100%' : '0%',
          transition: 'max-width 0.5s',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {isSidebarOpen ? translation(item.code) : null}
      </span>

      {/* {isSidebarOpen && item.children ? (
        menuOpen[item.code] ? (
          <ExpandLess color="secondary" />
        ) : (
          <ExpandMore color="secondary" />
        )
      ) : null} */}
    </ListItemButton>
  );
};
