import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = () => {
  const region = {
    latitude: 41.71,
    longitude: 44.78,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return <MapView style={styles.map} initialRegion={region}></MapView>;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
