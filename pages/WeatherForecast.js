import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { API_KEY } from "@env";
import * as Location from "expo-location";
import WeatherListItem from "../components/WeatherListItem";
import LocationInput from "../components/LocationInput";

const WeatherForecast = ({ navigation }) => {
  const [locationName, setLocationName] = useState("Inari");
  const [weatherForecast, setWeatherForecast] = useState({
    city: { name: "Fetching" },
  });

  const fetchWeatherForecast = async () => {
    console.log(`Fetching weather forecast for ${locationName}`);
    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      if (forecastData.cod === "404") {
        throw `Failed to find weather for location ${locationName}`;
      }
      setWeatherForecast(forecastData);
    } catch (error) {
      console.log(error);
      Alert.alert(`Failed to fetch weather: ${error.message}`);
      return;
    }
  };

  const fetchLocationForecast = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    // Get the device coordinates.
    let location;
    try {
      location = await Location.getCurrentPositionAsync();
    } catch (error) {
      console.log(error);
      return;
    }

    // Fetch the weather forecast for the location.
    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setWeatherForecast(forecastData);
    } catch (error) {
      console.log(error);
      Alert.alert("Could not find weather for your current location.");
      return;
    }
  };

  useEffect(() => {
    fetchWeatherForecast();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={forecastStyles.container}
    >
      <View style={forecastStyles.container}>
        <View style={forecastStyles.locationView}>
          <Text style={forecastStyles.location}>
            {weatherForecast.city.name}
          </Text>
        </View>
        <View style={forecastStyles.flatListView}>
          <FlatList
            data={weatherForecast.list}
            renderItem={({ item }) => (
              <WeatherListItem
                time={item.dt_txt}
                description={item.weather[0].main}
                temperature={item.main.temp}
                windSpeed={item.wind.speed}
                icon={item.weather[0].icon}
              />
            )}
          />
        </View>
        <View style={forecastStyles.locationInputView}>
          <LocationInput
            locationName={locationName}
            setLocationName={setLocationName}
            fetchWeather={fetchWeatherForecast}
            fetchWeatherCurrentLocation={fetchLocationForecast}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const forecastStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 10,
  },
  locationView: {
    flex: 0.5,
    justifyContent: "center",
  },
  location: {
    fontSize: 25,
    textAlign: "center",
  },
  flatListView: {
    flex: 6.5,
  },
  locationInputView: {
    flex: 3,
  },
});

export default WeatherForecast;
