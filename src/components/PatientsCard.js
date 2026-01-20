/* eslint-disable react/self-closing-comp */
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import config from "../config";
import fontFamily from "../config/fontFamily";
import {
  LCGButton,
  LCGKeyboardAvoidingAnimatedScroll,
  LCGOtpBlocks,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  HomeDashBoard,
  FcmTokenSet,
  ProfileStaff,
} from "../reduxStates";

const NOT_STARTED = "#8D939E";
const STARTED = "#FF9201";
const COMPLETED = "#0FAB69";
const STATUS_STARTED = "started";
const STATUS_NOT_STARTED = "not-started";
const STATUS_COMPLETED = "delivery-completed";

const PatientsCard = (props) => {
  const { dataPateint, onPress, onFlagPress, onOptionsPress, navigation } =
    props;

    

  const showStatusColor = (status) => {
    if (dataPateint?.labourStatus == STATUS_NOT_STARTED) {
      return NOT_STARTED;
    } else if (dataPateint?.labourStatus == STATUS_STARTED) {
      return STARTED;
    } else if (dataPateint?.labourStatus == STATUS_COMPLETED) {
      return COMPLETED;
    }
  };

  const onPressStatusView = () => {
    if (dataPateint?.labourStatus == STATUS_COMPLETED) {
      navigation.navigate(config.routes.BABY_DETAILS,{patId:dataPateint?.patientId});
    }
  };

  return (
    <View style={styles.container}>
      <CardView
        cardElevation={1}
        cardMaxElevation={1}
        cornerRadius={6}
        style={styles.topCardView}
      >
        <View style={styles.subConatinerView}>
          <View style={styles.cardContentView}>
            <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
              <Text style={styles.titleText}>{dataPateint?.name}</Text>

              <View style={styles.detailsSubView}>
                

                <Text style={styles.ageLabelText}>
                  Age: <Text style={styles.ageText}>{dataPateint?.age}</Text>
                </Text>
              </View>

              <View style={styles.detailsSubView}>
                <Text style={styles.pateintIDLabelText}>
                  UHID: <Text style={styles.ageText}>{dataPateint?.UHID}</Text>
                </Text>

                <Text
                  style={{ ...styles.pateintIDLabelText, marginHorizontal: 10 }}
                >
                  Obstetric Formula:{" "}
                  <Text style={styles.ageText}>
                    {dataPateint?.obstetricFormula}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.flagMenuView}>
              <TouchableOpacity
                
                onPress={onFlagPress}
              >
                {dataPateint?.isAtHighRisk == true ? (
                  <Image
                    style={styles.flagImage}
                    source={require("../assets/images/dashboard/redFlag.png")}
                  />
                ) : (
                  <Image
                    style={styles.flagImage}
                    source={require("../assets/images/dashboard/flag.png")}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={onOptionsPress}>
                <Image
                  style={styles.menuOptionImage}
                  source={require("../assets/images/menuOptionIcon.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.pateintIDLabelText}>
          Ward Name:{" "}
          <Text style={styles.ageText}>{dataPateint?.wardName == null ? "Not assigned yet" : dataPateint?.wardName }</Text>
        </Text>

        <Pressable
          onPress={() => onPressStatusView()}
          style={styles.statusDetailConatiner}
        >
          <View style={styles.statusDetailConatinerSubView}>
            <Image
              style={styles.statusImage}
              source={require("../assets/images/deliveryStatus.png")}
            />
            <Text style={styles.statusLabelText}>Delivery Status:</Text>
          </View>
          <Text
            style={{
              ...styles.statusLabelDataText,
              color: showStatusColor(dataPateint?.labourStatus),
            }}
          >
            {dataPateint?.labourStatus}
          </Text>
        </Pressable>

        {dataPateint?.labourStatus == STATUS_COMPLETED && (
          <Pressable
            onPress={() => onPressStatusView()}
            style={styles.statusDetailConatiner}
          >
            <View style={styles.statusDetailConatinerSubView}>
              <Image
                style={styles.statusImage}
                source={require("../assets/images/baby.png")}
              />
              <Text style={styles.statusLabelText}>Baby Status:</Text>
            </View>
            <Text
              style={{
                ...styles.statusLabelDataText,
                color: config.colors.appTheme1,
              }}
            >
              {dataPateint?.delivery?.numberOfBabies} Baby Delivered
            </Text>
          </Pressable>
        )}

        <View style={styles.lcgDetailConatainer}>
          <View style={styles.lcgDetailSUbView}>
            <View>
              <Text style={styles.lcgLabelTextHeading}>
                {dataPateint?.lcg?.MHR ?? "-"}
              </Text>
              <Text style={styles.lcgLabelTextData}>MHR</Text>
            </View>

            <View>
              <Text style={{ ...styles.lcgLabelTextHeading, color: "#EA3E2B" }}>
                {dataPateint?.lcg?.SBP}/{dataPateint?.lcg?.DBP}
              </Text>
              <Text style={styles.lcgLabelTextData}>BP</Text>
            </View>

            <View>
              <Text style={styles.lcgLabelTextHeading}>
                {dataPateint?.lcg?.FHR ?? "-"}
              </Text>
              <Text style={styles.lcgLabelTextData}>FHR</Text>
            </View>

            <View>
              <Text style={styles.lcgLabelTextHeading}>
                {dataPateint?.lcg?.temperature ?? "-"}
              </Text>
              <Text style={styles.lcgLabelTextData}>F Temp</Text>
            </View>

            <View>
              <Text style={styles.lcgLabelTextHeading}>
                {dataPateint?.lcg?.UC ?? "-"}
              </Text>
              <Text style={styles.lcgLabelTextData}>UC</Text>
            </View>
          </View>

          <View style={styles.viewLCGConatiner}>
            <Pressable
              onPress={() => navigation.navigate(config.routes.VIEW_LCG,{patId:dataPateint?.patientId})}
              style={styles.viewLCGButtonView}
            >
              <View style={styles.viewLCGButtonSubView}>
                <Text style={styles.viewLCGButtonText}>View LCG</Text>
                <Image
                  source={require("../assets/images/RightBlackArrow.png")}
                  style={styles.viewLCGArrowImage}
                />
              </View>
            </Pressable>
          </View>
        </View>

        <LCGButton
          buttonText={config.strings.BTN_TEXTS.ADD_PLAN}
          containerStyle={styles.addPlanButton}
          onPress={() =>
            navigation.navigate(config.routes.ADD_PLAN, {
              idPatient: dataPateint?.patientId,
            })
          }
        />
      </CardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topCardView: {
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  subConatinerView: {
    flexDirection: "row",
  },
  cardContentView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 15,
    color: "#25282B",
  },
  detailsSubView: { flexDirection: "row", marginVertical: 5 },
  pateintIDLabelText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: "#25282B",
    marginTop: 5,
  },
  pateintIDText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 13,
    color: "#8D939E",
    marginTop: 5,
  },
  ageLabelText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: "#25282B",
    marginTop: 5,
   
  },
  ageText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 13,
    color: "#8D939E",
    marginTop: 5,
  },
  flagMenuView: {
    flexDirection: "row",
    right: 20,
  },
  patientIdView: {
    width: "75%",
  },
  flagImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  menuOptionImage: {
    marginLeft: 2,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  statusDetailConatiner: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center", 
  },
  statusDetailConatinerSubView: { flexDirection: "row", alignItems: "center" },
  statusImage: {
    marginRight: 10,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  statusLabelText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: "#25282B",
  },
  statusLabelDataText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "400",
    fontSize: 13,
    textTransform: "uppercase",
  },
  lcgDetailConatainer: {
    paddingVertical: 15,
    backgroundColor: "#F5F6F9",
    borderColor: "#DFE3EE",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  lcgDetailSUbView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  lcgLabelTextHeading: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: "#38D492",
    textAlign: "center",
  },
  lcgLabelTextData: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: "#393766",
    textAlign: "center",
    marginVertical: 5,
  },
  viewLCGConatiner: { alignItems: "center" },
  viewLCGButtonView: {
    position: "absolute",
    paddingVertical: 4,
    backgroundColor: "#FFE2EB",
    borderWidth: 1,
    borderColor: "#FC5285",
    paddingHorizontal: 12,
    bottom: -30,
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
  },
  viewLCGButtonSubView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  viewLCGButtonText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: "#393766",
    fontSize: 12,
  },
  viewLCGArrowImage: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  addPlanButton: { marginTop: 20, height: 40, marginBottom: 5 },
});

export default PatientsCard;
