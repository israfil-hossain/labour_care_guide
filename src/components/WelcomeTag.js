import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import fontFamily from '../config/fontFamily';

const WelcomeTag = ({userName}) => {
  return (
    <View
      style={{
        marginHorizontal: 15,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.LATO_BOLD_700,
          fontSize: 18,
          fontStyle: 'normal',
          fontWeight: '600',
          color: '#25282B',
        }}
      >
        Welcome! {userName}
      </Text>
      
    </View>
  );
};

export default WelcomeTag;
