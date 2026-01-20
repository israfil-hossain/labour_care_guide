import React from 'react';
import {View} from 'react-native';
import {styles} from './LCGDividerStyles';

type Props = {
  style: Object,
};

/**
 * This component is used to show the divider
 */
const LCGDivider = ({style}: Props) => {
  return <View style={[styles.divider, style]} />;
};

export default LCGDivider;
