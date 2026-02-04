import local from './local';
import environment from './environments/env.json';
import routes from './routes';
import strings from './strings';
import screenNames from './screenNames';
import iconNames from './iconNames';
import fontFamily from './fontFamily';
import colors from './colors';
import customMessages from './customMessages';
import vectorIcons from './vectorIcons';
import * as images from '../assets/images';

// Safe image access helper
const safeImages = new Proxy(images, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    console.warn(`Image '${prop}' not found in images export`);
    return null;
  }
});
import {
  returnKeyTypes,
  autoCapitalizeTypes,
  keyboardTypes,
} from './textInputTypes';

const apiBaseUrl = environment?.API_URL ?? '';

const config = {
  ...local,
  apiBaseUrl,
  routes,
  strings,
  screenNames,
  iconNames,
  fontFamily,
  colors,
  customMessages,
  returnKeyTypes,
  autoCapitalizeTypes,
  keyboardTypes,
  vectorIcons,
  images: safeImages,
};

export default config;
