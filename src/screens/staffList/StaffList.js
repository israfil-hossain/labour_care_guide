import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  FlatList,
  Linking,
} from "react-native";
import config from "../../config";
import CardView from "../../components/CardView";
import fontFamily from "../../config/fontFamily";
import WardCard from "../../components/WardCard";
import StaffCard from "../../components/StaffCard";
import routes from "../../config/routes";
import { LCGCenterModal, LCGButton, LCGBottomModal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  ListWards,
  ListStaff,
  StaffSearch,
  FilterStaff,
} from "../../reduxStates";
import { CommonUtils, EnumUtils } from "../../utils";
import { saveStaffPageNum } from "../../reduxStates/ListStaff";
const { width, height } = Dimensions.get("screen");

const StaffList = ({ navigation }) => {
  const [staffListData, setStaffListData] = useState([]);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const StaffListData = useSelector(ListStaff.selectStaffData);
  const StaffPaginatedData = useSelector(ListStaff.selectStaffPaginated);
  const SearchStaffData = useSelector(StaffSearch.selectStaffSearch);
  const FilterStaffData = useSelector(FilterStaff.selectfilterStaff);

  useEffect(() => {
    if (StaffPaginatedData?.length > 0) {
      setStaffListData(StaffPaginatedData);
    }
  }, [StaffPaginatedData]);

  useEffect(() => {
    if (SearchStaffData != null) {
      setStaffListData(SearchStaffData);
    }
  }, [SearchStaffData]);

  useEffect(() => {
    if (FilterStaffData != null) {
      setStaffListData(FilterStaffData);
    }
  }, [FilterStaffData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSearchValue("");
      callStaffListApi();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const callStaffListApi = () => {
    dispatch({
      type: "STAFF_LIST",
      payload: "",
    });
  };

  const searchStaff = (_text) => {
    setSearchValue(_text);
    if (_text == null) {
      setSearchValue("");
    } else {
      const payload = {
        uri: `?search=${_text}`,
      };
      setTimeout(() => {
        dispatch({
          type: "SEARCH_STAFF",
          payload,
        });
      }, 2000);
    }
  };

  const onPressReset = () => {
    setSortOption("");
  };

  const onPressApply = () => {
    const payload = {
      uri: `?filterByProfession=${sortOption}`,
    };
    dispatch({
      type: "FILTER_STAFF",
      payload,
    });
    setSortVisible(false);
  };

  const fetchMoreData = () => {
    if (searchValue == "" && sortOption == "") {
      if (StaffListData?.data?.pagination?.hasNextPage == true) {
        dispatch(
          saveStaffPageNum(StaffListData?.data?.pagination?.currentPage + 1),
        );
        const payload = {
          uri: `?page=${StaffListData?.data?.pagination?.currentPage + 1}`,
        };
        dispatch({
          type: "STAFF_LIST",
          payload,
        });
      }
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate(config.routes.STAFF_DETAIL, { staffDetail: item })
        }
        style={styles.conatiner}
      >
        <CardView
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={6}
          style={styles.cardView}
        >
          <View style={styles.cardSubView}>
            <View style={styles.detailsContainer}>
              <View style={styles.detailDataView}>
                <Text style={styles.titleText}>
                  {item?.firstName} {item?.middleName} {item?.lastName}
                </Text>
                <View style={styles.proffesionView}>
                  <Text style={styles.professiionText}>{item?.profession}</Text>
                  <Text style={styles.professiionTextInitial}>
                    Initials- {item?.initials}
                  </Text>
                </View>

                <Pressable
                  onPress={() => Linking.openURL(`tel:${item?.mobile}`)}
                  style={styles.callIconConatiner}
                >
                  <Text style={styles.onDutyzText}>
                    {item?.isOnDuty == true ? "On Duty" : "Not on Duty"}
                  </Text>

                  <Image
                    style={styles.callIcon}
                    source={config.images.CallIcon}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </CardView>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentView}>
        <View style={styles.searchBarConatiner}>
          <CardView
            cardElevation={1}
            cardMaxElevation={1}
            cornerRadius={6}
            style={styles.searchBarView}
          >
            <View style={styles.textInputView}>
              <Image
                style={styles.searchIconStyle}
                source={require("../../assets/images/dashboard/searchIcon.png")}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Search Staff"
                autoCapitalize={"none"}
                autoCorrect={false}
                value={searchValue}
                onChangeText={(val) => searchStaff(val)}
              />
            </View>
          </CardView>

          <CardView
            cardElevation={1}
            cardMaxElevation={1}
            cornerRadius={6}
            style={styles.filterCard}
          >
            <Pressable
              onPress={() => setSortVisible(true)}
              style={styles.filterCardView}
            >
              <Image
                style={styles.filterIcon}
                source={require("../../assets/images/dashboard/filterIcon.png")}
              />
            </Pressable>
          </CardView>
        </View>

        <LCGBottomModal
          modalTitle="Filter"
          visibleModal={sortVisible}
          onCloseModal={() => setSortVisible(false)}
          modalContent={() => (
            <>
              <Pressable
                onPress={() => setSortOption("doctor")}
                style={styles.sortModalContainer}
              >
                <Image
                  source={
                    sortOption == "doctor"
                      ? config.images.RadioCheck
                      : config.images.RadioUncheck
                  }
                  style={styles.radioOptionImage}
                />
                <Text style={styles.sortModalText}>
                  {config.strings.OTHERS.DOCTOR}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSortOption("nurse")}
                style={styles.sortModalContainer}
              >
                <Image
                  source={
                    sortOption == "nurse"
                      ? config.images.RadioCheck
                      : config.images.RadioUncheck
                  }
                  style={styles.radioOptionImage}
                />
                <Text style={styles.sortModalText}>
                  {config.strings.OTHERS.NURSE}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSortOption("")}
                style={styles.sortModalContainer}
              >
                <Image
                  source={
                    sortOption == ""
                      ? config.images.RadioCheck
                      : config.images.RadioUncheck
                  }
                  style={styles.radioOptionImage}
                />
                <Text style={styles.sortModalText}>
                  {config.strings.OTHERS.ALL}
                </Text>
              </Pressable>

              <View style={styles.buttonView}>
                <Pressable
                  onPress={() => onPressReset()}
                  style={styles.buttonSUbView}
                >
                  <Text style={styles.buttonReset}>
                    {config.strings.BTN_TEXTS.RESET}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onPressApply()}
                  style={styles.buttonApplyView}
                >
                  <Text style={styles.buttonApplyText}>
                    {config.strings.BTN_TEXTS.APPLY}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        />

        {staffListData && staffListData?.length > 0 ? (
          <FlatList
            data={staffListData}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.8}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.noFoundView}>
            <Image
              source={require("../../assets/images/no_stuff_found.png")}
              style={{ width: 200, height: 200, resizeMode: "contain" }}
            />
            <Text>{config.strings.OTHERS.NO_STAFF}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  container: { flex: 1, backgroundColor: config.colors.screenBackground },
  searchBarConatiner: {
    flexDirection: "row",
  },
  searchBarView: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 8,
    height: 40,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchIconStyle: { width: 20, height: 20, resizeMode: "contain" },
  textInputStyle: {
    marginLeft: 16,
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    width: "100%",
  },
  filterCard: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginLeft: 10,
  },
  filterCardView: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  filterIcon: { width: 20, height: 20, resizeMode: "contain" },
  scrollViewStyle: { flex: 1, paddingTop: 10 },
  sortIconView: {
    flexDirection: "row",
  },
  sortIconImage: { width: 30, height: 30, resizeMode: "contain" },
  sortModalContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  radioOptionImage: { width: 20, height: 20, resizeMode: "contain" },
  sortModalText: { marginLeft: 10, color: config.colors.neutralBlack },
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
  noFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  cardView: {
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingTop: 12,
    paddingBottom: 13,
    paddingHorizontal: 10,
  },
  cardSubView: {
    flexDirection: "row",
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  detailDataView: { flex: 1 },
  titleText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 15,
    color: "#25282B",
  },
  proffesionView: { flexDirection: "row" },
  professiionText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: "#25282B",
    marginTop: 5,
    textTransform: "capitalize",
  },
  professiionTextInitial: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 13,
    color: "#8D939E",
    marginTop: 5,
    marginLeft: 30,
  },
  docIdLabelText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: "#25282B",
    marginTop: 5,
  },
  docIdText: {
    fontFamily: fontFamily.LATO_BOLD_700,
    fontWeight: "600",
    fontSize: 13,
    color: "#8D939E",
    marginTop: 5,
  },
  callIconConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  onDutyzText: {
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontWeight: "400",
    fontSize: 13,
    color: config.colors.appTheme1,
    marginTop: 5,
  },
  callIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});

export default StaffList;
