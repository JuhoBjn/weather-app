import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurrentWeather from "./pages/CurrentWeather";
import WeatherForecast from "./pages/WeatherForecast";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Current Weather'>
        <Tab.Screen name='Current Weather' component={CurrentWeather} />
        <Tab.Screen name='Weather Forecast' component={WeatherForecast} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
