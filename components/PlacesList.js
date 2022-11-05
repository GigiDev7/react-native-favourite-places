import { FlatList, Text, View, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  const selectPlace = () => {};

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlace} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});

export default PlacesList;
