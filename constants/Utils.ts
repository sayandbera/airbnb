import { Dimensions } from "react-native";
import { Region } from "react-native-maps";

const REGION_BERLIN: Region = {
  latitude: 52.520008,
  longitude: 13.404954,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.042,
};
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export { screenWidth, screenHeight, REGION_BERLIN };
