import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store";

import HomeScreen from "./src/screens/HomeScreen";
import AnthropometryScreen from "./src/screens/AnthropometryScreen";
import DiaryScreen from "./src/screens/DiaryScreen";
import MealsScreen from "./src/screens/MealsScreen";
import StoreScreen from "./src/screens/StoreScreen";
import LoginScreen from "./src/screens/LoginScreen";
import StartScreen from "./src/screens/StartScreen";
import HomeScreenNutri from "./src/screens/HomeScreenNutri";
import RegisterPatientScreen from "./src/screens/RegisterPatientScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Meals" component={MealsScreen} />
          <Stack.Screen name="Diary" component={DiaryScreen} />
          <Stack.Screen
            name="Anthropometry"
            component={AnthropometryScreen}
            options={{ title: "Physical Assessment" }}
          />
          <Stack.Screen name="Store" component={StoreScreen} />
          <Stack.Screen name="HomeNutri" component={HomeScreenNutri} />
          <Stack.Screen name="Register" component={RegisterPatientScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
