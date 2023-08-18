import React from 'react';
import { DefaultAppContent } from './default-app-content.component';
import { DefaultAppContentProps } from './app-content.types';

export const AppContentSelector: React.FC<DefaultAppContentProps> = ({
  children,
}) => {
  return <DefaultAppContent>{children}</DefaultAppContent>;
};
