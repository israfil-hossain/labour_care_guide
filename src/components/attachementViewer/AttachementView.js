import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import { WebView } from "react-native-webview";
import config from "../../config";

const AttachementViewer = ({ dataAttachment }) => {
  const [show, setShow] = useState(false);
  const [pdfShow, setPdfShow] = useState(false);
  const [dataUrl, setDataUrl] = useState("");

  const ImageViewModal = () => {
    return (
      <Modal visible={show}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setShow(false)}
            style={styles.closeIconView}
          >
            <Image
              source={require("../../assets/images/Close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <View style={styles.contentView}>
            <Image source={{ uri: dataUrl }} style={styles.contentImage} />
          </View>
        </View>
      </Modal>
    );
  };

  const PdfViewModal = () => {
    return (
      <Modal visible={pdfShow}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setPdfShow(false)}
            style={styles.closeIconView}
          >
            <Image
              source={require("../../assets/images/Close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <WebView
            source={{ uri: dataUrl }}
            style={{ flex: 1 }}
            startInLoadingState={true}
          />
        </View>
      </Modal>
    );
  };

  const onPressView = (data) => {
    if (data?.type == "application/pdf") {
      setPdfShow(true);
      setDataUrl(data?.uri);
    } else {
      setShow(true);
      setDataUrl(data?.uri);
    }
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        data={dataAttachment}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.4}
            style={styles.attachmentViewStyle}
            onPress={() => onPressView(item)}
          >
            <Image
              source={
                item?.type == "application/pdf"
                  ? require("../../assets/images/Document.png")
                  : require("../../assets/images/Gallery.png")
              }
              style={styles.docImage}
            />
            <Text numberOfLines={1} style={styles.contentText}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <ImageViewModal />
      <PdfViewModal />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  attachmentViewStyle: {
    width: "47%",
    height: 40,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    borderColor: config.colors.appTheme1,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  docImage: { width: 20, height: 20, resizeMode: "contain" },
  contentText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 13,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  closeIconView: { alignItems: "flex-end", margin: 20 },
  closeIcon: { width: 24, height: 24, resizeMode: "contain" },
  contentView: { flex: 1, justifyContent: "center", alignItems: "center" },
  contentImage: { width: "100%", height: "30%" },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default AttachementViewer;
