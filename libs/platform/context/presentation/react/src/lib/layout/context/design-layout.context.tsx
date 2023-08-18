import React, { createContext, useState, useCallback } from 'react';
import {
  LayoutState,
  LayoutContextType,
  MyComponentProps,
} from './design-layout.context.types';
import { useSize } from '@saas-quick-start/common/hooks';

const defaultLayoutState: LayoutState = {
  isSidebarOpen: true,
  isNavbarVisible: true,
  isDesktop: true,
  isMobile: false,
  isTablet: false,
  userMenu: [],
  drawerWidth: 240
};

export const LayoutContext = createContext<LayoutContextType>({
  ...defaultLayoutState,
  toggleSidebar: () => undefined,
  showNavbar: () => undefined,
  hideNavbar: () => undefined,
});

export const LayoutProvider: React.FC<MyComponentProps> = ({
  children,
  userMenu,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    defaultLayoutState.isSidebarOpen
  );
  const [drawerWidth, setDrawerWidth] = useState<number>(240);

  const { isDesktop, isMobile, isTablet } = useSize();
  const [isNavbarVisible, setIsNavbarVisible] = useState(
    defaultLayoutState.isNavbarVisible
  );

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
    setDrawerWidth((prev) => (prev === 60 ? 240 : 60));
  }, []);

  const showNavbar = useCallback(() => {
    setIsNavbarVisible(true);
  }, []);

  const hideNavbar = useCallback(() => {
    setIsNavbarVisible(false);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        isNavbarVisible,
        toggleSidebar,
        showNavbar,
        hideNavbar,
        isDesktop,
        isMobile,
        isTablet,
        userMenu,
        drawerWidth
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
