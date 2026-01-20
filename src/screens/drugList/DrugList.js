import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
} from "react-native";
import {
  LCGButton,
  LCGKeyboardAvoidingAnimatedScroll,
  LCGOtpBlocks,
  LCGTextInput,
} from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import { User, DrugCategoryList } from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";

const DrugList = ({ navigation, route }) => {
  const [catgDrug, setCatgDrug] = useState([]);

  const dispatch = useDispatch();

  //Selectors
  const DrugListResponse = useSelector(DrugCategoryList.selectDrugList);

  useEffect(() => {
    if (DrugListResponse?.success == true) {
      setCatgDrug(DrugListResponse?.data);
    }
  }, [DrugListResponse]);

  useEffect(() => {
    callDrugCatgListApi();
  }, []);

  const callDrugCatgListApi = () => {
    dispatch({
      type: "DRUG_CATEGORY_LIST",
      payload: "",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text style={styles.headingLabelText}>Oxytocin</Text>
        <View style={{ marginHorizontal: 20 }}>
          <LCGTextInput
            containerStyle={styles.inputContainer}
            labelText={"Name"}
            textInputProps={{
              value: "",
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
              keyboardType: config.keyboardTypes.DEFAULT,
              returnKeyType: config.returnKeyTypes.DONE,
              autoCapitalize: config.autoCapitalizeTypes.WORDS,
            }}
          />
          <Text style={styles.bioShopLabelText}>
            {config.strings.OTHERS.OXYTCOIN}
          </Text>

          <LCGTextInput
            containerStyle={styles.inputContainer}
            textInputProps={{
              value: "",
              placeholder:
                config.strings.TEXT_INPUT_PLACEHOLDERS.BLANK_PLACEHOLDER,
              keyboardType: config.keyboardTypes.DEFAULT,
              returnKeyType: config.returnKeyTypes.DONE,
              autoCapitalize: config.autoCapitalizeTypes.WORDS,
            }}
          />
        </View>

        <LCGButton buttonText="Add" containerStyle={styles.addbuttonStyle} /> */}
        <Text style={styles.headingLabelText}>Other Drugs</Text>
        {catgDrug?.length > 0 && (
          <View style={styles.container}>
            <View style={styles.medicationCard}>
              {catgDrug?.map((item, id) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(config.routes.ADD_DRUG, {
                        drugCatg: item,
                        idPatient: route?.params?.patId,
                      })
                    }
                    activeOpacity={0.8}
                    key={id}
                  >
                    <View style={styles.medicationStyle}>
                      <Text style={styles.dataText}>{item?.name}</Text>
                      <Image
                        style={styles.arrowrightImg}
                        source={require("../../assets/images/RightArrow.png")}
                      />
                    </View>
                    <View style={styles.lineView}></View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.screenBackground,
  },
  medicationCard: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 6,
    borderColor: "#DADFEB",
    borderWidth: 1, 
  },
  medicationStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  dataText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#25282B",
  },
  lineView: {
    height: 2,
    backgroundColor: "#DADFEB",
    opacity: 0.6,
  },
  arrowrightImg: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  headingLabelText: {
    marginHorizontal: 20,
    marginVertical: 5,
    fontSize: 17,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.appTheme1,
  },
  inputContainer: { backgroundColor: "white", marginTop: 10, width: "100%" },
  addbuttonStyle: { marginHorizontal: 20, marginTop: 20, marginBottom: 10 },
});

export default DrugList;
