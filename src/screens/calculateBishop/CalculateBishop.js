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
import { useDispatch, useSelector } from "react-redux";
import { User, ScoreBishop } from "../../reduxStates";
import config from "../../config";
import { LCGButton, LCGAvatar } from "../../components";

const ZEROSCORE = 0;
const ONESCORE = 1;
const TWOSCORE = 2;
const THREESCORE = 3;

const CalculateBiShop = ({ navigation, route }) => {
  const [cervixDiamt, setCervixDiamt] = useState("");
  const [posCervix, setPosCervix] = useState("");
  const [effacement, setEffacement] = useState("");
  const [fetalStation, setFetalStation] = useState("");
  const [cervical, setCervical] = useState("");
  const [cervixScore, setCervixScore] = useState(0);
  const [positionScore, setPositionScore] = useState(0);
  const [effacementScore, setEffacementScore] = useState(0);
  const [fetalScore, setFetalScore] = useState(0);
  const [consistencyScore, setConsistencyScore] = useState(0);

  const [scoreBiShop, setScoreBiShop] = useState(null);
  const [zeroScore, setZeroScore] = useState("");
  const [oneTwoScore, setoneTwoScore] = useState("");
  const [threeFourScore, setthreeFourScore] = useState("");
  const [fiveSixScore, setfiveSixScore] = useState("");

  const dispatch = useDispatch();
  const BishopScoreResponse = useSelector(ScoreBishop.selectBishopScore);

 

  useEffect(() => {
    if (route?.params?.bishopData?.length > 0) {
      setBishopScoreData();
      setCervixScoreData();
      setPositionScoreData();
      setEffacementScoreData();
      setFetalScoreData();
      setConsitencyScoreData();
    }
  }, [route?.params?.bishopData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      dispatch(ScoreBishop.saveBishopScore(null));
    };
  }, [navigation]);

  useEffect(() => {
    if (BishopScoreResponse?.success == true) {
      navigation.goBack();
    }
  }, [BishopScoreResponse]);

  const TopScoreCardView = () => {
    return (
      <>
        <View style={styles.scoreContainerView}>
          <View style={styles.scoreOptionSubView}>
            <Text style={styles.scoreOptionLabelText}>0 = </Text>
            <Text style={styles.scoreOptionContentText}>{zeroScore}</Text>
          </View>

          <View style={styles.scoreOptionSubView}>
            <Text style={styles.scoreOptionLabelText}>1-2 = </Text>
            <Text style={styles.scoreOptionContentText}>{oneTwoScore}</Text>
          </View>
        </View>

        <View style={styles.scoreContainerView}>
          <View style={styles.scoreOptionSubView}>
            <Text style={styles.scoreOptionLabelText}>3-4 = </Text>
            <Text style={styles.scoreOptionContentText}>{threeFourScore}</Text>
          </View>

          <View style={styles.scoreOptionSubView}>
            <Text style={styles.scoreOptionLabelText}>5-6 = </Text>
            <Text style={styles.scoreOptionContentText}>{fiveSixScore}</Text>
          </View>
        </View>
      </>
    );
  };

  const onPressDiameter = (type) => {
    if (type == config.strings.OTHERS.O) {
      setCervixDiamt(config.strings.OTHERS.O);
      setCervixScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.ONETWO) {
      setCervixDiamt(config.strings.OTHERS.ONETWO);
      setCervixScore(ONESCORE);
    } else if (type == config.strings.OTHERS.THREEFOUR) {
      setCervixDiamt(config.strings.OTHERS.THREEFOUR);
      setCervixScore(TWOSCORE);
    } else if (type == config.strings.OTHERS.FIVESIX) {
      setCervixDiamt(config.strings.OTHERS.FIVESIX);
      setCervixScore(THREESCORE);
    }
  };

  const onPressPosition = (type) => {
    if (type == config.strings.OTHERS.POSTERION) {
      setPosCervix(config.strings.OTHERS.POSTERION);
      setPositionScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.MID_POSITION) {
      setPosCervix(config.strings.OTHERS.MID_POSITION);
      setPositionScore(ONESCORE);
    } else if (type == config.strings.OTHERS.ANTERIOR) {
      setPosCervix(config.strings.OTHERS.ANTERIOR);
      setPositionScore(TWOSCORE);
    }
  };

  const onPressEffacement = (type) => {
    if (type == config.strings.OTHERS.OTHIRTYPER) {
      setEffacement(config.strings.OTHERS.OTHIRTYPER);
      setEffacementScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.FORURTYPER) {
      setEffacement(config.strings.OTHERS.FORURTYPER);
      setEffacementScore(ONESCORE);
    } else if (type == config.strings.OTHERS.SIXTYPER) {
      setEffacement(config.strings.OTHERS.SIXTYPER);
      setEffacementScore(TWOSCORE);
    } else if (type == config.strings.OTHERS.EIGHTYPER) {
      setEffacement(config.strings.OTHERS.EIGHTYPER);
      setEffacementScore(THREESCORE);
    }
  };

  const onPressFetal = (type) => {
    if (type == config.strings.OTHERS.FETALONE) {
      setFetalStation(config.strings.OTHERS.FETALONE);
      setFetalScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.FETALTWO) {
      setFetalStation(config.strings.OTHERS.FETALTWO);
      setFetalScore(ONESCORE);
    } else if (type == config.strings.OTHERS.FETELTHREE) {
      setFetalStation(config.strings.OTHERS.FETELTHREE);
      setFetalScore(TWOSCORE);
    } else if (type == config.strings.OTHERS.FETELFOUR) {
      setFetalStation(config.strings.OTHERS.FETELFOUR);
      setFetalScore(THREESCORE);
    }
  };

  const onPressConsistency = (type) => {
    if (type == config.strings.OTHERS.FIRM) {
      setCervical(config.strings.OTHERS.FIRM);
      setConsistencyScore(ZEROSCORE);
    } else if (type == config.strings.OTHERS.MEDIUM) {
      setCervical(config.strings.OTHERS.MEDIUM);
      setConsistencyScore(ONESCORE);
    } else if (type == config.strings.OTHERS.SOFT) {
      setCervical(config.strings.OTHERS.SOFT);
      setConsistencyScore(TWOSCORE);
    }
  };

  const OptionsCardView = () => {
    return (
      <View style={styles.topScroreView}>
        <Text style={styles.labelText}>
          {config.strings.OTHERS.CERVIX_DIAMETER}
        </Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressDiameter("0")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                cervixDiamt == "0"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: cervixDiamt == "0" ? 0 : 1,
              borderColor:
                cervixDiamt == "0"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  cervixDiamt == "0"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.O}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressDiameter("1-2")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                cervixDiamt == "1-2"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: cervixDiamt == "1-2" ? 0 : 1,
              borderColor:
                cervixDiamt == "1-2"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  cervixDiamt == "1-2"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.ONETWO}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressDiameter("3-4")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                cervixDiamt == "3-4"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: cervixDiamt == "3-4" ? 0 : 1,
              borderColor:
                cervixDiamt == "3-4"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  cervixDiamt == "3-4"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.THREEFOUR}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressDiameter("5-6")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                cervixDiamt == "5-6"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: cervixDiamt == "5-6" ? 0 : 1,
              borderColor:
                cervixDiamt == "5-6"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  cervixDiamt == "5-6"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.FIVESIX}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>
          {config.strings.OTHERS.POSTION_CERVIX}
        </Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressPosition("posterion")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                posCervix == "posterion"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: posCervix == "posterion" ? 0 : 1,
              borderColor:
                posCervix == "posterion"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  posCervix == "posterion"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.POSTERION}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressPosition("mid position")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                posCervix == "mid position"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: posCervix == "mid position" ? 0 : 1,
              borderColor:
                posCervix == "mid position"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  posCervix == "mid position"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.MID_POSITION}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressPosition("anterior")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                posCervix == "anterior"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: posCervix == "anterior" ? 0 : 1,
              borderColor:
                posCervix == "anterior"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  posCervix == "anterior"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.ANTERIOR}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>{config.strings.OTHERS.EFFACMENT}</Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressEffacement("0-30%")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                effacement == "0-30%"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: effacement == "0-30%" ? 0 : 1,
              borderColor:
                effacement == "0-30%"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  effacement == "0-30%"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.OTHIRTYPER}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressEffacement("40%-50%")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                effacement == "40%-50%"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: effacement == "40%-50%" ? 0 : 1,
              borderColor:
                effacement == "40%-50%"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  effacement == "40%-50%"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.FORURTYPER}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressEffacement("60%-70%")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                effacement == "60%-70%"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: effacement == "60%-70%" ? 0 : 1,
              borderColor:
                effacement == "60%-70%"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  effacement == "60%-70%"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.SIXTYPER}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressEffacement(">80%")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                effacement == ">80%"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: effacement == ">80%" ? 0 : 1,
              borderColor:
                effacement == ">80%"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  effacement == ">80%"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.EIGHTYPER}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>
          {config.strings.OTHERS.FETATLSTATION}
        </Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressFetal("-3")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                fetalStation == "-3"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: fetalStation == "-3" ? 0 : 1,
              borderColor:
                fetalStation == "-3"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  fetalStation == "-3"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.FETALONE}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressFetal("-2")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                fetalStation == "-2"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: fetalStation == "-2" ? 0 : 1,
              borderColor:
                fetalStation == "-2"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  fetalStation == "-2"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.FETALTWO}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressFetal("-1,0")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                fetalStation == "-1,0"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: fetalStation == "-1,0" ? 0 : 1,
              borderColor:
                fetalStation == "-1,0"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  fetalStation == "-1,0"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.FETELTHREE}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressFetal("+1,+2")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                fetalStation == "+1,+2"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: fetalStation == "+1,+2" ? 0 : 1,
              borderColor:
                fetalStation == "+1,+2"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  fetalStation == "+1,+2"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.FETELFOUR}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>{config.strings.OTHERS.CERVICAL}</Text>

        <View style={styles.horziontalOptionContianer}>
          <Pressable
            onPress={() => onPressConsistency("firm")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                cervical == "firm"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: cervical == "firm" ? 0 : 1,
              borderColor:
                cervical == "firm"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  cervical == "firm"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.FIRM}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressConsistency("medium")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                cervical == "medium"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: cervical == "medium" ? 0 : 1,
              borderColor:
                cervical == "medium"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  cervical == "medium"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.MEDIUM}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onPressConsistency("soft")}
            style={{
              ...styles.horizontalOptionView,
              backgroundColor:
                cervical == "soft"
                  ? config.colors.appTheme1
                  : config.colors.white,
              borderWidth: cervical == "soft" ? 0 : 1,
              borderColor:
                cervical == "soft"
                  ? config.colors.white
                  : config.colors.textInputLabel,
            }}
          >
            <Text
              style={{
                ...styles.horizontalOptionText,
                color:
                  cervical == "soft"
                    ? config.colors.white
                    : config.colors.neutralBlack,
              }}
            >
              {config.strings.OTHERS.SOFT}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.labelText}>
          {config.strings.OTHERS.BISHOP_SCRORE}
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
            {cervixScore +
              positionScore +
              effacementScore +
              fetalScore +
              consistencyScore}
          </Text>
        </View>
      </View>
    );
  };

  const onPressSubmit = () => {
    const totalScore =
      cervixScore +
      positionScore +
      effacementScore +
      fetalScore +
      consistencyScore;

    const payload = {
      patientId: route?.params?.idPatient,
      cervixDiameter: cervixDiamt,
      positionOfCervix: posCervix,
      fatalStation: fetalStation,
      cervixConsistency: cervical,
      effacement: effacement,
      bishopScore: totalScore,
    };

    dispatch({ type: "ADD_BISHOP_SCORE", payload });
  };

  const setBishopScoreData = () => {
    const data = route?.params?.bishopData;
    data &&
      data.map((item, index) => {
        if (item?.cervixDiameter == config.strings.OTHERS.O) {
          setZeroScore(item?.bishopScore);
          setCervixDiamt(item?.cervixDiameter);
          setPosCervix(item?.positionOfCervix);
          setEffacement(item?.effacement);
          setFetalStation(item?.fatalStation);
          setCervical(item?.cervixConsistency);
        } else if (item?.cervixDiameter == config.strings.OTHERS.ONETWO) {
          setoneTwoScore(item?.bishopScore);
          setCervixDiamt(item?.cervixDiameter);
          setPosCervix(item?.positionOfCervix);
          setEffacement(item?.effacement);
          setFetalStation(item?.fatalStation);
          setCervical(item?.cervixConsistency);
        } else if (item?.cervixDiameter == config.strings.OTHERS.THREEFOUR) {
          setthreeFourScore(item?.bishopScore);
          setCervixDiamt(item?.cervixDiameter);
          setPosCervix(item?.positionOfCervix);
          setEffacement(item?.effacement);
          setFetalStation(item?.fatalStation);
          setCervical(item?.cervixConsistency);
        } else if (item?.cervixDiameter == config.strings.OTHERS.FIVESIX) {
          setfiveSixScore(item?.bishopScore);
          setCervixDiamt(item?.cervixDiameter);
          setPosCervix(item?.positionOfCervix);
          setEffacement(item?.effacement);
          setFetalStation(item?.fatalStation);
          setCervical(item?.cervixConsistency);
        }
      });
  };

  const setCervixScoreData = () => {
    const data = route?.params?.bishopData;
    data &&
      data.map((item, index) => {
        if (item?.cervixDiameter == config.strings.OTHERS.O) {
          setCervixScore(ZEROSCORE);
        } else if (item?.cervixDiameter == config.strings.OTHERS.ONETWO) {
          setCervixScore(ONESCORE);
        } else if (item?.cervixDiameter == config.strings.OTHERS.THREEFOUR) {
          setCervixScore(TWOSCORE);
        } else if (item?.cervixDiameter == config.strings.OTHERS.FIVESIX) {
          setCervixScore(THREESCORE);
        }
      });
  };

  const setPositionScoreData = () => {
    const data = route?.params?.bishopData;
    data &&
      data.map((item, index) => {
        if (item?.positionOfCervix == config.strings.OTHERS.POSTERION) {
          setPositionScore(ZEROSCORE);
        } else if (
          item?.positionOfCervix == config.strings.OTHERS.MID_POSITION
        ) {
          setPositionScore(ONESCORE);
        } else if (item?.positionOfCervix == config.strings.OTHERS.ANTERIOR) {
          setPositionScore(TWOSCORE);
        }
      });
  };

  const setEffacementScoreData = () => {
    const data = route?.params?.bishopData;
    data &&
      data.map((item, index) => {
        if (item?.effacement == config.strings.OTHERS.OTHIRTYPER) {
          setEffacementScore(ZEROSCORE);
        } else if (item?.effacement == config.strings.OTHERS.FORURTYPER) {
          setEffacementScore(ONESCORE);
        } else if (item?.effacement == config.strings.OTHERS.SIXTYPER) {
          setEffacementScore(TWOSCORE);
        } else if (item?.effacement == config.strings.OTHERS.EIGHTYPER) {
          setEffacementScore(THREESCORE);
        }
      });
  };

  const setFetalScoreData = () => {
    const data = route?.params?.bishopData;
    data &&
      data.map((item, index) => {
        if (item?.fatalStation == config.strings.OTHERS.FETALONE) {
          setFetalScore(ZEROSCORE);
        } else if (item?.fatalStation == config.strings.OTHERS.FETALTWO) {
          setFetalScore(ONESCORE);
        } else if (item?.fatalStation == config.strings.OTHERS.FETELTHREE) {
          setFetalScore(TWOSCORE);
        } else if (item?.fatalStation == config.strings.OTHERS.FETELFOUR) {
          setFetalScore(THREESCORE);
        }
      });
  };

  const setConsitencyScoreData = () => {
    const data = route?.params?.bishopData;
    data &&
      data.map((item, index) => {
        if (item?.cervixConsistency == config.strings.OTHERS.FIRM) {
          setConsistencyScore(ZEROSCORE);
        } else if (item?.cervixConsistency == config.strings.OTHERS.MEDIUM) {
          setConsistencyScore(ONESCORE);
        } else if (item?.cervixConsistency == config.strings.OTHERS.SOFT) {
          setConsistencyScore(TWOSCORE);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.topScroreView}>
          <Text style={styles.labelText}>
            {config.strings.OTHERS.BISHOP_SCRORE}
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
    textTransform: "capitalize",
  },
  submitBtnContainer: { marginHorizontal: 20, marginVertical: 20 },
});

export default CalculateBiShop;
