import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import config from '../../../config';
import {styles} from './LCGDrawerHeaderStyles';
import {LCGIcon} from '../../icon';

type Props = {
  title?: string,
  onIconPress?: Function,
};

const LCGDrawerHeader = (props) => {
  const {title = config.strings.OTHERS.INSTITUTE_HEADING, onIconPress} = props;

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        disabled={!onIconPress}
        onPress={() => onIconPress?.()}
        style={styles.iconContainer}
      >
        <LCGIcon
          name={config.iconNames.CROSS_LIGHT}
          color={config.colors.white}
          size={14}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LCGDrawerHeader;
