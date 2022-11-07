import { Alert, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import OutlinedButton from "./OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import MapView from "react-native-maps";

const LocationPicker = ({ handleLocationChange }) => {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState();
  const [loading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const coords = route?.params?.coords;
      setLocation(coords);
      handleLocationChange(coords);
    }
  }, [isFocused, route]);

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
    setLocation(location.coords);
    handleLocationChange(location.coords);
  };

  const pickOnMap = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={styles.mapPreview}>
        {loading ? (
          <Text>Getting your location please wait...</Text>
        ) : location ? (
          <MapView
            scrollEnabled={false}
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
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
    borderRadius: 4,
  },
});

export default LocationPicker;
