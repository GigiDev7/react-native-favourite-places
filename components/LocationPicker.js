import { Alert, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import OutlinedButton from "./OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const LocationPicker = () => {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState();
  const [loading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const verifyPermissions = async () => {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestPermission();

      return permission.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permission",
        "You need to grant location permissions"
      );
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    setIsLoading(true);
    const location = await getCurrentPositionAsync();
    setIsLoading(false);
    setLocation(location);
  };

  const pickOnMap = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={styles.mapPreview}>
        {loading ? (
          <Text>Getting your location...</Text>
        ) : location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></MapView>
        ) : (
          <Text>No location!</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocation} icon="location">
          Locate User
        </OutlinedButton>
        <OutlinedButton onPress={pickOnMap} icon="map">
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    marginBottom: 48,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
