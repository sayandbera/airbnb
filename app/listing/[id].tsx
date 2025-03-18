import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React, { useLayoutEffect, useMemo, useRef } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Listing } from "@/interfaces/listing";
import listingsData from "@/assets/data/airbnb-listings.json";
import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { screenWidth } from "@/constants/Utils";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const IMAGE_HEIGHT = 250;

const ListingDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing: Listing | undefined = useMemo(
    () => (listingsData as Listing[]).find((l) => l.id === id),
    [id]
  );

  const shareListing = async () => {
    try {
      if (listing) {
        await Share.share({
          title: listing.name,
          url: listing.listing_url,
        });
      } else {
        throw new Error("Listing not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation();

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
          [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
          [2, 1, 1]
        ),
      },
    ],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 1.5], [0, 1]),
  }));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header]}
        ></Animated.View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.topBarIconBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={23} color={"#000"} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.topBarIconBtn} onPress={shareListing}>
            <Ionicons name="share-outline" size={23} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarIconBtn}>
            <Ionicons name="heart-outline" size={23} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  if (!listing) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Listing not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Image */}
        <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        {/* Info Container */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms ·{" "}
            {listing.beds} bed · {listing.bathrooms} bathrooms
          </Text>

          {/* Ratings and Reviews */}
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={Colors.primary} />
            <Text style={styles.ratingText}>
              {Number.isInteger(listing.review_scores_rating / 20)
                ? listing.review_scores_rating / 20
                : (listing.review_scores_rating / 20).toFixed(1)}
              {" · "}
              {listing.number_of_reviews} reviews
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Host Section */}
          <View style={styles.hostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.host}
            />
            <View>
              <Text style={styles.hostName}>Hosted by {listing.host_name}</Text>
              <Text style={styles.hostSince}>
                Host since {listing.host_since}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>

      {/* Footer */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.duration(500)}
      >
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerPrice}>€{listing.price}</Text>
          <Text style={styles.footerNight}> / night</Text>
        </View>

        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>Reserve</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  image: {
    width: screenWidth,
    height: IMAGE_HEIGHT,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: 0.3,
    lineHeight: 30,
  },
  location: {
    marginTop: 10,
    fontFamily: "monSb",
    color: Colors.grey,
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontFamily: "monSb",
    fontSize: 14,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGrey,
    marginVertical: 16,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostName: {
    fontWeight: "500",
    fontSize: 16,
  },
  hostSince: {
    fontSize: 14,
    color: Colors.grey,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 23,
    color: Colors.grey,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  footerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 20,
    fontFamily: "monSb",
  },
  footerNight: {
    fontFamily: "mon",
    fontSize: 14,
    color: Colors.grey,
  },

  topBarIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
});

export default ListingDetails;
