import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  btn: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "monSb",
    paddingRight: 20,
    paddingLeft: 20,
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.lightGrey,
    elevation: 8, // Increased for better shadow on Android
    shadowColor: "#000",
    shadowOpacity: 0.15, // Slightly higher for visibility
    shadowRadius: 10, // Makes shadow softer
    shadowOffset: {
      width: 0,
      height: -2, // Lift shadow upwards slightly
    },
  },
});
