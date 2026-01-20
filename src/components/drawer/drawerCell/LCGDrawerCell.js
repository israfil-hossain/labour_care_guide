import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import config from '../../../config';
import {styles} from './LCGDrawerCellStyles';
import {LCGIcon} from '../../icon';


const LCGDrawerCell = (props) => {
  const {
    title = '',
    logo,
    titleNumLines = 1,
    index = 0,
    menuIconName = config.iconNames.DOTS_VERTICAL_FILLED_3,
    isMenuIconVisible = true,
    menuIconPress,
    onPressCell,
  } = props;

  return title && title !== '' ? (
    <View
      style={styles.container}
    >
      <View >
        <Image
          source={logo && logo == '' ? logo : require("../../../assets/images/Image_Palcaholder.png")}
          resizeMode="contain"
          style={styles.hospitalImage}
        />
      </View>
      <Text style={styles.title} numberOfLines={titleNumLines}>
        {title} 
      </Text>
      {isMenuIconVisible ? (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => menuIconPress?.()}
          disabled={!menuIconPress}
        >
          <LCGIcon name={menuIconName} size={24} iconStyle={styles.menuIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  ) : null;
};

export default LCGDrawerCell;
