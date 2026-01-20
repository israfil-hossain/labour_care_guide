import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import config from "../../config";
import { CommonUtils, EnumUtils } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { User, ParityList } from "../../reduxStates";
import colors from "../../config/colors";

const ViewParity = ({ navigation, route }) => {
  const dispatch = useDispatch();
  //Selectors
  const ParityListData = useSelector(ParityList.selectParityList);

  useEffect(() => {
    callParityDetailApi();
  }, []);

  const callParityDetailApi = () => {
    const payload = {
      uri: `${route?.params?.patId}`,
    };
    dispatch({
      type: "PARITY_DETAIL",
      payload,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headCard}>
          <View style={styles.headStyle}>
            <Text style={styles.headText}>{config.strings.OTHERS.PVALUE}</Text>
            <Text style={styles.headText}>
              {config.strings.OTHERS.CESARIAN_OR_NVD}
            </Text>
            <Text style={styles.headText}>{config.strings.OTHERS.STATUS}</Text>
          </View>
        </View>

        <View style={styles.ViewCard}>
          {ParityListData?.data?.parities?.length > 0 ? (
            ParityListData?.data?.parities.map((item, index) => (
              <>
                <View style={styles.headStyle}>
                  <Text style={styles.cardText}>{item?.value}</Text>
                  <Text
                    style={[
                      styles.cesarText,
                      {
                        color:
                          item?.type == "Cesarian"
                            ? config.colors.appTheme1
                            : "#1EBF7B",
                      },
                    ]}
                  >
                    {item?.type}
                  </Text>
                  <Text style={styles.cardText}>{item?.babyStatus}</Text>
                </View>

                <View style={styles.borderCard}></View>
              </>
            ))
          ) : (
            <View style={styles.noDataFound}>
              <Text>{config.strings.OTHERS.NO_DETAILS}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.screenBackground,
  },
  headCard: {
    backgroundColor: "#EDF0F5",
    paddingVertical: 13,
    marginHorizontal: 20,
    marginTop: 20,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  headText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  headStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ViewCard: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    marginHorizontal: 20,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 2,
    elevation: 5,
  },
  cesarText: {
    fontSize: 15,
    color: "#FC5285",
    fontWeight: "bold",
  },
  nvdText: {
    fontSize: 15,
    color: "#1EBF7B",
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 15,
    color: "black",
    paddingHorizontal: 20,
    textTransform: "capitalize",
  },
  borderCard: {
    height: 2,
    backgroundColor: "#DADFEB",
    marginVertical: 15,
    opacity: 0.6,
  },
  noDataFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
});

export default ViewParity;
