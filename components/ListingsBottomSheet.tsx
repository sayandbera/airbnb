import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Listings from "@/components/Listings";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface Props {
  listings: any[];
  category: string;
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ listings, category }: Props) => {
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMapPress = () => {
    setTimeout(() => setRefresh(refresh + 1), 200);
    bottomSheetRef.current?.collapse();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors.lightGrey }}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <Listings listings={listings} category={category} refresh={refresh} />

        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={onShowMapPress} style={styles.btn}>
            <Ionicons name="map" size={20} color={"#fff"} />
            <Text style={{ fontFamily: "monSb", color: "#fff" }}>Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  absoluteView: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    paddingVertical: 14,
    paddingHorizontal: 24,
    height: 52,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingsBottomSheet;
