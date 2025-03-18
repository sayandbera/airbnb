import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <ClickableText
        text="Stays"
        index={0}
        active={active}
        onPress={() => setActive(0)}
      />

      <ClickableText
        text="Experiences"
        index={1}
        active={active}
        onPress={() => setActive(1)}
      />
    </View>
  );
};

interface Props {
  text: string;
  index: number;
  active: number;
  onPress: () => void;
}
const ClickableText = ({ text, index, active, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <Text
      style={[
        styles.text,
        {
          color: active == index ? "#000" : Colors.grey,
          textDecorationLine: active == index ? "underline" : "none",
        },
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  text: {
    fontFamily: "monSb",
    fontSize: 18,
  },
});

export default ModalHeaderText;
