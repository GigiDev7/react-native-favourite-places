import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../constants/colors";

const ImagePicker = () => {
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();
  const [mediaStatus, requestMediaPermission] = useMediaLibraryPermissions();
  const [imagePrev, setImagePrev] = useState();

  const verifyPermission = async (type) => {
    if (type === "camera") {
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
    } else if (type === "media") {
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
    }
  };

  const handleImage = async (type) => {
    let resultPermission;
    if (type === "camera") {
      resultPermission = await verifyPermission("camera");
    } else if (type === "media") {
      resultPermission = await verifyPermission("media");
    }

    if (!resultPermission) {
      return;
    }

    let image;
    if (type === "camera") {
      image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
    } else if (type === "media") {
      image = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
    }

    if (image && !image.cancelled) {
      setImagePrev(image.uri);
    }
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        {imagePrev ? (
          <Image style={styles.image} source={{ uri: imagePrev }} />
        ) : (
          <Text>No image taken or selected yet.</Text>
        )}
      </View>
      <Button title="Take image" onPress={() => handleImage("camera")} />
      <Button title="select image" onPress={() => handleImage("media")} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
