import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/IconButton";

const Map = ({ navigation }) => {
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocation}
        />
      ),
    });
  }, [coords]);

  const region = {
    latitude: 41.71,
    longitude: 44.78,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelectLocation = (e) => {
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;

    setCoords({ latitude: lat, longitude: lng });
  };

  const savePickedLocation = () => {
    if (!coords.latitude || !coords.longitude) {
      Alert.alert("No location picked", "You have to pick a location first");
      return;
    }
    navigation.navigate("AddPlace", {
      coords,
    });
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
      {coords.latitude && coords.longitude && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
