import { StyleSheet } from "react-native";
import config from "../../config";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: config.colors.screenBackground },
  drugCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  drugText: {
    fontSize: 15,
    color: "#7D8491",
  },
  textInput: {
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "lightgray",
    marginBottom: 15,
  },
  img: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  maleText: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
  },
  femaleText: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
  },
  docText: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
  },
  nursText: {
    fontSize: 15,
    color: "gray",
    marginLeft: 20,
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
  radioOptionView: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    marginVertical: 12,
  },
  datebirthView:{
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderColor: "lightgray",
    marginBottom: 15,
  },
  dateTextInput:{ width: "90%",color:'black' }
});
