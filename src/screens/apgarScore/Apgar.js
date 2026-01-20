import CardView from "../../components/CardView";import React, { useEffect, useRef, useState } from "react";
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
import moment from "moment";
import {
  User,
  UpdateLabourStatus,
  AddLcg,
  CompleteDelivery,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import { LCGButton } from "../../components";

const ZEROSCORE = 0;
const ONESCORE = 1;
const TWOSCORE = 2;

const Apgar = ({ navigation,route }) => {
  const [timeInterval, setTimeInterval] = useState("");
  const [color, setColor] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [reflex, setReflex] = useState("");
  const [muscleTone, setMuscleTone] = useState("");
  const [respiration, setRespiration] = useState("");

  const [colorScore, setColorScore] = useState(0);
  const [heartScore, setHeartScore] = useState(0);
  const [reflexScore, setreflexScore] = useState(0);
  const [muscleScore, setMuscleScore] = useState(0);
  const [respScore, setRespScore] = useState(0);

  const [oneMinScore, setOneMinScore] = useState(null);
  const [fiveMinScore, setFiveMinScore] = useState(null);
  const [tenMinScore, setTenMinScore] = useState(null);
  const [twentyMinScore, setTwentyMinScore] = useState(null);



  useEffect(()=>{
   if(route?.params?.screenFrom == "edit") {
    setOneMinScore(route?.params?.detailApgar?.oneMin);
    setFiveMinScore(route?.params?.detailApgar?.fiveMin);
    setTenMinScore(route?.params?.detailApgar?.tenMins);
    setTwentyMinScore(route?.params?.detailApgar?.twentyMins);
   }
  },[route?.params?.screenFrom])

  const TopScoreCardView = () => {
    return (
      <>
        <View style={styles.scoreContainerView}>
          <View style={styles.scoreOptionSubView}>
            <Text style={styles.scoreOptionLabelText}>
              {config.strings.OTHERS.ONEMIN} = {oneMinScore}
            </Text>
            <Text style={styles.scoreOptionContentText}></Text>
          </View>

          <View style={styles.scoreOptionSubView}>
            <Text style={styles.scoreOptionLabelText}>
              {config.strings.OTHERS.FIVEMIN} = {fiveMinScore}
            </Text>
            <Text style={styles.scoreOptionContentText}></Text>
          </View>
        </View>

        <View style={styles.scoreContainerView}>
          <View style={styles.scoreOptionSubView}>
            <Text style={styles.scoreOptionLabelText}>
              {config.strings.OTHERS.TENMIN} = {tenMinScore}
            </Text>
            <Text style={styles.scoreOptionContentText}></Text>
          </View>

          <View style={styles.scoreOptionSubView}>
            <Text style={styles.scoreOptionLabelText}>
              {config.strings.OTHERS.TWENTYMIN} = {twentyMinScore}
            </Text>
            <Text style={styles.scoreOptionContentText}></Text>
          </View>
        </View>
      </>
    );
  };

  const OptionsCardView = () => {
    return (
      <View style={styles.topScroreView}>
        <Text style={styles.labelText}>
          {config.strings.OTHERS.TIME_INTERVAL}
        </Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressTimeInterval("1 min")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                timeInterval == "1 min"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: timeInterval == "1 min" ? 0 : 1,
              borderColor:
                timeInterval == "1 min"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  timeInterval == "1 min"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.ONEMIN}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressTimeInterval("5 min")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                timeInterval == "5 min"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: timeInterval == "5 min" ? 0 : 1,
              borderColor:
                timeInterval == "5 min"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  timeInterval == "5 min"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.FIVEMIN}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressTimeInterval("10 min")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                timeInterval == "10 min"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: timeInterval == "10 min" ? 0 : 1,
              borderColor:
                timeInterval == "10 min"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  timeInterval == "10 min"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.TENMIN}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressTimeInterval("20 min")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                timeInterval == "20 min"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: timeInterval == "20 min" ? 0 : 1,
              borderColor:
                timeInterval == "20 min"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  timeInterval == "20 min"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.TWENTYMIN}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>{config.strings.OTHERS.COLOR}</Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressColor("Blue or Pale")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                color == "Blue or Pale"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: color == "Blue or Pale" ? 0 : 1,
              borderColor:
                color == "Blue or Pale"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  color == "Blue or Pale"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.BLUE_PALE}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressColor("Acrocyanotic")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                color == "Acrocyanotic"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: color == "Acrocyanotic" ? 0 : 1,
              borderColor:
                color == "Acrocyanotic"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  color == "Acrocyanotic"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.ACROCYCTIC}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressColor("Completely Pink")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                color == "Completely Pink"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: color == "Completely Pink" ? 0 : 1,
              borderColor:
                color == "Completely Pink"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  color == "Completely Pink"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.COMPLETE_PINK}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>{config.strings.OTHERS.HEART_RATE}</Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressHeartRate("Absent")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                heartRate == "Absent"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: heartRate == "Absent" ? 0 : 1,
              borderColor:
                heartRate == "Absent"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  heartRate == "Absent"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.ABSENT}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressHeartRate("<100 min")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                heartRate == "<100 min"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: heartRate == "<100 min" ? 0 : 1,
              borderColor:
                heartRate == "<100 min"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  heartRate == "<100 min"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.IOOMINUTE}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressHeartRate(">100 min")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                heartRate == ">100 min"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: heartRate == ">100 min" ? 0 : 1,
              borderColor:
                heartRate == ">100 min"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  heartRate == ">100 min"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.IOOMINUTE_GREATER}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}> {config.strings.OTHERS.REFLEX}</Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressReflex("No Response")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                reflex == "No Response"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: reflex == "No Response" ? 0 : 1,
              borderColor:
                reflex == "No Response"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  reflex == "No Response"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.NORESPONSE}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressReflex("Grimace")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                reflex == "Grimace"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: reflex == "Grimace" ? 0 : 1,
              borderColor:
                reflex == "Grimace"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  reflex == "Grimace"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.GRIMACE}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressReflex("Cry or Active Withdrawal")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                reflex == "Cry or Active Withdrawal"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: reflex == "Cry or Active Withdrawal" ? 0 : 1,
              borderColor:
                reflex == "Cry or Active Withdrawal"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  reflex == "Cry or Active Withdrawal"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.CRY_ACTIVE}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>
          {config.strings.OTHERS.MUSCLE_TONE}
        </Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressMuscleTone("LIMP")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                muscleTone == "LIMP"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: muscleTone == "LIMP" ? 0 : 1,
              borderColor:
                muscleTone == "LIMP"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  muscleTone == "LIMP"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.LIMP}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressMuscleTone("Some Flexion")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                muscleTone == "Some Flexion"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: muscleTone == "Some Flexion" ? 0 : 1,
              borderColor:
                muscleTone == "Some Flexion"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  muscleTone == "Some Flexion"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.SOME_FLEXION}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressMuscleTone("Active")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                muscleTone == "Active"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: muscleTone == "Active" ? 0 : 1,
              borderColor:
                muscleTone == "Active"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  muscleTone == "Active"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.ACTIVE}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>
          {config.strings.OTHERS.RESIPIRATION}
        </Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressRespiration("Absent")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                respiration == "Absent"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: respiration == "Absent" ? 0 : 1,
              borderColor:
                respiration == "Absent"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  respiration == "Absent"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.ABSENT}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressRespiration("Weak Cry:Hypoventilation")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                respiration == "Weak Cry:Hypoventilation"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: respiration == "Weak Cry:Hypoventilation" ? 0 : 1,
              borderColor:
                respiration == "Weak Cry:Hypoventilation"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  respiration == "Weak Cry:Hypoventilation"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.WEAK_CRY}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressRespiration("Good")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                respiration == "Good"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: respiration == "Good" ? 0 : 1,
              borderColor:
                respiration == "Good"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  respiration == "Good"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.GOOD}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>
          {config.strings.OTHERS.APGAR_SCORE}
        </Text>

        <View
          style={{
            ...styles.scoreOptionSubView,
            marginVertical: 15,
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{ ...styles.scoreOptionContentText, marginHorizontal: 10 }}
          >
            {colorScore + heartScore + reflexScore + muscleScore + respScore}
          </Text>
        </View>
      </View>
    );
  };

  const onPressTimeInterval = (type) => {
    if (type == config.strings.OTHERS.ONEMIN) {
      setTimeInterval(config.strings.OTHERS.ONEMIN);
    } else if (type == config.strings.OTHERS.FIVEMIN) {
      setTimeInterval(config.strings.OTHERS.FIVEMIN);
    } else if (type == config.strings.OTHERS.TENMIN) {
      setTimeInterval(config.strings.OTHERS.TENMIN);
    } else if (type == config.strings.OTHERS.TWENTYMIN) {
      setTimeInterval(config.strings.OTHERS.TWENTYMIN);
    }
  };

  const onPressColor = (type) => {
    if (type == config.strings.OTHERS.BLUE_PALE) {
      setColor(config.strings.OTHERS.BLUE_PALE);
      setColorScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.ACROCYCTIC) {
      setColor(config.strings.OTHERS.ACROCYCTIC);
      setColorScore(ONESCORE);
    } else if (type == config.strings.OTHERS.COMPLETE_PINK) {
      setColor(config.strings.OTHERS.COMPLETE_PINK);
      setColorScore(TWOSCORE);
    }
  };

  const onPressHeartRate = (type) => {
    if (type == config.strings.OTHERS.ABSENT) {
      setHeartRate(config.strings.OTHERS.ABSENT);
      setHeartScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.IOOMINUTE) {
      setHeartRate(config.strings.OTHERS.IOOMINUTE);
      setHeartScore(ONESCORE);
    } else if (type == config.strings.OTHERS.IOOMINUTE_GREATER) {
      setHeartRate(config.strings.OTHERS.IOOMINUTE_GREATER);
      setHeartScore(TWOSCORE);
    }
  };

  const onPressReflex = (type) => {
    if (type == config.strings.OTHERS.NORESPONSE) {
      setReflex(config.strings.OTHERS.NORESPONSE);
      setreflexScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.GRIMACE) {
      setReflex(config.strings.OTHERS.GRIMACE);
      setreflexScore(ONESCORE);
    } else if (type == config.strings.OTHERS.CRY_ACTIVE) {
      setReflex(config.strings.OTHERS.CRY_ACTIVE);
      setreflexScore(TWOSCORE);
    }
  };

  const onPressMuscleTone = (type) => {
    if (type == config.strings.OTHERS.LIMP) {
      setMuscleTone(config.strings.OTHERS.LIMP);
      setMuscleScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.SOME_FLEXION) {
      setMuscleTone(config.strings.OTHERS.SOME_FLEXION);
      setMuscleScore(ONESCORE);
    } else if (type == config.strings.OTHERS.ACTIVE) {
      setMuscleTone(config.strings.OTHERS.ACTIVE);
      setMuscleScore(TWOSCORE);
    }
  };

  const onPressRespiration = (type) => {
    if (type == config.strings.OTHERS.ABSENT) {
      setRespiration(config.strings.OTHERS.ABSENT);
      setRespScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.WEAK_CRY) {
      setRespiration(config.strings.OTHERS.WEAK_CRY);
      setRespScore(ONESCORE);
    } else if (type == config.strings.OTHERS.GOOD) {
      setRespiration(config.strings.OTHERS.GOOD);
      setRespScore(TWOSCORE);
    }
  };

  const onPressSubmit = () => {
    if (timeInterval == config.strings.OTHERS.ONEMIN) {
      setTimeInterval("1");
    } else if (timeInterval == config.strings.OTHERS.FIVEMIN) {
      setTimeInterval("5");
    } else if (timeInterval == config.strings.OTHERS.TENMIN) {
      setTimeInterval("10");
    } else if (timeInterval == config.strings.OTHERS.TWENTYMIN) {
      setTimeInterval("20");
    }

    const totalScore =
      colorScore + heartScore + reflexScore + muscleScore + respScore;

    const payload = {
      timeInterval: parseInt(timeInterval),
      color: color,
      heartRate: heartRate,
      reflexIrritability: reflex,
      muscleTone: muscleTone,
      respiration: respiration,
      apgarScore: totalScore,
    };
    navigation.navigate(config.routes.ADD_BABY,{apgarData: payload, from: route?.params?.screenFrom});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.topScroreView}>
          <Text style={styles.labelText}>
            {config.strings.OTHERS.APGAR_SCORE}
          </Text>
          <TopScoreCardView />
        </View>
        <OptionsCardView />

        <LCGButton
          containerStyle={styles.submitBtnContainer}
          buttonText={config.strings.BTN_TEXTS.SUBMIT_BTN_TEXT}
          onPress={() => onPressSubmit()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.screenBackground,
  },
  topScroreView: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 20,
    backgroundColor: config.colors.white,
    borderRadius: 6,
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  labelText: {
    fontSize: 14,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.neutralBlack,
  },
  scoreContainerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  scoreOptionSubView: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 6,
    borderColor: config.colors.textInputLabel,
    borderWidth: 1,
  },
  scoreOptionLabelText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
  },
  scoreOptionContentText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.appTheme1,
  },
  horziontalOptionContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  horizontalOptionView: {
    paddingVertical: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 5,
  },
  horizontalOptionText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 12,
  },
  submitBtnContainer: { marginHorizontal: 20, marginVertical: 20 },
});

export default Apgar;
