import React from 'react';
import { View } from 'react-native';

const CardView = ({ children, style, cardElevation, cardMaxElevation, cornerRadius, ...props }) => (
  <View 
    style={[
      { 
        elevation: cardElevation || 2, 
        shadowOpacity: 0.1, 
        shadowRadius: 2, 
        backgroundColor: 'white',
        borderRadius: cornerRadius || 0
      }, 
      style
    ]}
    {...props}
  >
    {children}
  </View>
);

export default CardView;