import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={({ navigation }) => {
              return {
                title: "All Places",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    color={tintColor}
                    size={24}
                    icon="add"
                    onPress={() => navigation.navigate("AddPlace")}
                  />
                ),
              };
            }}
            name="AllPlaces"
            component={AllPlaces}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
