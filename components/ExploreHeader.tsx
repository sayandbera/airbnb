import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { categories } from "@/constants/DummyValue";

interface Props {
  onCategoryChange: (categoryName: string) => void;
}

const ExploreHeader = ({ onCategoryChange }: Props) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const renderCategoryItem = useCallback(
    (category: { name: string; icon: string }, index: number) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setActiveIndex(index);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onCategoryChange(category.name);
        }}
        style={[
          styles.categoriesBtn,
          activeIndex === index && styles.categoriesBtnActive,
        ]}
      >
        <MaterialIcons
          name={category.icon as any}
          size={24}
          color={activeIndex === index ? "black" : Colors.grey}
        />
        <Text
          style={[
            styles.categoryText,
            activeIndex === index && styles.categoryTextActive,
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    ),
    [activeIndex]
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Top App Bar */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchBar}
          onPress={() => router.push("/(modals)/booking")}
        >
          <Ionicons name="search" size={24} color={Colors.grey} />
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text style={styles.searchBarText}>Where to?</Text>
            <Text style={styles.searchBarSubText}>
              Anywhere · Any week · Add guests
            </Text>
          </View>
          <Ionicons
            name="options-outline"
            size={24}
            color={Colors.grey}
            style={styles.filterBtn}
          />
        </TouchableOpacity>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContainer}
        >
          {categories.map(renderCategoryItem)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 130,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBarText: {
    fontWeight: "bold",
    color: Colors.grey,
    fontSize: 16,
  },
  searchBarSubText: {
    fontSize: 14,
    color: Colors.lightGrey,
  },
  filterBtn: {
    padding: 6,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGrey,
  },
  categoryScrollContainer: {
    flexDirection: "row", // Crucial for horizontal layout
    gap: 26,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 12,
    fontFamily: "mon-sb",
    color: "#000",
  },
  categoriesBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    paddingHorizontal: 6,
  },
  categoriesBtnActive: {
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
});

export default ExploreHeader;
