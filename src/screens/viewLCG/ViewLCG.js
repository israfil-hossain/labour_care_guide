import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import fontFamily from "../../config/fontFamily";
import config from "../../config";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { User, ParityList, ReportLcg } from "../../reduxStates";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as ScreenOrientation from "expo-screen-orientation";

const STARTED = "started";
const NOT_STARTED = "not-started";
const COMPLETED = "delivery-completed";

var id = 1;

const ViewLcg = ({ navigation, route }) => {
  const [slotsTime, setSlotsTime] = useState([]);
  //first phase states
  const [baslineFhrData, setBaslineFhrData] = useState([]);
  const [pulseData, setPulseData] = useState([]);
  const [sysBpData, setSysBpData] = useState([]);
  const [diaBpData, setDiaBpData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [contraTenMinData, setContraTenMinData] = useState([]);
  const [contraData, setContraData] = useState([]);
  const [cervixData, setCervixData] = useState([]);
  const [decentData, setDecentData] = useState([]);
  const [supprotivedata, setsupprotivedata] = useState([]);
  const [amnioticFluid, setamnioticFluiddata] = useState([]);
  const [fetalPosition, setfetalPositiondata] = useState([]);
  const [caput, setcaputdata] = useState([]);
  const [moulding, setmouldingdata] = useState([]);
  const [urineWomen, setUrinedata] = useState([]);
  const [declareFHR, setDeclareFHR] = useState([]);
  const [decisionMaking, setDecisionMaking] = useState([]);
  const [initialLCG, seInitialsLCG] = useState([]);
  const [oxytcoin, setOxytCoin] = useState([]);
  const [fourFluid, setFourFluid] = useState([]);

  //second phase states
  const [secondslotsTime, setSecondSlotsTime] = useState([]);
  const [suppDataSecond, setsuppDataSecond] = useState([]);
  const [baslineFhrDataSecond, setBaslineFhrDataSecond] = useState([]);
  const [declareFHRSecondTemp, setDeclareFHRSecondTemp] = useState([]);
  const [pulseDataSecond, setPulseDataSecond] = useState([]);
  const [sysBpDataSecond, setSysBpDataSecond] = useState([]);
  const [diaBpDataSecond, setDiaBpDataSecond] = useState([]);
  const [tempDataSecond, setTempDataSecond] = useState([]);
  const [contraTenMinDataSecond, setContraTenMinDataSecond] = useState([]);
  const [contraDataSecond, setContraDataSecond] = useState([]);
  const [cervixDataSecond, setCervixDataSecond] = useState([]);
  const [decentDataSecond, setDecentDataSecond] = useState([]);
  const [amniFluidSecond, setamniFluidSecond] = useState([]);
  const [fetalSecond, setfetalSecond] = useState([]);
  const [caputSecond, setcaputSecond] = useState([]);
  const [mouldSecond, setmouldSecond] = useState([]);
  const [urineSecond, seturineSecond] = useState([]);
  const [decisionMakingSecond, setDecisionMakingSecond] = useState([]);
  const [initialLCGSecond, seInitialsLCGSecond] = useState([]);
  const [oxytcoinSecond, setOxytCoinSecond] = useState([]);
  const [fourFluidSecond, setFourFluidSecond] = useState([]);

  const [expanddetail, setExpandetail] = useState(false);
  const [currentOrientation, setOrintation] = useState();

  const dispatch = useDispatch();
  const LcgReportData = useSelector(ReportLcg.selectLcgReport);
  const myRef = useRef(null);
  const myOptionRef = useRef(null);

  // console.log("Fgtyy", LcgReportData?.data?.labourProgress);

  const _onOrientationDidChange = ({ orientationInfo }) => {
    //console.log("Oeinttaion", orientationInfo.orientation);
    const orientation = orientationInfo.orientation;
    if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
        orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN ||
        orientation === ScreenOrientation.Orientation.UNKNOWN) {
      //do something with portrait layout
      setOrintation("PORTRAIT");
    } else {
      setOrintation("LANDSCAPE");
      //do something with landscape layout
    }
  };

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(_onOrientationDidChange);
    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await ScreenOrientation.unlockAsync();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, [navigation]);

  useEffect(() => {
    if (LcgReportData?.success == true) {
      filterOneHourData();
      setHalfHourData();
      setHalfHourBaselineFhrData();
      getHalfHourBaselineFhrAlert();
      getHalfHourFhrDecAlert();
      setHalfHourContaTenMinData();
      setHalfHourContaDurationData();
      getHalfHourContractionAlert();
      getHalfHourContractionDurationAlert();
      filterOneHourDataSecondPhase();
      setFhrDeclSecColumn();
    }
  }, [LcgReportData]);

  useEffect(() => {
    callLcgReportApi();
  }, []);

  const callLcgReportApi = () => {
    const payload = {
      uri: `${route?.params?.patId}`,
    };
    dispatch({
      type: "VIEW_LCG",
      payload,
    });
  };

  const PatientDetailCard = () => {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => setExpandetail(!expanddetail)}
          style={styles.hideshowconatiner}
        >
          <Text style={styles.patNameText}>{LcgReportData?.data?.name}</Text>
          <Image
            source={
              expanddetail == true
                ? require("../../assets/images/UpArrow.png")
                : require("../../assets/images/DownArrow.png")
            }
            style={styles.downArrImage}
          />
        </Pressable>
        <View style={styles.patIdAgeView}>
          <View style={styles.patIdAgeSubView}>
            <Text style={styles.labelText}>Pateint Id:</Text>
            <Text style={styles.contentText}>
              {LcgReportData?.data?.patientId}
            </Text>
          </View>
          <View style={{ ...styles.patIdAgeSubView, marginLeft: 10 }}>
            <Text style={styles.labelText}>Age:</Text>
            <Text style={styles.contentText}>{LcgReportData?.data?.age}</Text>
          </View>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>UHID:</Text>
          <Text style={styles.contentText}>{LcgReportData?.data?.UHID}</Text>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Ward Name:</Text>
          <Text style={styles.contentText}>
            {LcgReportData?.data?.wardName}
          </Text>
        </View>

        {expanddetail == true && (
          <>
            <View style={styles.viewMedication}>
              <View style={styles.patIdAgeSubView}>
                <Text style={styles.labelText}>Obstetric Formula:</Text>
                <Text style={styles.contentText}>
                  {LcgReportData?.data?.obstetricFormula}
                </Text>
              </View>
              <Pressable
                onPress={() =>
                  navigation.navigate(config.routes.VIEW_PARITY, {
                    patId: LcgReportData?.data?.patientId,
                  })
                }
              >
                <Text style={styles.biShopcontentText}>
                  {config.strings.OTHERS.VIEW_PARITY}
                </Text>
              </Pressable>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Labour Onset:</Text>
              <Text style={styles.contentText}>
                {LcgReportData?.data?.labourOnSet?.time != null &&
                  moment(
                    new Date(LcgReportData?.data?.labourOnSet?.time)
                  ).format("YYYY-MM-DD")}
                ,{"  "}
                {LcgReportData?.data?.labourOnSet?.time != null &&
                  moment(
                    new Date(LcgReportData?.data?.labourOnSet?.time),
                    "HH:mm"
                  ).format("hh:mm A")}
              </Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Active Labour Diagnosis</Text>
              <Text style={styles.contentText}>
                {LcgReportData?.data?.activeLabourDignosis?.time != null &&
                  moment(
                    new Date(LcgReportData?.data?.activeLabourDignosis?.time)
                  ).format("YYYY-MM-DD")}
                ,{"  "}
                {LcgReportData?.data?.activeLabourDignosis?.time != null &&
                  moment(
                    new Date(LcgReportData?.data?.activeLabourDignosis?.time),
                    "HH:mm"
                  ).format("hh:mm A")}
              </Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Ruptured Membrane:</Text>
              <Text style={styles.contentText}>
                {LcgReportData?.data?.membrane?.time != null &&
                  moment(new Date(LcgReportData?.data?.membrane?.time)).format(
                    "YYYY-MM-DD"
                  )}
                ,{"  "}
                {LcgReportData?.data?.membrane?.time != null &&
                  moment(
                    new Date(LcgReportData?.data?.membrane?.time),
                    "HH:mm"
                  ).format("hh:mm A")}
              </Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Risk Factors:</Text>
              <Text style={styles.contentText}>
                {LcgReportData?.data?.riskFactor}
              </Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Contraceptives used:</Text>
              <Text style={styles.contentText}>
                {LcgReportData?.data?.contraceptivesUsed}
              </Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Date of Admission:</Text>
              <Text style={styles.contentText}>
                {LcgReportData?.data?.dateOfAdmission}
              </Text>
            </View>

            {LcgReportData?.data?.labourStatus == COMPLETED && (
              <View style={styles.patIdAgeSubView}>
                <Text style={styles.labelText}>Date and Time of Delivery:</Text>
                <Text style={styles.contentText}>
                  {LcgReportData?.data?.delivery?.time != null &&
                    moment(
                      new Date(LcgReportData?.data?.delivery?.time)
                    ).format("YYYY-MM-DD")}
                  ,{"  "}
                  {LcgReportData?.data?.delivery?.time != null &&
                    moment(
                      new Date(LcgReportData?.data?.delivery?.time),
                      "HH:mm"
                    ).format("hh:mm A")}
                </Text>
              </View>
            )}

            <View style={styles.biShopConatiner}>
              <View style={styles.bioScroreButtonContainer}>
                <Text style={styles.biShopHeadigText}>
                  {config.strings.OTHERS.BISHOP_SCRORING}
                </Text>
              </View>
              {LcgReportData?.data?.bishopScores?.length > 0 &&
                LcgReportData?.data?.bishopScores?.map((itemScore, ind) => (
                  <View style={styles.patIdAgeSubView}>
                    <Text style={styles.bioShopLabelText}>
                      Cervix Diameter {itemScore?.cervixDiameter}
                    </Text>
                    <Text style={styles.biShopcontentText}>
                      = {itemScore?.bishopScore}
                    </Text>
                  </View>
                ))}
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate(config.routes.MEDICATION_LIST, {
                  patId: LcgReportData?.data?.patientId,
                })
              }
              style={styles.biShopConatiner}
            >
              <View style={styles.viewMedication}>
                <Text style={styles.bioShopLabelText}>
                  {config.strings.OTHERS.OTHER_MDEICATION}
                </Text>
                <View style={styles.medicationSubView}>
                  <Image
                    source={require("../../assets/images/RightArrow.png")}
                    style={styles.rightArrowImg}
                  />
                </View>
              </View>
            </Pressable>
          </>
        )}
      </View>
    );
  };

  const TimeHoursView = () => {
    return (
      <>
        <ScrollView
          horizontal={true}
          ref={myRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
            }}
          >
            <View style={styles.timeHourMainConatiner}>
              {slotsTime?.map((item, index) => {
                return (
                  <View style={styles.timeHourSubView}>
                    <View style={styles.rowColumnView}>
                      <Text style={styles.tabelText}>
                        {item?.dateTime != null &&
                          moment(new Date(item?.dateTime), "HH:mm").format(
                            "hh:mm A"
                          )}
                      </Text>
                    </View>

                    <Text style={{ textAlign: "right", fontSize: 11 }}>
                      {item?.hour}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginHorizontal: 10,
              }}
            >
              {secondslotsTime?.map((item, index) => {
                return (
                  <View style={styles.timeHourSubView}>
                    <View style={styles.rowColumnView}>
                      <Text style={styles.tabelText}>
                        {item?.dateTime != null &&
                          moment(new Date(item?.dateTime), "HH:mm").format(
                            "hh:mm A"
                          )}
                      </Text>
                    </View>

                    <Text style={{ textAlign: "right", fontSize: 11 }}>
                      {item?.hour}
                    </Text>
                  </View>
                );
              })}
            </View> */}
          </View>
        </ScrollView>
      </>
    );
  };

  const SupprotiveCareView = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            bottom: 10,
            marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
          }}
        >
          <View style={styles.timeHourMainConatiner}>
            {supprotivedata?.map((item, index) => {
              return (
                <View style={styles.timeHourSubView}>
                  <View style={styles.rowColumnView}>
                    <Text
                      style={{
                        color:
                          item?.companionshipAlert == true ? "red" : "black",
                      }}
                    >
                      {item?.companionship}
                    </Text>
                  </View>
                  <View style={styles.rowColumnView}>
                    <Text
                      style={{
                        color: item?.painReliefAlert == true ? "red" : "black",
                      }}
                    >
                      {item?.painRelief}
                    </Text>
                  </View>
                  <View style={styles.rowColumnView}>
                    <Text
                      style={{
                        color: item?.oralFluidAlert == true ? "red" : "black",
                      }}
                    >
                      {item?.oralFluid}
                    </Text>
                  </View>
                  <View style={styles.rowColumnView}>
                    <Text
                      style={{
                        color: item?.postureAlert == true ? "red" : "black",
                      }}
                    >
                      {item?.posture}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* {suppDataSecond?.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginHorizontal: 10,
              }}
            >
              {suppDataSecond?.map((item, index) => {
                return (
                  <View style={styles.timeHourSubView}>
                    <View style={styles.rowColumnView}>
                      <Text>{item?.companionship}</Text>
                    </View>
                    <View style={styles.rowColumnView}>
                      <Text>{item?.painRelief}</Text>
                    </View>
                    <View style={styles.rowColumnView}>
                      <Text>{item?.oralFluid}</Text>
                    </View>
                    <View style={styles.rowColumnView}>
                      <Text>{item?.posture}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )} */}
        </View>
      </View>
    );
  };

  // const setBaseFhrDataLabel = () => {
  //   if (LcgReportData?.data?.baby?.baselineFHR?.length > 0) {
  //     const resLabel = LcgReportData?.data?.baby?.baselineFHR?.map(
  //       (item, indx) => String(item?.hour)
  //     );
  //     setBaslineFhrLabel(resLabel && resLabel.reverse());
  //   }
  // };

  // const setWomenDataLabel = () => {
  //   if (LcgReportData?.data?.women?.pulse?.length > 0) {
  //     const resPulse = LcgReportData?.data?.women?.pulse?.filter((item) =>
  //       Number.isInteger(item?.hour)
  //     );
  //     const resLabel = resPulse?.map((item, indx) => String(item?.hour));
  //     setPulseLabel(resLabel && resLabel.reverse());
  //     const resData = resPulse?.map((item, indx) => item?.pulse);
  //     setPulseData(resData && resData.reverse());
  //   }
  //   if (LcgReportData?.data?.women?.systolicBP?.length > 0) {
  //     const ressystolicBP = LcgReportData?.data?.women?.systolicBP?.filter(
  //       (item) => Number.isInteger(item?.hour)
  //     );
  //     const resLabel = ressystolicBP?.map((item, indx) => String(item?.hour));
  //     setSysBpLabel(resLabel && resLabel.reverse());
  //     const resData = ressystolicBP?.map((item, indx) => item?.systolicBP);
  //     setSysBpData(resData && resData.reverse());
  //   }
  //   if (LcgReportData?.data?.women?.diastolicBP?.length > 0) {
  //     const resdialBp = LcgReportData?.data?.women?.diastolicBP?.filter(
  //       (item) => Number.isInteger(item?.hour)
  //     );
  //     const resLabel = resdialBp?.map((item, indx) => String(item?.hour));
  //     setDiaBpLabel(resLabel && resLabel.reverse());
  //     const resData = resdialBp?.map((item, indx) => item?.diastolicBP);
  //     setDiaBpData(resData && resData.reverse());
  //   }
  //   if (LcgReportData?.data?.women?.temperature?.length > 0) {
  //     const resTemp = LcgReportData?.data?.women?.temperature?.filter((item) =>
  //       Number.isInteger(item?.hour)
  //     );
  //     const resLabel = resTemp?.map((item, indx) => String(item?.hour));
  //     setTempLabel(resLabel && resLabel.reverse());
  //     const resData = resTemp?.map((item, indx) => item?.temperature);
  //     setTempData(resData && resData.reverse());
  //   }
  //   if (LcgReportData?.data?.women?.urine?.length > 0) {
  //     const resUrine = LcgReportData?.data?.women?.urine?.filter((item) =>
  //       Number.isInteger(item?.hour)
  //     );
  //     setUrinedata(resUrine && resUrine.reverse());
  //   }
  //   if (LcgReportData?.data?.women?.contractionDuration?.length > 0) {
  //     const resContraTen = LcgReportData?.data?.women?.contractionDuration?.map(
  //       (item, indx) => String(item?.hour)
  //     );
  //     setContraTenMinLabel(resContraTen && resContraTen.reverse());
  //     const resTenMinData =
  //       LcgReportData?.data?.women?.contractionDuration?.map(
  //         (item, indx) => item?.contractionDuration
  //       );
  //     setContraTenMinData(resTenMinData && resTenMinData.reverse());
  //   }
  //   if (LcgReportData?.data?.women?.contraction?.length > 0) {
  //     const resContra = LcgReportData?.data?.women?.contraction?.map(
  //       (item, indx) => String(item?.hour)
  //     );
  //     setContraLabel(resContra && resContra.reverse());
  //     const resContraData = LcgReportData?.data?.women?.contraction?.map(
  //       (item, indx) => item?.contraction
  //     );
  //     setContraData(resContraData && resContraData.reverse());
  //   }
  //   if (LcgReportData?.data?.labourProgress?.cervix?.length > 0) {
  //     const resCervixLabel = LcgReportData?.data?.labourProgress?.cervix?.map(
  //       (item, indx) => String(item?.hour)
  //     );
  //     setCervixLabel(resCervixLabel && resCervixLabel.reverse());
  //     const resCervixData = LcgReportData?.data?.labourProgress?.cervix?.map(
  //       (item, indx) => item?.cervix
  //     );
  //     setCervixData(resCervixData && resCervixData.reverse());
  //   }
  //   if (LcgReportData?.data?.labourProgress?.decent?.length > 0) {
  //     const resDescentLabel = LcgReportData?.data?.labourProgress?.decent?.map(
  //       (item, indx) => String(item?.hour)
  //     );
  //     setDecentLabel(resDescentLabel && resDescentLabel.reverse());
  //     const resDecentData = LcgReportData?.data?.labourProgress?.decent?.map(
  //       (item, indx) => item?.decent
  //     );
  //     setDecentData(resDecentData && resDecentData.reverse());
  //   }
  // };

  const BabySectionView = () => {
    return (
      <>
        {baslineFhrData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 15,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {baslineFhrData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.baselineFHRAlert == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {item?.baselineFHR}
                          </Text>
                          <View style={styles.dotSperator}></View>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                getHalfHourBaselineFhrAlert(item?.hour) == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {setHalfHourBaselineFhrData(item?.hour)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {baslineFhrDataSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {baslineFhrDataSecond?.map((item, index) => {
                    return (
                      <View style={[styles.fhrDeclareView, { width: 100 }]}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                          }}
                        >
                          {item?.values?.map((_item, indx) => (
                            <View style={styles.fhrTableSubView}>
                              <Text style={styles.tabelText}>
                                {_item?.baselineFHR}
                              </Text>
                              <View style={styles.dotSperator}></View>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}
      </>
    );
  };

  const setHalfHourData = (_time) => {
    let hour = _time + 0.5;
    const res = LcgReportData?.data?.baby?.FHRDeceleration?.filter(
      (item) => item?.hour == hour
    );
    return res[0]?.FHRDeceleration;
  };

  const setHalfHourBaselineFhrData = (_time) => {
    let hour = _time + 0.5;
    const res = LcgReportData?.data?.baby?.baselineFHR?.filter(
      (item) => item?.hour == hour
    );
    return res[0]?.baselineFHR;
  };

  const getHalfHourBaselineFhrAlert = (_time) => {
    let hour = _time + 0.5;
    const res = LcgReportData?.data?.baby?.baselineFHR?.filter(
      (item) => item?.hour == hour
    );
    return res[0]?.baselineFHRAlert;
  };

  const getHalfHourFhrDecAlert = (_time) => {
    let hour = _time + 0.5;
    const res = LcgReportData?.data?.baby?.FHRDeceleration?.filter(
      (item) => item?.hour == hour
    );
    return res[0]?.FHRDecelerationAlert;
  };

  const setHalfHourContaTenMinData = (_time) => {
    let hour = _time + 0.5;
    const res = LcgReportData?.data?.women?.contraction?.filter(
      (item) => item?.hour == hour
    );

    return res[0]?.contraction;
  };

  const setHalfHourContaDurationData = (_time) => {
    let hour = _time + 0.5;
    const res = LcgReportData?.data?.women?.contractionDuration?.filter(
      (item) => item?.hour == hour
    );

    return res[0]?.contractionDuration;
  };

  const getHalfHourContractionAlert = (_time) => {
    let hour = _time + 0.5;
    const res = LcgReportData?.data?.women?.contraction?.filter(
      (item) => item?.hour == hour
    );
    return res[0]?.contractionAlert;
  };

  const getHalfHourContractionDurationAlert = (_time) => {
    let hour = _time + 0.5;
    const res = LcgReportData?.data?.women?.contractionDuration?.filter(
      (item) => item?.hour == hour
    );
    return res[0]?.contractionDurationAlert;
  };

  const setFhrDeclSecColumn = (value) => {
    const arrBaseline = LcgReportData?.data?.baby?.baselineFHR?.filter(
      (item) => item?.hour > 12
    );
    const newArrarrBaseline = [];
    arrBaseline.forEach((val) => {
      const objIndex = newArrarrBaseline.findIndex(
        (a) => a.key === Math.ceil(val.hour)
      );
      if (objIndex !== -1) {
        const valueArr = newArrarrBaseline[objIndex].values;
        valueArr.push(val);
        newArrarrBaseline[objIndex].values = valueArr;
      } else {
        const newObj = { key: Math.ceil(val.hour), values: [val] };
        newArrarrBaseline.push(newObj);
      }
    });

    setBaslineFhrDataSecond(newArrarrBaseline && newArrarrBaseline?.reverse());

    const arr = LcgReportData?.data?.baby?.FHRDeceleration?.filter(
      (item) => item?.hour > 12
    );
    const newArr = [];
    arr.forEach((val) => {
      const objIndex = newArr.findIndex((a) => a.key === Math.ceil(val.hour));
      if (objIndex !== -1) {
        const valueArr = newArr[objIndex].values;
        valueArr.push(val);
        newArr[objIndex].values = valueArr;
      } else {
        const newObj = { key: Math.ceil(val.hour), values: [val] };
        newArr.push(newObj);
      }
    });

    setDeclareFHRSecondTemp(newArr && newArr?.reverse());
  };

  const BabySectionDetailView = () => {
    return (
      <>
        {declareFHR?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 35,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {declareFHR?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.FHRDecelerationAlert == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {item?.FHRDeceleration}
                          </Text>
                          <View style={styles.dotSperator}></View>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                getHalfHourFhrDecAlert(item?.hour) == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {setHalfHourData(item?.hour)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {declareFHRSecondTemp?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {declareFHRSecondTemp?.map((item, index) => {
                    return (
                      <View style={[styles.fhrDeclareView, { width: 100 }]}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                          }}
                        >
                          {item?.values?.map((_item, indx) => (
                            <View style={styles.fhrTableSubView}>
                              <Text style={styles.tabelText}>
                                {_item?.FHRDeceleration}
                              </Text>
                              <View style={styles.dotSperator}></View>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}

        {amnioticFluid?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 55,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {amnioticFluid?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.amnioticFluidAlert == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {item?.amnioticFluid}
                          </Text>
                        </View>
                      </View>
                      {/* <Text style={{ textAlign: "right", fontSize: 11 }}>
                          {item?.hour}
                        </Text> */}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {amniFluidSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {amniFluidSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>
                              {item?.amnioticFluid}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}

        {fetalPosition?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 75,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {fetalPosition?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.fetalPositionAlert == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {item?.fetalPosition}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {fetalSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {fetalSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>
                              {item?.fetalPosition}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}

        {caput?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 95,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {caput?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color: item?.caputAlert == true ? "red" : "black",
                            }}
                          >
                            {item?.caput}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {caputSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {caputSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>{item?.caput}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}

        {moulding?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 115,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {moulding?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.mouldingAlert == true ? "red" : "black",
                            }}
                          >
                            {item?.moulding}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {mouldSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {mouldSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>
                              {item?.moulding}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}
      </>
    );
  };

  const filterOneHourData = () => {
    const res = LcgReportData?.data?.supportiveCare?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setsupprotivedata(res && res.reverse());
    const resAmniFluid = LcgReportData?.data?.baby?.amnioticFluid?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setamnioticFluiddata(resAmniFluid && resAmniFluid.reverse());
    const resFetal = LcgReportData?.data?.baby?.fetalPosition?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setfetalPositiondata(resFetal && resFetal.reverse());
    const resCaput = LcgReportData?.data?.baby?.caput?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setcaputdata(resCaput && resCaput.reverse());
    const resMould = LcgReportData?.data?.baby?.moulding?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setmouldingdata(resMould && resMould.reverse());
    const resData = LcgReportData?.data?.baby?.baselineFHR?.filter(
      (item, indx) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setBaslineFhrData(resData && resData.reverse());
    const resFHRDeclare = LcgReportData?.data?.baby?.FHRDeceleration?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setDeclareFHR(resFHRDeclare && resFHRDeclare.reverse());
    const resDecision = LcgReportData?.data?.decision.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setDecisionMaking(resDecision && resDecision.reverse());
    const resInitial = LcgReportData?.data?.initials.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    seInitialsLCG(resInitial && resInitial.reverse());
    const resOxytcoin = LcgReportData?.data?.medication?.oxytocin.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setOxytCoin(resOxytcoin && resOxytcoin.reverse());
    const resIvFluid = LcgReportData?.data?.medication?.ivFluids.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setFourFluid(resIvFluid && resIvFluid.reverse());
    const resTimeSlots = LcgReportData?.data?.timeSlots.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setSlotsTime(resTimeSlots && resTimeSlots.reverse());

    const resPulse = LcgReportData?.data?.women?.pulse?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setPulseData(resPulse && resPulse.reverse());
    const ressystolicBP = LcgReportData?.data?.women?.systolicBP?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setSysBpData(ressystolicBP && ressystolicBP.reverse());
    const resdialBp = LcgReportData?.data?.women?.diastolicBP?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setDiaBpData(resdialBp && resdialBp.reverse());
    const resTemp = LcgReportData?.data?.women?.temperature?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setTempData(resTemp && resTemp.reverse());
    const resUrine = LcgReportData?.data?.women?.urine?.filter(
      (item) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setUrinedata(resUrine && resUrine.reverse());
    const resContraData = LcgReportData?.data?.women?.contraction?.filter(
      (item, indx) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setContraData(resContraData && resContraData.reverse());
    const resContraTen =
      LcgReportData?.data?.women?.contractionDuration?.filter(
        (item, indx) => item?.hour <= 12 && Number.isInteger(item?.hour)
      );
    setContraTenMinData(resContraTen && resContraTen.reverse());
    const resCervixData = LcgReportData?.data?.labourProgress?.cervix?.filter(
      (item, indx) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setCervixData(resCervixData && resCervixData.reverse());
    const resDecentData = LcgReportData?.data?.labourProgress?.decent?.filter(
      (item, indx) => item?.hour <= 12 && Number.isInteger(item?.hour)
    );
    setDecentData(resDecentData && resDecentData.reverse());
  };

  const filterOneHourDataSecondPhase = () => {
    const res = LcgReportData?.data?.supportiveCare?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setsuppDataSecond(res && res.reverse());

    const resFuidAmni = LcgReportData?.data?.baby?.amnioticFluid?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setamniFluidSecond(resFuidAmni && resFuidAmni.reverse());
    const resFetal = LcgReportData?.data?.baby?.fetalPosition?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setfetalSecond(resFetal && resFetal.reverse());
    const resCaput = LcgReportData?.data?.baby?.caput?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setcaputSecond(resCaput && resCaput.reverse());
    const resmoulding = LcgReportData?.data?.baby?.moulding?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setmouldSecond(resmoulding && resmoulding.reverse());
    const resurine = LcgReportData?.data?.women?.urine?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    seturineSecond(resurine && resurine.reverse());
    const resOxytcoin = LcgReportData?.data?.medication?.oxytocin?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setOxytCoinSecond(resOxytcoin && resOxytcoin.reverse());
    const resFluidFour = LcgReportData?.data?.medication?.ivFluids?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setFourFluidSecond(resFluidFour && resFluidFour.reverse());
    const resDesMak = LcgReportData?.data?.decision?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setDecisionMakingSecond(resDesMak && resDesMak.reverse());
    const resInitials = LcgReportData?.data?.initials?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    seInitialsLCGSecond(resInitials && resInitials.reverse());
    const resTimeSlots = LcgReportData?.data?.timeSlots.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setSecondSlotsTime(resTimeSlots && resTimeSlots.reverse());

    const resPulse = LcgReportData?.data?.women?.pulse?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setPulseDataSecond(resPulse && resPulse.reverse());
    const ressystolicBP = LcgReportData?.data?.women?.systolicBP?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setSysBpDataSecond(ressystolicBP && ressystolicBP.reverse());
    const resdialBp = LcgReportData?.data?.women?.diastolicBP?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setDiaBpDataSecond(resdialBp && resdialBp.reverse());
    const resTemp = LcgReportData?.data?.women?.temperature?.filter(
      (item) => item?.hour > 12 && Number.isInteger(item?.hour)
    );
    setTempDataSecond(resTemp && resTemp.reverse());
  };

  const WomenSectionDetailView = () => {
    return (
      <>
        {pulseData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 125,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {pulseData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color: item?.pulseAlert == true ? "red" : "black",
                            }}
                          >
                            {item?.pulse}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {pulseDataSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {pulseDataSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>{item?.pulse}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}

        {sysBpData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 145,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {sysBpData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.systolicBPAlert == true ? "red" : "black",
                            }}
                          >
                            {item?.systolicBP}
                          </Text>
                        </View>
                      </View>
                      {/* <Text style={{ textAlign: "right", fontSize: 11 }}>
                          {item?.hour}
                        </Text> */}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {sysBpDataSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {sysBpDataSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>
                              {item?.systolicBP}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}

        {diaBpData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 165,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {diaBpData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.diastolicBPAlert == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {item?.diastolicBP}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {diaBpDataSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {diaBpDataSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>
                              {item?.diastolicBP}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}

        {tempData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 185,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {tempData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.temperatureAlert == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {item?.temperature}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {tempDataSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {tempDataSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>
                              {item?.temperature}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}

        {urineWomen?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 205,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {urineWomen?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color: item?.urineAlert == true ? "red" : "black",
                            }}
                          >
                            {item?.urine}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {urineSecond?.length > 0 && (
              <View
                style={{
                  ...styles.babyContanerView,
                  bottom: 18,
                  marginHorizontal: 5,
                }}
              >
                <Text style={styles.chartsLabelText}></Text>
                <View style={styles.timeHourMainConatiner}>
                  {urineSecond?.map((item, index) => {
                    return (
                      <View style={styles.timeHourSubView}>
                        <View style={styles.fhrDeclareView}>
                          <View style={styles.fhrTableSubView}>
                            <Text style={styles.tabelText}>{item?.urine}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */}
          </View>
        )}
      </>
    );
  };

  const LabourProgressDetailView = () => {
    return (
      <>
        {contraData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 210,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {contraData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.contractionAlert == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {item?.contraction}
                          </Text>
                          <View style={styles.dotSperator}></View>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                getHalfHourContractionAlert(item?.hour) == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {setHalfHourContaTenMinData(item?.hour)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {urineSecond?.length > 0 && (
                <View style={{ ...styles.babyContanerView, marginLeft: 30 }}>
                  <Text style={styles.chartsLabelText}></Text>
                  <View style={styles.timeHourMainConatiner}>
                    {urineSecond?.map((item, index) => {
                      return (
                        <View style={styles.timeHourSubView}>
                          <View style={styles.fhrDeclareView}>
                            <View style={styles.fhrTableSubView}>
                              <Text style={styles.tabelText}>
                                {item?.urine}
                              </Text>
                            </View>
                          </View>
                          <Text style={{ textAlign: "right" }}>
                            {item?.hour}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )} */}
          </View>
        )}

        {contraTenMinData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 230,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {contraTenMinData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.contractionDurationAlert == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {item?.contractionDuration}
                          </Text>
                          <View style={styles.dotSperator}></View>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                getHalfHourContractionDurationAlert(
                                  item?.hour
                                ) == true
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {setHalfHourContaTenMinData(item?.hour)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {urineSecond?.length > 0 && (
                <View style={{ ...styles.babyContanerView, marginLeft: 30 }}>
                  <Text style={styles.chartsLabelText}></Text>
                  <View style={styles.timeHourMainConatiner}>
                    {urineSecond?.map((item, index) => {
                      return (
                        <View style={styles.timeHourSubView}>
                          <View style={styles.fhrDeclareView}>
                            <View style={styles.fhrTableSubView}>
                              <Text style={styles.tabelText}>
                                {item?.urine}
                              </Text>
                            </View>
                          </View>
                          <Text style={{ textAlign: "right" }}>
                            {item?.hour}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )} */}
          </View>
        )}

        {cervixData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 250,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {cervixData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text
                            style={{
                              ...styles.tabelText,
                              color:
                                item?.cervixAlert == true ? "red" : "black",
                            }}
                          >
                            {item?.cervix}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {urineSecond?.length > 0 && (
                <View style={{ ...styles.babyContanerView, marginLeft: 30 }}>
                  <Text style={styles.chartsLabelText}></Text>
                  <View style={styles.timeHourMainConatiner}>
                    {urineSecond?.map((item, index) => {
                      return (
                        <View style={styles.timeHourSubView}>
                          <View style={styles.fhrDeclareView}>
                            <View style={styles.fhrTableSubView}>
                              <Text style={styles.tabelText}>
                                {item?.urine}
                              </Text>
                            </View>
                          </View>
                          <Text style={{ textAlign: "right" }}>
                            {item?.hour}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )} */}
          </View>
        )}

        {decentData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 270,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {decentData?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text style={{
                              ...styles.tabelText,
                              color:
                                item?.cervixAlert == true
                                  ? "red"
                                  : "black",
                            }}>{item?.decent}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {urineSecond?.length > 0 && (
                <View style={{ ...styles.babyContanerView, marginLeft: 30 }}>
                  <Text style={styles.chartsLabelText}></Text>
                  <View style={styles.timeHourMainConatiner}>
                    {urineSecond?.map((item, index) => {
                      return (
                        <View style={styles.timeHourSubView}>
                          <View style={styles.fhrDeclareView}>
                            <View style={styles.fhrTableSubView}>
                              <Text style={styles.tabelText}>
                                {item?.urine}
                              </Text>
                            </View>
                          </View>
                          <Text style={{ textAlign: "right" }}>
                            {item?.hour}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )} */}
          </View>
        )}
      </>
    );
  };

  const MedicineDetailView = () => {
    return (
      <>
        {oxytcoin?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 275,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {oxytcoin?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text style={styles.tabelText}>{item?.oxytocin}</Text>
                        </View>
                      </View>
                      {/* <Text style={{ textAlign: "right", fontSize: 11 }}>
                          {item?.hour}
                        </Text> */}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {urineSecond?.length > 0 && (
                <View style={{ ...styles.babyContanerView, marginLeft: 30 }}>
                  <Text style={styles.chartsLabelText}></Text>
                  <View style={styles.timeHourMainConatiner}>
                    {urineSecond?.map((item, index) => {
                      return (
                        <View style={styles.timeHourSubView}>
                          <View style={styles.fhrDeclareView}>
                            <View style={styles.fhrTableSubView}>
                              <Text style={styles.tabelText}>
                                {item?.urine}
                              </Text>
                            </View>
                          </View>
                          <Text style={{ textAlign: "right" }}>
                            {item?.hour}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )} */}
          </View>
        )}

        {fourFluid?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
              bottom: 295,
            }}
          >
            <View style={styles.babyContanerView}>
              <View style={styles.timeHourMainConatiner}>
                {fourFluid?.map((item, index) => {
                  return (
                    <View style={styles.timeHourSubView}>
                      <View style={styles.fhrDeclareView}>
                        <View style={styles.fhrTableSubView}>
                          <Text style={styles.tabelText}>{item?.ivFluids}</Text>
                        </View>
                      </View>
                      {/* <Text style={{ textAlign: "right", fontSize: 11 }}>
                          {item?.hour}
                        </Text> */}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* {urineSecond?.length > 0 && (
                <View style={{ ...styles.babyContanerView, marginLeft: 30 }}>
                  <Text style={styles.chartsLabelText}></Text>
                  <View style={styles.timeHourMainConatiner}>
                    {urineSecond?.map((item, index) => {
                      return (
                        <View style={styles.timeHourSubView}>
                          <View style={styles.fhrDeclareView}>
                            <View style={styles.fhrTableSubView}>
                              <Text style={styles.tabelText}>
                                {item?.urine}
                              </Text>
                            </View>
                          </View>
                          <Text style={{ textAlign: "right" }}>
                            {item?.hour}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )} */}
          </View>
        )}
      </>
    );
  };

  const DecisionMakingView = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
            bottom: 300,
          }}
        >
          <View style={styles.timeHourMainConatiner}>
            {decisionMaking?.map((item, index) => {
              return (
                <View style={styles.timeHourSubView}>
                  <View style={{ ...styles.assessmentContainer, height: 120 }}>
                    <Text style={styles.asstPlanText}>{item?.assessment}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* {decisionMakingSecond?.length > 0 && (
                  <View style={styles.timeHourSecondListView}>
                    <View style={{ flexDirection: "row" }}>
                      {decisionMakingSecond?.map((item, index) => {
                        return (
                          <View style={styles.timeHourSubView}>
                            <View style={styles.assessmentContainer}>
                              <Text style={styles.asstPlanText}>
                                {item?.assessment}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )} */}
        </View>

        <View
          style={{
            flexDirection: "row",
            marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
            bottom: 320,
          }}
        >
          <View style={styles.timeHourMainConatiner}>
            {decisionMaking?.map((item, index) => {
              return (
                <View style={styles.timeHourSubView}>
                  <View style={{ ...styles.assessmentContainer, height: 120}}>
                    <Text style={styles.asstPlanText}>{item?.plan}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* {decisionMakingSecond?.length > 0 && (
                  <View style={styles.timeHourSecondListView}>
                    <View style={{ flexDirection: "row" }}>
                      {decisionMakingSecond?.map((item, index) => {
                        return (
                          <View style={styles.timeHourSubView}>
                            <View style={styles.assessmentContainer}>
                              <Text style={styles.asstPlanText}>
                                {item?.plan}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )} */}
        </View>

        <View
          style={{
            flexDirection: "row",
            marginLeft: currentOrientation == "PORTRAIT" ? 85 : 92,
            bottom: 340,
          }}
        >
          <View style={styles.timeHourMainConatiner}>
            {initialLCG?.map((item, index) => {
              return (
                <View style={styles.timeHourSubView}>
                  <View style={{ ...styles.rowColumnView, height: 60 }}>
                    <Text style={{ fontSize: 8 }}>{item?.initials}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* {initialLCGSecond?.length > 0 && (
                  <View style={styles.timeHourSecondListView}>
                    <View style={{ flexDirection: "row" }}>
                      {initialLCGSecond?.map((item, index) => {
                        return (
                          <View style={styles.timeHourSubView}>
                            <View style={styles.rowColumnView}>
                              <Text>{item?.initials}</Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )} */}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
        stickyHeaderIndices={[1]}
      >
        <PatientDetailCard />

        <View style={{ flexDirection: "row", backgroundColor: "white" }}>
          {slotsTime?.length > 0 && (
            <View
              style={{
                ...styles.timePositionVIew,
                marginLeft: currentOrientation == "PORTRAIT" ? 0 : 11,
              }}
            >
              <View style={{...styles.timeHourSubView,}}>
                <View style={{...styles.rowColumnViewUpdated,width:90}}>
                  <Text style={styles.tabelText}>
                    {config.strings.TEXT_INPUT_PLACEHOLDERS.TIME}
                  </Text>
                </View>
                <Text style={{...styles.tabelText,textAlign:'center'}}>
                  {config.strings.TEXT_INPUT_PLACEHOLDERS.DURATIONINHOURS}
                </Text>
              </View>
            </View>
          )}
          <TimeHoursView />
        </View>

        <View style={{ flexDirection: "row" }}>
          {supprotivedata?.length > 0 && (
            <>
              <View style={styles.leftHeadingStaticView}>
                <View style={{ flexDirection: "row", bottom: 85 }}>
                  <View style={styles.leftHeadingFirstView}>
                    <View style={styles.leftHeadingTextView}>
                      <Text style={styles.pinkHeadingText}>
                        Supportive Care
                      </Text>
                    </View>

                    <View style={{ ...styles.timeHourSubView }}>
                      <View style={styles.rowColumnViewUpdated}>
                        <Text style={styles.tabelText}>
                          {config.strings.OTHERS.COMPANIEN}
                        </Text>
                      </View>

                      <View style={styles.rowColumnViewUpdated}>
                        <Text style={styles.tabelText}>
                          {config.strings.OTHERS.PAINRELIEF}
                        </Text>
                      </View>

                      <View style={styles.rowColumnViewUpdated}>
                        <Text style={styles.tabelText}>
                          {config.strings.OTHERS.ORAL_FLUID}
                        </Text>
                      </View>

                      <View style={styles.rowColumnViewUpdated}>
                        <Text style={styles.tabelText}>
                          {config.strings.OTHERS.POSTURE}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}

          {baslineFhrData?.length > 0 && (
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                top: 300,
                width: "18%",
              }}
            >
              <View style={{ flexDirection: "row", bottom: 85 }}>
                <View style={styles.leftHeadingFirstView}>
                  <View style={styles.leftHeadingTextView}>
                    <Text style={styles.pinkHeadingText}>Baby</Text>
                  </View>

                  <View style={{ ...styles.timeHourSubView }}>
                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.BASELINE_FHR}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.FHR_DECLARARTION}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.ANOMATIC_FLUID}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.FETEL_POSITION}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.CAPUT}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.MOULDING}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {pulseData?.length > 0 && (
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                top: 610,
                width: "18%",
              }}
            >
              <View style={{ flexDirection: "row", bottom: 85 }}>
                <View style={styles.leftHeadingFirstView}>
                  <View style={styles.leftHeadingTextView}>
                    <Text style={styles.pinkHeadingText}>Woman</Text>
                  </View>

                  <View style={{ ...styles.timeHourSubView }}>
                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.PULSE}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.SYSTOLICBP}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.DIALOSTIC_BP}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.TEMPRATUREC}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.URINE}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {contraData?.length > 0 && (
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                top: 790,
                width: "18%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftHeadingFirstView}>
                  <View style={styles.leftHeadingTextView}>
                    <Text style={styles.pinkHeadingText}>Labour Progress</Text>
                  </View>

                  <View style={{ ...styles.timeHourSubView }}>
                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.CONTRACTION10MIN}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.DURATIONCONTRA}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.CERVIX}
                      </Text>
                    </View>

                    <View style={styles.rowColumnViewUpdated}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.DESCENT_PLOT_O}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {oxytcoin?.length > 0 && (
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                top: 1005,
                width: "18%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ ...styles.leftHeadingFirstView, height: 100 }}>
                  <View style={{ ...styles.leftHeadingTextView }}>
                    <Text style={styles.pinkHeadingText}>Medication</Text>
                  </View>

                  <View style={{ ...styles.timeHourSubView }}>
                    <View style={{ ...styles.rowColumnViewUpdated }}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.OXYTCOIN}
                      </Text>
                    </View>

                    <View style={{ ...styles.rowColumnViewUpdated }}>
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.IVFLUID}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {decisionMaking?.length > 0 && (
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                top: 1120,
                width: "18%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ ...styles.leftHeadingFirstView, height: 300 }}>
                  <View style={{ ...styles.leftHeadingTextView }}>
                    <Text style={styles.pinkHeadingText}>
                      Shared Decision Making
                    </Text>
                  </View>

                  <View style={{ ...styles.timeHourSubView }}>
                    <View
                      style={{ ...styles.rowColumnViewUpdated, height: 120 }}
                    >
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.ASSESSMENT}
                      </Text>
                    </View>

                    <View
                      style={{ ...styles.rowColumnViewUpdated, height: 120 }}
                    >
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.PLAN}
                      </Text>
                    </View>

                    <View
                      style={{ ...styles.rowColumnViewUpdated, height: 60 }}
                    >
                      <Text style={styles.tabelText}>
                        {config.strings.OTHERS.INITIALS}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          <ScrollView
            ref={myOptionRef}
            scrollEventThrottle={1}
            onScroll={(e) =>
              myRef?.current?.scrollTo({
                x: e.nativeEvent.contentOffset.x,
                animated: false,
              })
            }
            horizontal={true}
          >
            <View>
              <SupprotiveCareView />
              <BabySectionView />
              <BabySectionDetailView />
              <WomenSectionDetailView />
              <LabourProgressDetailView />
              <MedicineDetailView />
              <DecisionMakingView />
            </View>
          </ScrollView>
        </View>

        {/* <View style={{ paddingBottom: 30 }}>
          <Text style={styles.instText}>{config.strings.OTHERS.INST_TEXT}</Text>

          <Text style={styles.instText}>
            {config.strings.OTHERS.ABBRVETION_TEXT}
          </Text>

          <View style={styles.viewStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancelBtn}
              onPress={() => console.log("Cancel")}
            >
              <Text style={styles.cancelText}>
                {config.strings.BTN_TEXTS.SHARE}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.saveBtn}
              onPress={() => console.log("Save")}
            >
              <Text style={styles.saveText}>
                {config.strings.BTN_TEXTS.PRINT}
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: config.colors.white },
  buttonContainer: { marginHorizontal: 20, marginVertical: 20 },
  inputContainer: { backgroundColor: "white", marginTop: 10, width: "100%" },
  selectedText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "500",
    fontSize: 15,
    color: "#FC5285",
  },

  unselectedText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 15,
    color: "#7D8491",
  },
  container: {
    backgroundColor: config.colors.white,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 8,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  patNameText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 16,
    color: config.colors.neutralBlack,
  },
  patIdAgeView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  patIdAgeSubView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    flexWrap: "wrap",
  },
  labelText: {
    color: config.colors.black,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  contentText: {
    color: config.colors.toastDefault,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    marginHorizontal: 5, 
  },
  delivryStatusText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
  },
  deliveryStatusView: { flexDirection: "row", alignItems: "center" },
  deliveryStatusImage: { width: 20, height: 20, resizeMode: "contain" },
  biShopConatiner: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: config.colors.textInputLabel,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  biShopHeadigText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 15,
  },
  bioShopLabelText: {
    color: config.colors.black,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 14,
  },
  biShopcontentText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    marginHorizontal: 5,
    fontSize: 14,
  },
  viewMedication: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medicationSubView: { flexDirection: "row", alignItems: "center" },
  rightArrowImg: { width: 12, height: 12, resizeMode: "contain" },
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
  timeHourMainConatiner: {
    marginHorizontal: 5,
    marginVertical: 10,
    flexDirection: "row",
  },
  timeHourSubView: { flexDirection: "column" },
  rowColumnView: {
    width: 50,
    height: 50,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#DADFEB",
    borderWidth: 1,
  },
  rowColumnViewUpdated: {
    width: 50,
    height: 50,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f6f7",
    borderColor: "#DADFEB",
    borderWidth: 1,
  },
  timeHourSecondListView: { marginHorizontal: 10, marginVertical: 10 },
  pinkHeadingText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 8,
    transform: [{ rotate: "270deg" }],
    left: 5,
  },
  tabelText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
    fontSize: 10,
    textAlign: "justify",
  },
  chartsLabelText: {
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 12,
    marginTop: 2,
    marginHorizontal: 5,
  },
  babyContanerView: {
    // backgroundColor: "white",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // borderRadius: 6,
    // elevation: 3,
    // paddingHorizontal: 6,
    // marginLeft: 16,
    // marginVertical: 3,
    // borderWidth: 0.6,
    // borderColor: config.colors.textInputLabel,
  },
  sepratorStyle: {
    height: 2,
    backgroundColor: config.colors.tabInactive,
    opacity: 0.3,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  durationText: {
    textAlign: "center",
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    color: config.colors.neutralBlack,
    marginBottom: 10,
  },
  fhrDeclareView: {
    width: 50,
    height: 50,
    borderColor: config.colors.textInputLabel,
    borderWidth: 0.6,
  },
  fhrTableSubView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dotSperator: {
    height: 50,
    marginHorizontal: 5,
    borderStyle: "dashed",
    borderColor: config.colors.textInputLabel,
    borderWidth: 0.7,
  },
  descentrowColumnView: {
    width: 100,
    height: 40,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#DADFEB",
    borderWidth: 1,
  },
  descentViewContainer: {
    height: 240,
    width: 80,
    backgroundColor: config.colors.white,
    borderColor: config.colors.textInputLabel,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  descentLabelListView: {
    height: 40,
    width: 50,
    backgroundColor: config.colors.white,
    borderColor: config.colors.textInputLabel,
    borderWidth: 0.5,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  desecentGrayView: {
    width: 100,
    height: 40,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6F9",
    borderColor: "#DADFEB",
    borderWidth: 1,
  },
  instText: {
    marginHorizontal: 20,
    textAlign: "justify",
    fontSize: 12,
    marginVertical: 10,
  },
  viewStyle: {
    flexDirection: "row",
  },
  mobileInput: {
    height: 43,
    width: "89%",
    borderBottomWidth: 1.5,
    borderColor: "lightgray",
    marginBottom: 15,
  },
  mobileText: {
    fontSize: 15,
    borderBottomWidth: 1.5,
    borderColor: "lightgray",
    marginBottom: 15,
    marginVertical: 10,
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: "#EEF2F3",
    height: 45,
    width: 170,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: config.colors.textInputLabel,
  },
  saveBtn: {
    backgroundColor: "#FC5285",
    height: 45,
    width: 170,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "black",
  },
  saveText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  assessmentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#DADFEB",
    borderWidth: 1,
    width: 50,
    height: 50,
  },
  asstPlanText: {
    fontSize: 8,
    textAlign: "justify",
    // transform: [{ rotate: "270deg" }],
  },
  timePositionVIew: {
    position: "absolute",
    zIndex: 2,
    top: 10,
    backgroundColor: "white",
  },
  leftHeadingStaticView: {
    position: "absolute",
    zIndex: 1,
    top: 85,
    width: "15%",
  },
  leftHeadingFirstView: {
    flexDirection: "row",
    borderColor: "#DADFEB",
    borderWidth: 0.5,

    backgroundColor: "#edf8fc",
    alignItems: "center",
    justifyContent: "center",
  },
  leftHeadingTextView: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 200,
  },
  downArrImage: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  hideshowconatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ViewLcg;
