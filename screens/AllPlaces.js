import { View } from "react-native";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getPlaces } from "../utils/database";

const AllPlaces = ({ route }) => {
  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getPlaces().then((res) => {
        setPlaces(res);
      });
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
