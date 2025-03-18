import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import { categories } from "@/constants/DummyValue";
import listingsData from "@/assets/data/airbnb-listings.json";
import ListingsMap from "@/components/ListingsMap";
import { Listing } from "@/interfaces/listing";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";

const Explore = () => {
  const [category, setCategory] = useState(categories[0].name);
  const listings = useMemo(() => listingsData as Listing[], []);

  const onCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={defaultStyles.container}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onCategoryChange} />,
        }}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <ListingsMap listings={listings} />
        <ListingsBottomSheet category={category} listings={listings} />
      </GestureHandlerRootView>
    </View>
  );
};

export default Explore;
