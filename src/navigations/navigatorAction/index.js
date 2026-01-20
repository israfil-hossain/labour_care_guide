import config from '../../config';
import {Profile} from '../../screens';
import { ChangePassword } from '../../screens';

export const commonStack = [
  {
    name: config.routes.PROFILE,
    component: Profile,
    leftAccessoryName: 'back-arrow',
    title: config.screenNames.PROFILE_SCREEN,
    leftAccessoryPressType: 'back',
  },
  {
    name: config.routes.CHANGE_PASSWORD,
    component: ChangePassword,
    leftAccessoryName: 'back-arrow',
    title: config.screenNames.CHANGE_PASSWORD,
    leftAccessoryPressType: 'back',
  },
];
