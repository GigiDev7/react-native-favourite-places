import { View } from "react-native";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

const AllPlaces = ({ route }) => {
  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const place = route.params.place;
      setPlaces((prev) => [...prev, place]);
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
