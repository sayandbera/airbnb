import {
  View,
  Text,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOutUp } from "react-native-reanimated";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

interface Props {
  listings: Array<Listing>;
  category: string;
  refresh: number;
}
const Listings = ({ listings, category, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh && listRef.current) {
      listRef.current.scrollToOffset({
        animated: false,
        offset: 0,
      });
    }
  }, [refresh]);

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 200);
  }, [category]);

  const renderListing: ListRenderItem<Listing> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listingContainer}
            entering={FadeIn}
            exiting={FadeOutUp}
          >
            <Image source={{ uri: item.xl_picture_url }} style={styles.image} />
            <TouchableOpacity style={styles.bookmarkIconBtn}>
              <Ionicons name="bookmark-outline" size={19} color="black" />
            </TouchableOpacity>

            <View style={styles.listingDetailContainer}>
              <View style={{ flex: 1, gap: 5 }}>
                <Text style={{ fontFamily: "monSb", lineHeight: 15 }}>
                  {item.smart_location}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {item.name} ({item.property_type})
                </Text>

                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Text style={{ fontWeight: "bold" }}>€ {item.price}</Text>
                  <Text style={{ fontWeight: "semibold" }}> / night</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons name="star" size={16} color="black" />
                <Text>{item.review_scores_rating / 20}</Text>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        ref={listRef}
        data={loading ? [] : listings}
        renderItem={renderListing}
        ListHeaderComponent={
          <Text style={styles.listHeaderText}>
            {listings.length} {category}
          </Text>
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listingContainer: {
    padding: 16,
    gap: 6,
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
    borderRadius: 10,
  },
  bookmarkIconBtn: {
    position: "absolute",
    top: 22,
    right: 22,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: 7,
    borderRadius: 50,
  },
  listingDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 8,
  },
  listHeaderText: {
    fontFamily: "monSb",
    textAlign: "center",
  },
});

export default Listings;
