import * as materialIcons from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const getIconByName = (
  name: string
): OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {muiName: string;} => {
  // Assuming the key names in IconNames match the MUI icon names exactly
  const IconComponent =
    materialIcons[name as unknown as keyof typeof materialIcons];
  if (IconComponent) {
    return IconComponent;
  } else {
    throw new Error('icon not implemented');
  }
};
