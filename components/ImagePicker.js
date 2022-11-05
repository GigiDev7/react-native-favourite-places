import { Alert, Button, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";

const ImagePicker = () => {
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();
  const [mediaStatus, requestMediaPermission] = useMediaLibraryPermissions();

  const verifyPermission = async () => {
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions to use app"
      );
      return false;
    }

    return true;
  };

  const verifyMedia = async () => {
    if (mediaStatus.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestMediaPermission();
      return permission.granted;
    }

    if (mediaStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions to use app"
      );
      return false;
    }

    return true;
  };

  const handleTakeImage = async () => {
    const resultPermission = await verifyPermission();

    if (!resultPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
  };

  const handleSelectImage = async () => {
    const resultPermission = await verifyMedia();

    if (!resultPermission) {
      return;
    }

    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
  };

  return (
    <View>
      <View></View>
      <Button title="Take image" onPress={handleTakeImage} />
      <Button title="select image" onPress={handleSelectImage} />
    </View>
  );
};

export default ImagePicker;
