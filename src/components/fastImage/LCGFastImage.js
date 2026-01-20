import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'expo-image';

type Props = {
  placeholder?: Object,
  style?: Object,
  onLoad?: Function,
  onError?: Function,
  onImageLoaded?: Function,
  source?: Object,
};

/** Wraps expo-image and adds `placeholder` support */
const LCGFastImage = ({
  placeholder,
  style,
  onLoad,
  onError,
  onImageLoaded,
  source,
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  const onImageLoad = (e) => {
    onLoad?.(e);
    setLoaded(true);
  };

  const onImageLoadError = () => {
    onError?.();
    setLoaded(false);
  };

  useEffect(() => {
    if (loaded) {
      onImageLoaded(true);
    } else if (!loaded) {
      onImageLoaded(false);
    }
  }, [loaded, !loaded]);

  return (
    <>
      <Image
        style={style}
        onLoad={onImageLoad}
        onError={onImageLoadError}
        source={source}
      />
      {!!placeholder && !loaded && (
        <Image
          source={placeholder}
          style={[style, StyleSheet.absoluteFill]}
        />
      )}
    </>
  );
};

export default LCGFastImage;
