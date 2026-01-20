import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import {
  LCGKeyboardAvoidingAnimatedScroll,
  LCGRadioButtons,
  LCGTextInput,
  LCGCustomPicker,
  LCGButton,
  LCGAvatar,
  LCGDropDown,
  LCGCenterModal,
} from "../../components";
import config from "../../config";
import {
  User,
  UpdateLabourStatus,
  ListBaby,
  BabyAdd,
  UpdateBaby,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";

const BabyDetails = ({ navigation, route }) => {
  const [patientId, setPatientId] = useState("");
  const dispatch = useDispatch();

  const BabyListResponse = useSelector(ListBaby.selectBabyList);
  const AddBabyResponse = useSelector(BabyAdd.selectAddBaby);
  const EditBabyResponse = useSelector(UpdateBaby.selectEditBaby);

  useEffect(() => {
    if (route?.params?.patId) {
      setPatientId(route?.params?.patId);
    }
  }, [route?.params?.patId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callBabyDetailApi();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.babyCard}>
          <View style={styles.babynumberView}>
            <Text style={styles.babynumberText}>Baby {index + 1}</Text>
            <Pressable
              onPress={() =>
                navigation.navigate(config.routes.ADD_BABY, {
                  from: "edit",
                  babyData: item,
                  patId: patientId,
                })
              }
            >
              <Image
                style={styles.writingImg}
                source={require("../../assets/images/Edit.png")}
              />
            </Pressable>
          </View>
          <View style={styles.statusexView}>
            <View>
              <Text style={styles.babylableText}>Baby Status:</Text>
              <Text style={styles.babydataText}>{item?.status}</Text>
            </View>
            <View>
              <Text style={styles.babylableText}>Baby Sex:</Text>
              <Text style={styles.babydataText}>{item?.sex}</Text>
            </View>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.babylableText}>APGAR Score:</Text>
          </View>
          <View style={styles.apgarView}>
            <Text style={styles.apgarlableText}>
              {config.strings.OTHERS.ONEMIN} =
            </Text>
            <Text style={styles.apgardataText}>{item?.apgar?.oneMin}</Text>
            <Text style={styles.apgarlableText}>
              {config.strings.OTHERS.FIVEMIN} =
            </Text>
            <Text style={styles.apgardataText}>{item?.apgar?.fiveMin}</Text>
          </View>
          <View style={styles.apgarView}>
            <Text style={styles.apgarlableText}>
              {config.strings.OTHERS.TENMIN} =
            </Text>
            <Text style={styles.apgardataText}> {item?.apgar?.tenMins}</Text>
            <Text style={styles.apgarlableText}>
              {config.strings.OTHERS.TWENTYMIN} =
            </Text>
            <Text style={styles.apgardataText}>{item?.apgar?.twentyMins}</Text>
          </View>
          <View style={styles.babyWeightView}>
            <Text style={styles.babylableText}>Baby Weight(In Kg)</Text>
          </View>
          <View style={styles.babyWeightdataView}>
            <Text style={styles.babydataText}>{item?.weight}</Text>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.babylableText}>Breast Feeding Started</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={styles.babydataText}>
              {" "}
              {item?.breastFeeding?.started == true ? "Yes" : "No"}{" "}
              {item?.breastFeeding?.withinOneHour == true
                ? "(Within 1 hour)"
                : ""}
              {item?.breastFeeding?.moreThanOneHour == true
                ? "(More than 1 hour)"
                : ""}
            </Text>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.noteslableText}>Notes:</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={styles.notesdataText}>{item?.notes}</Text>
          </View>
        </View>
      </>
    );
  };

  const footerComponent = () => {
    return (
      <View style={styles.footerCard}>
        <Image
          style={styles.babyImg}
          source={require("../../assets/images/Newbaby.png")}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addbabyBtn}
          onPress={() =>
            navigation.navigate(config.routes.ADD_BABY, {
              patId: patientId,
              from: "add",
            })
          }
        >
          <Text style={styles.addbabyText}>Add Baby</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const callBabyDetailApi = () => {
    const payload = {
      uri: `${route?.params?.patId}`,
    };
    dispatch({
      type: "BABY_LIST",
      payload,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {BabyListResponse?.data?.length > 0 ? (
        <FlatList
          data={BabyListResponse?.data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListFooterComponent={footerComponent}
        />
      ) : (
        <View style={styles.addbabyPositionView}>
          <View style={styles.footerCard}>
            <Image
              style={styles.babyImg}
              source={require("../../assets/images/Newbaby.png")}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.addbabyBtn}
              onPress={() => navigation.navigate(config.routes.ADD_BABY)}
            >
              <Text style={styles.addbabyText}>Add Baby</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.screenBackground,
  },
  babyCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  babynumberView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  babynumberText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FC5285",
  },
  writingImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  statusexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  babylableText: {
    fontSize: 14,
    color: "#8D939E",
    fontWeight: "400",
  },
  babydataText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#25282B",
  },
  apgardataText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FC5285",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  apgarlableText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#25282B",
    marginVertical: 5,
  },
  apgarView: {
    flexDirection: "row",
  },
  noteslableText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#ABAFB7",
  },
  notesdataText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
  },
  babyWeightView: {
    marginTop: 10,
  },
  babyWeightdataView: {
    marginVertical: 5,
  },
  labelView: {
    marginVertical: 10,
  },
  dataView: {
    marginBottom: 10,
  },
  footerCard: {
    height: 70,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  babyImg: {
    width: 53,
    height: 53,
    resizeMode: "contain",
  },
  addbabyBtn: {
    backgroundColor: "#FC5285",
    height: 33,
    width: 110,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addbabyText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  addbabyPositionView: {
    position: "absolute",
    zIndex: 1,
    bottom: 5,
    width: "100%",
  },
});

export default BabyDetails;
