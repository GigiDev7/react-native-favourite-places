import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/IconButton";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            options={({ navigation }) => {
              return {
                title: "Your Favourite Places",
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
          <Stack.Screen
            options={{ title: "Add a new place" }}
            name="AddPlace"
            component={AddPlace}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
