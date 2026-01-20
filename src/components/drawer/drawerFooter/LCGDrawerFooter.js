import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './LCGDrawerFooterStyles';
import {LCGIcon} from '../../icon';
import config from '../../../config';
import {LCGDivider} from '../../divider';


const LCGDrawerFooter = (props) => {
  const {onPressAddInstitute} = props;

  return (
    <View style={styles.container}>
      
      <Text style={styles.versionText} numberOfLines={1}>
        {`${config.strings.OTHERS.VERSION_TEXT}: 1.0.0`}
      </Text>
      <Text style={styles.sloganText} numberOfLines={1}>
        {`${config.strings.OTHERS.MADE_WITH} `}
        <LCGIcon
          name={config.iconNames.HEART_FILLED}
          size={14}
          iconStyle={styles.heartIcon}
        />
        {` ${config.strings.OTHERS.BY_LCG} `}
      </Text>
    </View>
  );
};

export default LCGDrawerFooter;
