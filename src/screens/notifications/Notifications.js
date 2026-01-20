import CardView from "../../components/CardView";import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { User, ListNotifications } from "../../reduxStates";


const NotificationList = ({ navigation }) => {
  const dispatch = useDispatch();
  const NotfListData = useSelector(ListNotifications.selectNotfList);


  useEffect(() => {
    callNotfListApi();
  }, []);

  const callNotfListApi = () => {
    dispatch({
      type: "NOTIFCATION_LIST",
      payload: "",
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {NotfListData?.data?.notifications?.length > 0 ? (
        <FlatList
          data={NotfListData?.data?.notifications}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={({ item, index }) => (
            <View style={styles.notifCardView}>
              <Text style={styles.titleTxt}>{item?.title}</Text>
              <Text
                style={{
                  ...styles.bodyText,
                }}
              >
                {item?.body}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.dateTxt}>{item?.created}</Text>
                <Text style={{ ...styles.dateTxt, marginLeft: 5 }}></Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.nofound}>
          <Text style={styles.titleTxt}>
            {config.strings.OTHERS.NO_NOTFICATION}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.screenBackground },
  notifCardView: {
    marginHorizontal: 10,
    borderRadius: 4,
    marginVertical: 10,
    paddingVertical: 10,

    backgroundColor: config.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    paddingHorizontal: 8,
  },
  titleTxt: {
    fontFamily: config.fontFamily.LATO_BOLD_700,
    fontSize: 15,
    color: config.colors.neutralBlack,
  },
  dateTxt: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 12,
    color: config.colors.toastDefault,
    marginVertical: 3,
  },
  bodyText: {
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontSize: 13,
    color: config.colors.neutralBlack,
    marginVertical: 3,
  },
  nofound: { flex: 1, justifyContent: "center", alignItems: "center" },
});
