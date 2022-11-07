import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/IconButton";

const Map = ({ navigation, route }) => {
  const [coords, setCoords] = useState({
    latitude: route?.params?.lat || "",
    longitude: route?.params?.lng || "",
  });

  useLayoutEffect(() => {
    if (route?.params?.lat) {
      return;
    }
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
    latitude: route?.params?.lat || 41.71,
    longitude: route?.params?.lng || 44.78,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelectLocation = (e) => {
    if (route?.params?.lat) {
      return;
    }

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
