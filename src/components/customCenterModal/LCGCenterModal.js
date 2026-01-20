import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import {Image} from "expo-image";
import config from "../../config";

const LCGCenterModal = ({ modalContent, onClose, visible, containerStyle }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalConatiner}>
        <View style={[styles.modalSubView, containerStyle]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={styles.closeImgView}
          >
            <Image
              source={config.images.Close}
              style={styles.closeImg}
              contentFit="contain"
            />
          </TouchableOpacity>
          {modalContent && modalContent()}
        </View>
      </View>
    </Modal>
  );
};

export default LCGCenterModal;

const styles = StyleSheet.create({
  modalConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalSubView: {
    backgroundColor: config.colors.white,
    paddingVertical: 5,
    width: Dimensions.get("screen").width - 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    paddingHorizontal: 10,
    elevation: 3,
    borderRadius: 8,
  },
  closeImgView: {
    alignItems: "flex-end",
    margin: 10,
  },
  closeImg: {
    width: 24,
    height: 24,
  },
});
