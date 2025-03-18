import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Listing } from "@/interfaces/listing";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { REGION_BERLIN } from "@/constants/Utils";
import MapView from "react-native-map-clustering";

interface Props {
  listings: Listing[];
}
const ListingsMap = React.memo(({ listings }: Props) => {
  const router = useRouter();

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text style={styles.markerText}>{points}</Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Use Map from react-native-map-clustering */}
      <MapView
        style={StyleSheet.absoluteFill}
        animationEnabled={false}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={REGION_BERLIN}
        renderCluster={renderCluster}
      >
        {listings.map((listing: Listing) => (
          <Marker
            key={listing.id}
            title={listing.name}
            onPress={() => router.push(`/listing/${listing.id}`)}
            coordinate={{
              longitude: +listing.longitude,
              latitude: +listing.latitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€{listing.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

export default ListingsMap;

const styles = StyleSheet.create({
  marker: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  markerText: {
    fontSize: 14,
    color: "white",
    fontFamily: "monSb",
  },
});
