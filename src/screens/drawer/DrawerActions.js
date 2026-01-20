// @flow
import config from '../../config';

export const drawerCellAction = ()<CVDDrawerCellTypes> => {
  const cellAction<CVDDrawerCellTypes> = [
    {
      cellText: config.strings.MENU_TEXT_NOTIFICATIONS,
      leftIconName: config.iconsNames.NOTIFICATION_BELL,
      rightIconName: config.iconsNames.ARROW_RIGHT_REGULAR,
    },
    {
      cellText: config.strings.MENU_TEXT_DASHBOARD,
      leftIconName: config.iconsNames.HOME_OUTLINE,
      rightIconName: config.iconsNames.ARROW_RIGHT_REGULAR,
    },
    {
      cellText: config.strings.MENU_TEXT_MY_PATIENT,
      leftIconName: config.iconsNames.MY_PATIENT,
      rightIconName: config.iconsNames.ARROW_RIGHT_REGULAR,
    },
    {
      cellText: config.strings.MENU_TEXT_ROUND,
      leftIconName: config.iconsNames.ROUND,
      rightIconName: config.iconsNames.ARROW_RIGHT_REGULAR,
    },
    {
      cellText: config.strings.MENU_TEXT_ADMIN,
      leftIconName: config.iconsNames.BEDS,
      rightIconName: config.iconsNames.ARROW_RIGHT_REGULAR,
    },
    {
      cellText: config.strings.MENU_TEXT_SETTINGS,
      leftIconName: config.iconsNames.SETTINGS_GEAR,
      rightIconName: config.iconsNames.ARROW_RIGHT_REGULAR,
    },
    {
      cellText: config.strings.MENU_TEXT_LOGOUT,
      leftIconName: config.iconsNames.LOGOUT,
      rightIconName: '',
    },
  ];
  return cellAction;
};
