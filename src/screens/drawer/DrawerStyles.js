import { StyleSheet } from "react-native";
import config from "../../config";

export const styles = StyleSheet.create({
  layout: { flex: 1, backgroundColor: config.colors.white },
  dutyStausView: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    alignItems: "center",
  },
  dutStatusText: {
    fontSize: 15,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontWeight: "500",
    color: "#25282B",
  },
  offText: {
    fontSize: 15,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: "#ABAFB7",
    marginHorizontal: 5,
  },
  toggleImage: {
    width: 34,
    height: 34,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  onText: {
    fontSize: 15,
    fontFamily: config.fontFamily.LATO_BOLD_700,
    color: config.colors.neutralBlack,
    marginHorizontal: 5,
  },
  toggleSubView: { flexDirection: "row", alignItems: "center" },
  drawerOptionsImage: { width: 24, height: 24, resizeMode: "contain" },
  rightArrowImage: { width: 18, height: 18, resizeMode: "contain" },
  drawaerOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    alignItems: "center",
    marginTop: 30,
  },
  drawerOptionText: {
    fontSize: 15,
    fontFamily: config.fontFamily.LATO_REGULAR_400,
    fontWeight: "600",
    color: "#25282B",marginLeft:20
  },
});
