import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurrentWeather from "./pages/CurrentWeather";
import WeatherForecast from "./pages/WeatherForecast";
const Tab = createBottomTabNavigator();

const App = () => {
  const [locationName, setLocationName] = useState("Inari");

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Current Weather'
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            if (route.name === "Current Weather") {
              return (
                <Image
                  source={require("./assets/cloud-icon.png")}
                  style={iconStyles.tabBarIcon}
                />
              );
            } else if (route.name === "Weather Forecast") {
              return (
                <Image
                  source={require("./assets/list-icon.png")}
                  style={iconStyles.tabBarIcon}
                />
              );
            }
          },
        })}
      >
        <Tab.Screen
          name='Current Weather'
          component={CurrentWeather}
          locationName={locationName}
          setLocationName={setLocationName}
        />
        <Tab.Screen
          name='Weather Forecast'
          component={WeatherForecast}
          locationName={locationName}
          setLocationName={setLocationName}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const iconStyles = StyleSheet.create({
  tabBarIcon: {
    height: 30,
    width: 30,
  },
});

export default App;
