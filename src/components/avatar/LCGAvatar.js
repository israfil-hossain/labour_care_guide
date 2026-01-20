import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {LCGFastImage} from '../fastImage';
import {styles} from './LCGAvatarStyles';

type Props = {
  onPress?: Function,
  imageUrl?: string,
  imageStyle?: Object,
  placeholder?: Object,
  avatarContainerStyle?: Object,
};

const LCGAvatar = ({
  onPress,
  imageUrl = '',
  imageStyle,
  placeholder = {uri},
  avatarContainerStyle,
}: Props) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const imageSource = useMemo(() => {
    if (!imageUrl) {
      return {};
    }

    return {uri: imageUrl};
  }, [imageUrl]);

  return (
    <TouchableOpacity
      style={
        isImgLoaded
          ? [styles.button, avatarContainerStyle]
          : [styles.button, styles.buttonBGColor, avatarContainerStyle]
      }
      disabled={!onPress}
      onPress={() => onPress?.()}
    >
      <View style={styles.rootView}>
        <LCGFastImage
          style={
            isImgLoaded
              ? [styles.image, imageStyle]
              : [styles.placeholderImage, imageStyle]
          }
          source={imageSource}
          placeholder={placeholder}
          onImageLoaded={loaded => setIsImgLoaded(loaded)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LCGAvatar;
