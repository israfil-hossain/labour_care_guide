import CardView from "../../components/CardView";import React, { useEffect, useState } from "react";
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
  TextInput,
} from "react-native";
import {
  LCGButton,
  LCGKeyboardAvoidingAnimatedScroll,
  LCGOtpBlocks,
  LCGBottomModal,
} from "../../components";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";

import {
  User,
  PatienRoundDetail,
  SearchRound,
  FilterRound,
} from "../../reduxStates";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { savePageNum } from "../../reduxStates/RoundDetail";

const STARTED = "started";
const NOT_STARTED = "not-started";
const COMPLETED = "delivery-completed";

const Round = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showFilterClear, setshowFilterClear] = useState(false);

  const dispatch = useDispatch();
  const RoundDetail = useSelector(PatienRoundDetail.selectRoundDetail);
  const RoundPaginatedData = useSelector(
    PatienRoundDetail.selectRoundPaginatedData
  );
  const SearchRoundData = useSelector(SearchRound.selectSearchRound);
  const FilterRoundData = useSelector(FilterRound.selectFilterRound);
  // const PageNumber = useSelector(PatienRoundDetail.selectPageNum);

 

  useEffect(() => {
    if (RoundPaginatedData?.length > 0) {
      const updateArray =
        RoundPaginatedData &&
        RoundPaginatedData?.map((v) => ({
          ...v,
          patDetailExpand: false,
          medicationExpand: false,
          bishopExpand: false,
          glanceExpand: false,
          delDetailExpand: false,
        }));
      setListData(updateArray);
    }
    else {
      setListData([]);
    }
  }, [RoundPaginatedData]);

  useEffect(() => {
    if (SearchRoundData?.length > 0) {
      const updateArray =
        SearchRoundData &&
        SearchRoundData?.map((v) => ({
          ...v,
          patDetailExpand: false,
          medicationExpand: false,
          bishopExpand: false,
          glanceExpand: false,
          delDetailExpand: false,
        }));
      setListData(updateArray);
    } 
  }, [SearchRoundData]);

  useEffect(() => {
    if (FilterRoundData != null) {
      const updateArray =
        FilterRoundData &&
        FilterRoundData?.map((v) => ({
          ...v,
          patDetailExpand: false,
          medicationExpand: false,
          bishopExpand: false,
          glanceExpand: false,
          delDetailExpand: false,
        }));
      setListData(updateArray);
      setshowFilterClear(!showFilterClear);
    }
  }, [FilterRoundData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSearchValue("");
      callRoundDetailApi();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const showDeliveryStatus = (status) => {
    if (status == NOT_STARTED) {
      return "#8D939E";
    } else if (status == STARTED) {
      return "#FF9201";
    } else if (status == COMPLETED) {
      return "#0FAB69";
    }
  };

  const showMedicationDetails = (type, index) => {
    if (type == "basicdetail") {
      const arr = [...listData];
      const result = arr.map((itm, ind) => {
        if (ind == index) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          itm["patDetailExpand"] = !itm["patDetailExpand"];
        }
        return itm;
      });
      setListData(result);
    } else if (type == "medication") {
      const arr = [...listData];
      const result = arr.map((itm, ind) => {
        if (ind == index) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          itm["medicationExpand"] = !itm["medicationExpand"];
        }
        return itm;
      });
      setListData(result);
    } else if (type == "bishop") {
      const arr = [...listData];
      const result = arr.map((itm, ind) => {
        if (ind == index) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          itm["bishopExpand"] = !itm["bishopExpand"];
        }
        return itm;
      });
      setListData(result);
    } else if (type == "glance") {
      const arr = [...listData];
      const result = arr.map((itm, ind) => {
        if (ind == index) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          itm["glanceExpand"] = !itm["glanceExpand"];
        }
        return itm;
      });
      setListData(result);
    } else if (type == "deldetails") {
      const arr = [...listData];
      const result = arr.map((itm, ind) => {
        if (ind == index) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          itm["delDetailExpand"] = !itm["delDetailExpand"];
        }
        return itm;
      });
      setListData(result);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => showMedicationDetails("basicdetail", index)}
          style={styles.downArrowConatinter}
        >
          <Text style={styles.patNameText}>{item?.name}</Text>
          <Image
            source={
              item?.patDetailExpand == true
                ? require("../../assets/images/UpArrow.png")
                : require("../../assets/images/DownArrow.png")
            }
            style={styles.downArrImage}
          />
        </Pressable>

        <View style={styles.patIdAgeView}>
          <View style={styles.patIdAgeSubView}>
            <Text style={styles.labelText}>Pateint Id:</Text>
            <Text style={styles.contentText}>{item?.patientId}</Text>
          </View>
          <View style={{ ...styles.patIdAgeSubView, marginLeft: 10 }}>
            <Text style={styles.labelText}>Age:</Text>
            <Text style={styles.contentText}>{item?.age}</Text>
          </View>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>UHID:</Text>
          <Text style={styles.contentText}>{item?.UHID}</Text>
        </View>

        <View style={styles.patIdAgeSubView}>
          <Text style={styles.labelText}>Ward Name:</Text>
          <Text style={styles.contentText}>
            {item?.wardName == null ? "Not assigned yet" : item?.wardName}
          </Text>
        </View>

        {item?.patDetailExpand == true && (
          <>
            <View style={styles.viewMedication}>
              <View style={styles.patIdAgeSubView}>
                <Text style={styles.labelText}>Obstetric Formula:</Text>
                <Text style={styles.contentText}>{item?.obstetricFormula}</Text>
              </View>
              <Pressable
                onPress={() =>
                  navigation.navigate(config.routes.VIEW_PARITY, {
                    patId: item?.patientId,
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
                {item?.labourOnSet?.time != null
                  ? moment(new Date(item?.labourOnSet?.time)).format(
                      "DD/MM/YYYY"
                    )
                  : "--"}
                ,{"  "}
                {item?.labourOnSet?.time != null &&
                  moment(new Date(item?.labourOnSet?.time), "HH:mm").format(
                    "hh:mm A"
                  )}
              </Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Active Labour Diagnosis</Text>
              <Text style={styles.contentText}>
                {item?.activeLabourDignosis?.time != null
                  ? moment(new Date(item?.activeLabourDignosis?.time)).format(
                    "DD/MM/YYYY"
                    )
                  : "--"}
                ,{"  "}
                {item?.labourOnSet?.time != null &&
                  moment(
                    new Date(item?.activeLabourDignosis?.time),
                    "HH:mm"
                  ).format("hh:mm A")}
              </Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Ruptured Membrane:</Text>
              <Text style={styles.contentText}>
                {item?.membrane?.time != null
                  ? moment(new Date(item?.membrane?.time)).format("DD/MM/YYYY")
                  : "--"}
                ,{"  "}
                {item?.membrane?.time != null &&
                  moment(new Date(item?.membrane?.time), "HH:mm").format(
                    "hh:mm A"
                  )}
              </Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Risk Factors:</Text>
              <Text style={styles.contentText}>{item?.riskFactor}</Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Contraceptives used:</Text>
              <Text style={styles.contentText}>{item?.contraceptivesUsed}</Text>
            </View>

            <View style={styles.patIdAgeSubView}>
              <Text style={styles.labelText}>Date of Admission:</Text>
              <Text style={styles.contentText}>{item?.dateOfAdmission}</Text>
            </View>

            {item?.labourStatus == COMPLETED && (
              <View style={styles.patIdAgeSubView}>
                <Text style={styles.labelText}>Date and Time of Delivery:</Text>
                <Text style={styles.contentText}>{item.dateTimeDelivery}</Text>
              </View>
            )}

            <View
              style={{
                ...styles.patIdAgeSubView,
                justifyContent: "space-between",
              }}
            >
              <View style={styles.deliveryStatusView}>
                <Image
                  source={require("../../assets/images/deliveryStatus.png")}
                  style={styles.deliveryStatusImage}
                />
                <Text style={styles.labelText}>Delivery Status:</Text>
              </View>
              <Text
                style={{
                  ...styles.delivryStatusText,
                  color: showDeliveryStatus(item?.labourStatus),
                }}
              >
                {item?.labourStatus}
              </Text>
            </View>
          </>
        )}

        <LCGButton
          buttonText={config.strings.BTN_TEXTS.ADD_PLAN}
          containerStyle={styles.addPlanButton}
          onPress={() => navigation.navigate(config.routes.ADD_PLAN)}
        />

        <View style={styles.sepratorStyle}></View>

        <View style={styles.biShopConatiner}>
          <Pressable
            onPress={() => showMedicationDetails("bishop", index)}
            style={styles.downArrowConatinter}
          >
            <Text style={styles.biShopHeadigText}>
              {config.strings.OTHERS.BISHOP_SCRORING}
            </Text>
            <Image
              source={
                item?.bishopExpand == true
                  ? require("../../assets/images/UpArrow.png")
                  : require("../../assets/images/DownArrow.png")
              }
              style={styles.downArrImage}
            />
          </Pressable>

          {item?.bishopExpand == true && (
            <>
              {item?.bishopScores?.length > 0 ? (
                item?.bishopScores?.map((itemScore, ind) => (
                  <View style={styles.patIdAgeSubView}>
                    <Text style={styles.bioShopLabelText}>
                      Cervix Diameter {itemScore?.cervixDiameter}
                    </Text>
                    <Text style={styles.biShopcontentText}>
                      = {itemScore?.bishopScore}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.noBishopFound}>
                  <Text>{config.strings.OTHERS.NO_DETAILS}</Text>
                </View>
              )}
            </>
          )}
        </View>

        <View style={styles.sepratorStyle}></View>

        <View style={styles.dropDownSubView}>
          <Pressable
            onPress={() => showMedicationDetails("glance", index)}
            style={styles.downArrowConatinter}
          >
            <Text style={styles.biShopHeadigText}>
              {config.strings.OTHERS.LCG_GLANCE}
            </Text>
            <Image
              source={
                item?.glanceExpand == true
                  ? require("../../assets/images/UpArrow.png")
                  : require("../../assets/images/DownArrow.png")
              }
              style={styles.downArrImage}
            />
          </Pressable>

          {item?.glanceExpand == true && (
            <>
              <View style={styles.lcgDetailConatainer}>
                <View style={styles.lcgDetailSUbView}>
                  <View>
                    <Text style={styles.lcgLabelTextHeading}>
                      {item?.lcgAtGlance?.MHR ?? "-"}
                    </Text>
                    <Text style={styles.lcgLabelTextData}>MHR</Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        ...styles.lcgLabelTextHeading,
                        color: "#EA3E2B",
                      }}
                    >
                      {item?.lcgAtGlance?.DBP}/{item?.lcgAtGlance?.DBP}
                    </Text>
                    <Text style={styles.lcgLabelTextData}>BP</Text>
                  </View>

                  <View>
                    <Text style={styles.lcgLabelTextHeading}>
                      {item?.lcgAtGlance?.FHR ?? "-"}
                    </Text>
                    <Text style={styles.lcgLabelTextData}>FHR</Text>
                  </View>

                  <View>
                    <Text style={styles.lcgLabelTextHeading}>
                      {item?.lcgAtGlance?.temperature ?? "-"}
                    </Text>
                    <Text style={styles.lcgLabelTextData}>F Temp</Text>
                  </View>

                  <View>
                    <Text style={styles.lcgLabelTextHeading}>
                      {item?.lcgAtGlance?.UC ?? "-"}
                    </Text>
                    <Text style={styles.lcgLabelTextData}>UC</Text>
                  </View>
                </View>

                <View style={styles.viewLCGConatiner}>
                  <Pressable
                    onPress={() => navigation.navigate(config.routes.VIEW_LCG)}
                    style={styles.viewLCGButtonView}
                  >
                    <View style={styles.viewLCGButtonSubView}>
                      <Text style={styles.viewLCGButtonText}>
                        {config.strings.BTN_TEXTS.VIEW_LCG}
                      </Text>
                      <Image
                        source={require("../../assets/images/RightBlackArrow.png")}
                        style={styles.viewLCGArrowImage}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.sepratorStyle}></View>

        <View style={styles.dropDownSubView}>
          <Pressable
            onPress={() => showMedicationDetails("medication", index)}
            style={styles.downArrowConatinter}
          >
            <Text style={styles.biShopHeadigText}>
              {config.strings.OTHERS.MEDICATION}
            </Text>
            <Image
              source={
                item?.medicationExpand == true
                  ? require("../../assets/images/UpArrow.png")
                  : require("../../assets/images/DownArrow.png")
              }
              style={styles.downArrImage}
            />
          </Pressable>

          {item?.medicationExpand == true && (
            <>
              <View style={styles.fluidsDetailsView}>
                <Text style={styles.labelText}>Oxytocin (U/L, drops/min)</Text>
                <Text style={styles.contentText}>
                  {item?.medication?.oxytocin}
                </Text>
              </View>
              <View style={styles.fluidsDetailsView}>
                <Text style={styles.labelText}>IV Fluids</Text>
              </View>
              <View style={styles.fluidsDetailsView}>
                <Text style={styles.labelText}>Is the woman on IV fluids?</Text>
                <Text style={styles.contentText}>
                  {item?.medication?.ivFluids}
                </Text>
              </View>

              <View style={styles.viewhistoryConatiner}>
                <Pressable
                  onPress={() =>
                    navigation.navigate(config.routes.MEDICATION_HISTORY, {
                      patId: item?.patientId,
                    })
                  }
                  style={styles.viewhistoryButton}
                >
                  <Text style={styles.bioShopLabelText}>View History</Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() =>
                  navigation.navigate(config.routes.MEDICATION_LIST, {
                    patId: item?.patientId,
                  })
                }
                style={styles.fluidMedicationView}
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

        <View style={styles.sepratorStyle}></View>

        <View style={styles.dropDownSubView}>
          <Pressable
            onPress={() => showMedicationDetails("deldetails", index)}
            style={styles.downArrowConatinter}
          >
            <Text style={styles.biShopHeadigText}>
              {config.strings.OTHERS.DELIVERY_DETAILS}
            </Text>
            <Image
              source={
                item?.delDetailExpand == true
                  ? require("../../assets/images/UpArrow.png")
                  : require("../../assets/images/DownArrow.png")
              }
              style={styles.downArrImage}
            />
          </Pressable>

          {item?.delDetailExpand == true && (
            <>
              <View
                style={{
                  ...styles.patIdAgeSubView,
                  justifyContent: "space-between",
                  marginTop: 15,
                }}
              >
                <View style={styles.deliveryStatusView}>
                  <Image
                    source={require("../../assets/images/deliveryStatus.png")}
                    style={styles.deliveryStatusImage}
                  />
                  <Text style={{ ...styles.labelText, marginLeft: 10 }}>
                    Delivery Status:
                  </Text>
                </View>

                <Text
                  style={{
                    ...styles.delivryStatusText,
                    color: showDeliveryStatus(item?.labourStatus),
                  }}
                >
                  {item?.labourStatus}
                </Text>
              </View>
              {item?.labourStatus === STARTED && (
                <View
                  style={{
                    ...styles.patIdAgeSubView,
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <View style={styles.deliveryStatusView}>
                    <Image
                      source={require("../../assets/images/DarkClockIcon.png")}
                      style={styles.deliveryStatusImage}
                    />
                    <Text style={{ ...styles.labelText, marginLeft: 10 }}>
                      Delivery Started at{" "}
                      {item?.activeLabourDignosis?.time != null &&
                        moment(
                          new Date(item?.activeLabourDignosis?.time)
                        ).format("YYYY-MM-DD")}
                      ,{"  "}
                      {item?.labourOnSet?.time != null &&
                        moment(
                          new Date(item?.activeLabourDignosis?.time),
                          "HH:mm"
                        ).format("hh:mm A")}
                    </Text>
                  </View>
                </View>
              )}
              {item?.labourStatus === COMPLETED && (
                <>
                  <View
                    style={{
                      ...styles.patIdAgeSubView,
                      justifyContent: "space-between",
                      marginVertical: 10,
                    }}
                  >
                    <View style={styles.deliveryStatusView}>
                      <Image
                        source={require("../../assets/images/baby.png")}
                        style={styles.deliveryStatusImage}
                      />
                      <Text style={{ ...styles.labelText, marginLeft: 10 }}>
                        Baby Status:
                      </Text>
                    </View>

                    <Text
                      style={{
                        ...styles.delivryStatusText,
                        color: config.colors.appTheme1,
                      }}
                    >
                      {item?.delivery?.numberOfBabies} Baby Delivered
                    </Text>
                  </View>

                  <View
                    style={[styles.sepratorStyle, { marginTop: 10 }]}
                  ></View>

                  <View style={styles.startCompleteView}>
                    <View>
                      <Text
                        style={{ ...styles.patNameText, marginVertical: 13 }}
                      >
                        Completed Time
                      </Text>
                      <View style={styles.deliveryStatusView}>
                        <Image
                          source={require("../../assets/images/DarkClockIcon.png")}
                          style={styles.deliveryStatusImage}
                        />
                        <Text style={{ ...styles.labelText, marginLeft: 10 }}>
                          {item?.delivery?.time != null &&
                            moment(
                              new Date(item?.delivery?.time),
                              "HH:mm"
                            ).format("hh:mm A")}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[styles.sepratorStyle, { marginTop: 20 }]}
                  ></View>

                  <View style={{ ...styles.patIdAgeSubView, marginTop: 15 }}>
                    <Text style={styles.labelText}>Delivery Type:</Text>
                    <Text style={styles.contentText}>
                      {item?.delivery?.deliveryType}
                    </Text>
                  </View>

                  <Text style={styles.surgoryNoteText}>Surgery Note:</Text>
                  <Text style={{ ...styles.labelText, marginVertical: 5 }}>
                    {item?.delivery?.note}
                  </Text>

                  <View
                    style={{
                      ...styles.patIdAgeSubView,
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text style={styles.labelText}>Operating Surgeon</Text>
                    <Text style={styles.contentText}>
                      {item?.delivery?.operatingSurgeon}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.patIdAgeSubView,
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text style={styles.labelText}>Anaesthetic</Text>
                    <Text style={styles.contentText}>
                      {item?.delivery?.anaesthetic}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.patIdAgeSubView,
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text style={styles.labelText}>Paediatrician</Text>
                    <Text style={styles.contentText}>
                      {item?.delivery?.paediatrician}
                    </Text>
                  </View>

                  <View
                    style={[styles.sepratorStyle, { marginTop: 20 }]}
                  ></View>

                  {item?.babyDetails?.length > 0 &&
                    item?.babyDetails?.map((_item, indx) => (
                      <View style={{ marginVertical: 10 }}>
                        <Text style={styles.babyTitleText}>
                          Baby {indx + 1}
                        </Text>
                        <View style={styles.babyStausView}>
                          <View>
                            <Text style={styles.labelText}>Baby Status:</Text>
                            <Text style={styles.babyStusText}>
                              {_item?.status}
                            </Text>
                          </View>

                          <View>
                            <Text style={styles.labelText}>Baby Sex:</Text>
                            <Text style={styles.babyStusText}>
                              {_item?.sex}
                            </Text>
                          </View>
                        </View>

                        <Text style={styles.apgarTextHeading}>
                          APGAR Score:
                        </Text>

                        <View style={styles.apgScoreView}>
                          <View style={styles.apgScoreSubView}>
                            <Text style={styles.labelText}>
                              {config.strings.OTHERS.ONEMIN} =
                            </Text>
                            <Text style={styles.biShopcontentText}>
                              {_item?.apgar?.oneMin}
                            </Text>
                          </View>

                          <View style={styles.apgScoreSubView}>
                            <Text style={styles.labelText}>
                              {config.strings.OTHERS.FIVEMIN} =
                            </Text>
                            <Text style={styles.biShopcontentText}>
                              {_item?.apgar?.fiveMin}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.apgScoreView}>
                          <View style={styles.apgScoreSubView}>
                            <Text style={styles.labelText}>
                              {config.strings.OTHERS.TENMIN} =
                            </Text>
                            <Text style={styles.biShopcontentText}>
                              {_item?.apgar?.tenMins}
                            </Text>
                          </View>

                          <View style={styles.apgScoreSubView}>
                            <Text style={styles.labelText}>
                              {config.strings.OTHERS.TWENTYMIN} =
                            </Text>
                            <Text style={styles.biShopcontentText}>
                              {_item?.apgar?.twentyMins}
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                          <Text style={styles.labelText}>
                            Baby Weight(In Kg)
                          </Text>
                          <Text style={styles.babyStusText}>
                            {_item?.weight}
                          </Text>
                        </View>

                        <View style={{ marginTop: 20 }}>
                          <Text style={styles.labelText}>
                            Breast Feeding Started
                          </Text>
                          <Text style={styles.babyStusText}>
                            {_item?.breastFeeding?.started == true
                              ? "Yes"
                              : "No"}{" "}
                            {_item?.breastFeeding?.withinOneHour == true
                              ? "(Within 1 hour)"
                              : ""}
                            {_item?.breastFeeding?.moreThanOneHour == true
                              ? "(More than 1 hour)"
                              : ""}
                          </Text>
                        </View>

                        <View style={{ marginTop: 20 }}>
                          <Text style={styles.labelText}>Note:</Text>
                          <Text style={styles.babyStusText}>
                            {_item?.notes}
                          </Text>
                        </View>

                        <View
                          style={[styles.sepratorStyle, { marginTop: 20 }]}
                        ></View>
                      </View>
                    ))}
                </>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  const callRoundDetailApi = () => {
    const payload = {
      uri: `?page=${RoundDetail?.data?.pagination?.currentPage}`,
    };
    dispatch({
      type: "ROUND_DETAIL",
      payload,
    });
  };

  const onPressReset = () => {
    setSortOption("");
  };

  const onPressApply = () => {
    const payload = {
      uri: `?filterBy=${sortOption}&filterValue=true`,
    };
    dispatch({
      type: "FILTER_ROUND",
      payload,
    });
    setSortVisible(false);
  };

  const searchPatient = (_text) => {
    setSearchValue(_text);
    if (_text == null) {
      setSearchValue("");
    } else {
      const payload = {
        uri: `?search=${_text}`,
      };
      setTimeout(() => {
        dispatch({
          type: "SEARCH_ROUND_PATIENT",
          payload,
        });
      }, 2000);
    }
  };

  const fetchMoreData = () => {
    if (RoundDetail?.data?.pagination?.totalItems > listData?.length) {
      const payload = {
        uri: `?page=${RoundDetail?.data?.pagination?.currentPage + 1}`,
      };
      dispatch({
        type: "ROUND_DETAIL",
        payload,
      });
    }
  };

  const onPressClearFilter = () => {
    const payload = {
      uri: `?filterBy=""&filterValue=true`,
    };
    dispatch({
      type: "FILTER_ROUND",
      payload,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.serachSubView}>
        <CardView
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={6}
          style={styles.searchCardView}
        >
          <View style={styles.searchInputView}>
            <Image
              source={require("../../assets/images/dashboard/searchIcon.png")}
              style={styles.searchImage}
            />
            <TextInput
              style={styles.searchTextInput}
              placeholder={config.strings.OTHERS.SEARCH_PATIENT}
              autoCapitalize="none"
              autoCorrect={false}
              value={searchValue}
              onChangeText={(val) => searchPatient(val)}
            />
          </View>
        </CardView>
        <CardView
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={6}
          style={styles.cardDetailsSubView}
        >
          <Pressable
            onPress={() => setSortVisible(!sortVisible)}
            style={styles.sortIconView}
          >
            <Image
              source={require("../../assets/images/filter.png")}
              style={styles.sortIconImage}
            />
          </Pressable>
        </CardView>
      </View>

      {showFilterClear == true && (
        <Pressable
          onPress={() => onPressClearFilter()}
          style={styles.clearFilterView}
        >
          <Text style={styles.biShopHeadigText}>
            {config.strings.OTHERS.CLEAR_FILTER}
          </Text>
        </Pressable>
      )}

      {listData && listData?.length > 0 ? (
        <FlatList
          data={listData}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.7}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.nodetailView}>
          <Text>{config.strings.OTHERS.NO_DETAILS}</Text>
        </View>
      )}

      <LCGBottomModal
        modalTitle="Filter"
        visibleModal={sortVisible}
        onCloseModal={() => setSortVisible(false)}
        modalContent={() => (
          <>
            <Pressable
              onPress={() => setSortOption("NOTSTARTED")}
              style={styles.sortModalContainer}
            >
              <Image
                source={
                  sortOption == "NOTSTARTED"
                    ? config.images.RadioCheck
                    : config.images.RadioUncheck
                }
                style={styles.radioOptionImage}
              />
              <Text style={styles.sortModalText}>{NOT_STARTED}</Text>
            </Pressable>

            <Pressable
              onPress={() => setSortOption("INPROGRESS")}
              style={styles.sortModalContainer}
            >
              <Image
                source={
                  sortOption == "INPROGRESS"
                    ? config.images.RadioCheck
                    : config.images.RadioUncheck
                }
                style={styles.radioOptionImage}
              />
              <Text style={styles.sortModalText}>{STARTED}</Text>
            </Pressable>

            <Pressable
              onPress={() => setSortOption("COMPLETED")}
              style={styles.sortModalContainer}
            >
              <Image
                source={
                  sortOption == "COMPLETED"
                    ? config.images.RadioCheck
                    : config.images.RadioUncheck
                }
                style={styles.radioOptionImage}
              />
              <Text style={styles.sortModalText}>{COMPLETED}</Text>
            </Pressable>

            <View style={styles.buttonView}>
              <Pressable
                onPress={() => onPressReset()}
                style={styles.buttonSUbView}
              >
                <Text style={styles.buttonReset}> Reset</Text>
              </Pressable>

              <Pressable
                onPress={() => onPressApply()}
                style={styles.buttonApplyView}
              >
                <Text style={styles.buttonApplyText}> Apply</Text>
              </Pressable>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: config.colors.screenBackground },
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
    marginVertical: 8,
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
    textTransform: "capitalize",
  },
  delivryStatusText: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    textTransform: "capitalize",
  },
  deliveryStatusView: { flexDirection: "row", alignItems: "center" },
  deliveryStatusImage: { width: 20, height: 20, resizeMode: "contain" },
  biShopConatiner: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderColor: config.colors.textInputLabel,
    // borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    //marginHorizontal: 10,
  },
  biShopHeadigText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 16,
  },
  bioShopLabelText: {
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_BOLD_700,
  },
  biShopcontentText: {
    color: config.colors.appTheme1,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    marginHorizontal: 5,
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
  addPlanButton: { marginTop: 20, height: 40, marginBottom: 15 },
  fluidMedicationView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: config.colors.textInputLabel,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
  },
  fluidMedicationSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fluidsDetailsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 15,
  },
  sepratorStyle: {
    height: 1,
    backgroundColor: config.colors.toastBG,
    marginVertical: 4,
  },
  viewhistoryConatiner: { alignItems: "flex-end", marginTop: 10 },
  viewhistoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: "#F6CDDA",
    justifyContent: "center",
    alignItems: "center",
  },
  startCompleteView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  surgoryNoteText: {
    color: config.colors.toastDefault,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    marginVertical: 5,
  },
  babyStusText: {
    color: config.colors.toastDefault,
    marginTop: 5,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
  },
  babyTitleText: {
    color: config.colors.appTheme1,
    fontSize: 16,
    fontFamily: config.fontFamily.LATO_BOLD_700,
  },
  babyStausView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  apgarTextHeading: {
    color: config.colors.neutralBlack,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    marginTop: 20,
  },
  apgScoreView: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  apgScoreSubView: { flexDirection: "row", alignItems: "center", width: "35%" },
  serachContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serachSubView: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  searchCardView: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  searchInputView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchImage: { width: 20, height: 20 },
  searchTextInput: {
    marginLeft: 5,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    width: "100%",
  },
  cardDetailsSubView: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 10,
    marginLeft: 10,
  },
  sortIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  sortIconImage: { width: 20, height: 20, resizeMode: "contain" },
  sortModalContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  radioOptionImage: { width: 20, height: 20, resizeMode: "contain" },
  sortModalText: {
    marginLeft: 10,
    color: config.colors.neutralBlack,
    textTransform: "uppercase",
  },
  downArrowConatinter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  downArrImage: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  dropDownSubView: {
    marginHorizontal: 10,
    marginVertical: 6,
    paddingVertical: 10,
  },
  buttonView: {
    flexDirection: "row",
    borderColor: config.colors.shadow,
    borderWidth: 1,
    borderRadius: 6,
    top: 16,
    marginVertical: 10,
  },
  buttonSUbView: {
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonReset: {
    color: config.colors.textInputLabel,
    fontSize: 15,
  },
  buttonApplyView: {
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.colors.appTheme1,
  },
  buttonApplyText: {
    color: config.colors.white,
    fontSize: 15,
  },
  nodetailView: { flex: 1, justifyContent: "center", alignItems: "center" },
  noBishopFound: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  clearFilterView: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginRight: 22,
    marginVertical: 3,
  },
});

export default Round;
