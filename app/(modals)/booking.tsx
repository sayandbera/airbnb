import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutDown,
  SlideInDown,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";
import { guestsGroups } from "@/constants/DummyValue";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Booking = () => {
  const router = useRouter();
  const [openedCard, setOpenedCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guestsGroups);
  const today = new Date().toISOString().substring(0, 10);

  const onClearAllPress = () => {
    setSelectedPlace(0);
    setOpenedCard(0);
    setGroups(guestsGroups);
  };

  return (
    <BlurView intensity={100} style={styles.container} tint="extraLight">
      {/* Where card */}
      <View style={styles.card}>
        {openedCard != 0 ? (
          <AnimatedTouchableOpacity
            onPress={() => setOpenedCard(0)}
            style={styles.cardPreview}
            entering={SlideInDown.duration(200)}
            exiting={FadeOutDown}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewText}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        ) : (
          <>
            <Text style={styles.cardHeader}>Where to?</Text>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.cardBody}
            >
              <View style={styles.searchSection}>
                <Ionicons
                  style={styles.searchIcon}
                  name="search-outline"
                  size={20}
                  color="#000"
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destinations"
                  placeholderTextColor={Colors.grey}
                />
              </View>

              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.placesContainer}
                showsHorizontalScrollIndicator={false}
              >
                {places.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedPlace(index)}
                    key={index}
                  >
                    <Image
                      source={item.img}
                      style={
                        selectedPlace == index
                          ? styles.placeSelected
                          : styles.place
                      }
                    />
                    <Text
                      style={{
                        fontFamily: "mon",
                        paddingTop: 6,
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </>
        )}
      </View>

      {/* When card */}
      <View style={styles.card}>
        {openedCard != 1 ? (
          <AnimatedTouchableOpacity
            onPress={() => setOpenedCard(1)}
            style={styles.cardPreview}
            entering={SlideInDown.duration(200)}
            exiting={FadeOutDown}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewText}>Any week</Text>
          </AnimatedTouchableOpacity>
        ) : (
          <>
            <Text style={styles.cardHeader}>When's your trip?</Text>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.cardBody}
            >
              <DatePicker
                options={{
                  defaultFont: "mon",
                  headerFont: "monSb",
                  mainColor: Colors.primary,
                  borderColor: "transparent",
                }}
                current={today}
                selected={today}
                mode={"calendar"}
              />
            </Animated.View>
          </>
        )}
      </View>

      {/* Guests */}
      <View style={styles.card}>
        {openedCard != 2 ? (
          <AnimatedTouchableOpacity
            onPress={() => setOpenedCard(2)}
            style={styles.cardPreview}
            entering={SlideInDown.duration(200)}
            exiting={FadeOutDown}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewText}>Add guests</Text>
          </AnimatedTouchableOpacity>
        ) : (
          <>
            <Text style={styles.cardHeader}>Who's coming?</Text>
            <Animated.View style={styles.cardBody}>
              {groups.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.guestItem,
                    index + 1 < guestsGroups.length ? styles.itemBorder : null,
                  ]}
                >
                  <View>
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "mon",
                        fontSize: 14,
                        color: Colors.grey,
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {groups[index].count > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          const newGroups = [...groups];
                          newGroups[index].count--;
                          setGroups(newGroups);
                        }}
                      >
                        <Ionicons
                          name="remove-circle-outline"
                          size={28}
                          color={Colors.grey}
                        />
                      </TouchableOpacity>
                    )}
                    <Text
                      style={{
                        fontFamily: "mon",
                        fontSize: 16,
                        minWidth: 18,
                        textAlign: "center",
                      }}
                    >
                      {item.count}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[index].count++;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={28}
                        color={Colors.grey}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>

      {/* Bottom bar */}
      <View style={defaultStyles.footer}>
        <TouchableOpacity
          style={{ height: "100%", justifyContent: "center" }}
          onPress={onClearAllPress}
        >
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[defaultStyles.btn, { gap: 6, paddingHorizontal: 16 }]}
        >
          <Ionicons name="search-outline" size={22} color={"#fff"} />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: "mon-b",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  searchSection: {
    height: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  clearText: {
    fontSize: 18,
    fontFamily: "monSb",
    textDecorationLine: "underline",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "monSb",
  },

  placesContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 25,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },

  previewText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },

  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGrey,
  },
});
