import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/OutlinedButton";
import { Colors } from "../constants/colors";
import { getSinglePlace } from "../utils/database";

const PlaceDetails = ({ route, navigation }) => {
  const [place, setPlace] = useState();

  const placeId = route.params.placeId;

  const handleOpenMap = () => {
    navigation.navigate("Map", {
      lat: place.lat,
      lng: place.lng,
    });
  };

  useEffect(() => {
    getSinglePlace(placeId).then((res) => {
      setPlace(res);
      navigation.setOptions({
        title: res.title,
      });
    });
  }, [placeId]);

  if (!place) {
    return (
      <Text style={{ justifyContent: "center", alignItems: "center" }}>
        Loading...
      </Text>
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {place.address}-lat:{place.lat}-lng:{place.lng}
          </Text>
        </View>
        <OutlinedButton icon="map" onPress={handleOpenMap}>
          View On Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetails;
