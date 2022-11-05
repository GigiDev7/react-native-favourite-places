import { Alert, StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";
import OutlinedButton from "./OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

const LocationPicker = () => {
  const [locationPermission, requestPermission] = useForegroundPermissions();

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

    const location = await getCurrentPositionAsync();
    console.log(location);
  };

  const pickOnMap = () => {};

  return (
    <View>
      <View style={styles.mapPreview}></View>
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
});

export default LocationPicker;
