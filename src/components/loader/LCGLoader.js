/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './LCGLoaderStyles';
import {UI} from '../../reduxStates';
import config from '../../config';

type Props = {
  loading?: boolean,
};

const LCGLoader = ({loading = false}: Props) => {
  const isLoading = useSelector(UI.selectLoader);

  if (!isLoading && !loading) {
    return null;
  }

  return (
    <View style={styles.mainBackViewStyle}>
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color={config.colors.appTheme1} />
      </View>
    </View>
  );
};

export default LCGLoader;
