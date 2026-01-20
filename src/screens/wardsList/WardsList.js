import CardView from "../../components/CardView";/* eslint-disable react/self-closing-comp */
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
  FlatList,
} from "react-native";
import config from "../../config";

import fontFamily from "../../config/fontFamily";
import WardCard from "../../components/WardCard";
import { useDispatch, useSelector } from "react-redux";
import { User, ListWards, SearchWard } from "../../reduxStates";
import { CommonUtils, EnumUtils } from "../../utils";

const { width, height } = Dimensions.get("screen");

const WardsList = ({ navigation, route }) => {
  const [wardList, setWardList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  //Selectors
  const Listward = useSelector(ListWards.selectWardsList);
  const SearchWardData = useSelector(SearchWard.selectWardListData);
  const PaginatedWardList = useSelector(ListWards.selectWardListPaginated);

  const { showToast } = CommonUtils;
  const { toastTypes } = EnumUtils;

  useEffect(() => {
    if (SearchWardData?.length > 0) {
      setWardList(SearchWardData);
    } else {
      setWardList([]);
    }
  }, [SearchWardData]);

  useEffect(() => {
    if (PaginatedWardList?.length > 0) {
      setWardList(PaginatedWardList);
    } else {
      setWardList([]);
    }
  }, [PaginatedWardList]);

  useEffect(() => {
    callWardListApi();
  }, []);

  const callWardListApi = () => {
    const payload = {
      uri: `list?page=${Listward?.data?.pagination?.currentPage}`,
    };
    dispatch({
      type: "WARD_LIST",
      payload,
    });
  };

  const searchWard = (_text) => {
    setSearchValue(_text);
    if (_text == null) {
      setSearchValue("");
    } else {
      const payload = {
        uri: `list?search=${_text}`,
      };
      setTimeout(() => {
        dispatch({
          type: "SEARCH_WARD",
          payload,
        });
      }, 2000);
    }
  };

  const onPressOption = (wardID) => {
    dispatch(ListWards.saveWardIdSelected(wardID));
    navigation.navigate(config.routes.PATIENTS_LIST_STACK);
    navigation.goBack();
  };

  const fetchMoreData = () => {
    if (Listward?.data?.pagination?.totalItems > wardList?.length) {
      const payload = {
        uri: `list?page=${Listward?.data?.pagination?.currentPage + 1}`,
      };
      dispatch({
        type: "WARD_LIST",
        payload,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardConatiner}>
        <View>
          <CardView
            cardElevation={1}
            cardMaxElevation={1}
            cornerRadius={6}
            style={styles.cardView}
          >
            <View style={styles.searchIconView}>
              <Image
                style={styles.searchImg}
                source={require("../../assets/images/dashboard/searchIcon.png")}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Search Wards"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(val) => searchWard(val)}
                value={searchValue}
              />
            </View>
          </CardView>
        </View>

        {wardList && wardList?.length > 0 ? (
          <View style={styles.scrolSubContainer}>
            <FlatList
              data={wardList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={fetchMoreData}
              onEndReachedThreshold={0.001}
              renderItem={({ item }) => {
                return (
                  <WardCard
                    title={item?.name}
                    count={item?.totalPatient}
                    navigation={navigation}
                    idWard={item?.wardId}
                    onPressOption={() => onPressOption(item?.wardId)}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.noFoundView}>
            <Text>{config.strings.OTHERS.NO_WARD}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.screenBackground },
  cardConatiner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  cardView: {
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  searchIconView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  searchImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textInputStyle: {
    marginLeft: 16,
    fontFamily: fontFamily.LATO_REGULAR_400,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    width: "100%",
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 10,
  },
  scrolSubContainer: {
    flex: 1,
  },
  noFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
});

export default WardsList;
