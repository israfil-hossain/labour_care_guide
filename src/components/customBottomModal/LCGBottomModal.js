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

const LCGBottomModal = ({
  modalContent,
  onCloseModal,
  visibleModal,
  modalTitle,
}) => {
  return (
    <Modal visible={visibleModal} transparent={true} animationType="fade">
      <View style={styles.modalConatiner}>
        <View style={styles.modalSubView}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onCloseModal}
            style={styles.closeImgView}
          >
            <Text style={styles.modalTtileText}>
              {modalTitle ? modalTitle : ""}
            </Text>
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

export default LCGBottomModal;

const styles = StyleSheet.create({
  modalConatiner: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalSubView: {
    backgroundColor: config.colors.white,
    paddingVertical: 10,
    width: "100%",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  closeImg: {
    width: 24,
    height: 24,
  },
  modalTtileText: { color: config.colors.neutralBlack, fontSize: 15 },
});
