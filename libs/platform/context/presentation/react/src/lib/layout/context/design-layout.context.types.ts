import { UserMenuEntityInterface } from "@sports-mind/domain/user";

export interface LayoutState {
  isSidebarOpen: boolean;
  isNavbarVisible: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  userMenu: UserMenuEntityInterface[];
  drawerWidth: number;
}

export type MyComponentProps = {
  children: React.ReactNode;
  userMenu: UserMenuEntityInterface[];
};

export interface LayoutContextType extends LayoutState {
  toggleSidebar: () => void;
  showNavbar: () => void;
  hideNavbar: () => void;
}

export type DrawerItem = {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};
