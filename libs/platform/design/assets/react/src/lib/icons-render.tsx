
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TableRowsIcon from '@mui/icons-material/TableRows';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Settings from '@mui/icons-material/Settings';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonIcon from '@mui/icons-material/Person';

import { IconNames } from './icons';

export const icons = {
  [IconNames.DEFAULT]: CheckBoxOutlineBlankIcon,
  [IconNames.HOME]: HomeWorkIcon,
  [IconNames.INBOX]: InboxIcon,
  [IconNames.MAIL]: MailIcon,
  [IconNames.DASHBOARD]: DashboardIcon,
  [IconNames.ADMIN]: AdminPanelSettingsIcon,
  [IconNames.TABLE]: TableRowsIcon,
  [IconNames.SOCCER]: SportsSoccerIcon,
  [IconNames.BASKETBALL]: SportsBasketballIcon,
  [IconNames.FOOTBALL]: SportsFootballIcon,
  [IconNames.VOLLEYBALL]: SportsVolleyballIcon,
  [IconNames.HANDBALL]: SportsHandballIcon,
  [IconNames.RUGBY]: SportsRugbyIcon,
  [IconNames.CRICKET]: SportsCricketIcon,
  [IconNames.ESPORTS]: SportsEsportsIcon,
  [IconNames.KABADDI]: SportsKabaddiIcon,
  [IconNames.MMA]: SportsMmaIcon,
  [IconNames.SETTINGS]: Settings,
  [IconNames.ARROW_BACK]: ArrowBackIosIcon,
  [IconNames.USER]: PersonIcon,
}

export const getIconByName = (name: IconNames) => {
  return icons[name];
}
