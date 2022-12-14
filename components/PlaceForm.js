import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { Place } from "../models/place";
import { insertPlace } from "../utils/database";

const PlaceForm = () => {
  const [title, setTitle] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const navigation = useNavigation();

  const handleTitleChange = (enteredValue) => {
    setTitle(enteredValue);
  };

  const handleImageChange = (imageUri) => {
    setPickedImage(imageUri);
  };

  const handleLocationChange = (location) => {
    setPickedLocation(location);
  };

  const handleSavePlace = async () => {
    const place = new Place(title, pickedImage, "Kutaisi", pickedLocation);
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };

  return (
    <ScrollView style={styles.form}>
      <View style={{ marginBottom: 48 }}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
          />
        </View>
        <ImagePicker handleImageChange={handleImageChange} />
        <LocationPicker handleLocationChange={handleLocationChange} />
        <Button onPress={handleSavePlace}>Add Place</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
