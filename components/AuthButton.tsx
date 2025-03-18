import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type AuthButtonProps = {
  text: string;
  iconName: string;
  iconSize?: number;
  isLoading: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const AuthButton = ({
  text,
  iconName,
  iconSize = 19,
  isLoading,
  onPress,
}: AuthButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.4}
    disabled={isLoading}
    style={styles.btnOutline}
    onPress={onPress}
  >
    <FontAwesome6
      name={iconName}
      size={iconSize}
      style={defaultStyles.btnIcon}
    />
    <Text style={styles.btnOutlineText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnOutline: {
    backgroundColor: "fff",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  btnOutlineText: {
    color: "black",
    fontSize: 16,
  },
});

export default AuthButton;
