import React from 'react';
import config from '../../config';

type Props = {
  name?: string,
  color?: string,
  size?: number,
  iconStyle?: Object,
};

const LCGIcon = (props) => {
  const {name, color = config.colors.appTheme1, size = 22, iconStyle} = props;
  const {LCGIcons} = config.vectorIcons;

  return <LCGIcons name={name} color={color} size={size} style={iconStyle} />;
};

export default LCGIcon;
