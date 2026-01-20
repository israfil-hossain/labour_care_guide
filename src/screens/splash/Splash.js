import React from 'react';
import {View, Image, Text} from 'react-native';
import {styles} from './SplashStyles';
import config from '../../config';

const Splash = () => {
  const splashImage = config?.images?.lcgSplash;
  
  return (
    <View style={styles.container}>
      {splashImage ? (
        <Image 
          source={splashImage} 
          style={{width: 200, height: 200, resizeMode: 'contain'}} 
        />
      ) : (
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Labour Care Guide</Text>
      )}
    </View>
  );
};

export default Splash;
