import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { API_KEY } from "@env";
import Header from "../components/Header";
import WeatherInfo from "../components/WeatherInfo";
import LocationInput from "../components/LocationInput";

const CurrentWeather = ({ navigation }) => {
  const [locationName, setLocationName] = useState("Inari");
  const [weather, setWeather] = useState({
    city: "Inari",
    description: "Snowing",
    temperature: -15,
    windSpeed: 4,
  });

  // Fetch weather for input location.
  const fetchWeather = async () => {
    console.log(`Fetching weather for ${locationName}`);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      if (weatherData.cod === "404") {
        Alert.alert(`Could not find weather for ${locationName}`);
        return;
      }

      // Interpret response into the form I want to use.
      const fetchedWeather = {
        city: weatherData.name,
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp,
        windSpeed: weatherData.wind.speed,
      };

      setWeather(fetchedWeather);
    } catch (error) {
      console.log(error);
      Alert.alert(`Failed to fetch weather: ${error.message}`);
    }
  };

  const fetchLocationWeather = async () => {
    console.log("Fetching weather for current location");
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
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      // Interpret response into the form I want to use.
      const fetchedWeather = {
        city: weatherData.name,
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp,
        windSpeed: weatherData.wind.speed,
      };

      setWeather(fetchedWeather);
    } catch (error) {
      console.log(error);
      Alert.alert(`Failed to fetch weather: ${error.message}`);
      return;
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Header cityName={weather.city} />
          </View>
          <View style={styles.weatherView}>
            <WeatherInfo
              description={weather.description}
              temperature={weather.temperature}
              windSpeed={weather.windSpeed}
            />
          </View>
          <View style={styles.locationInput}>
            <LocationInput
              locationName={locationName}
              setLocationName={setLocationName}
              fetchWeather={fetchWeather}
              fetchWeatherCurrentLocation={fetchLocationWeather}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
  },
  weatherView: {
    flex: 6,
  },
  locationInput: {
    flex: 3,
  },
});

export default CurrentWeather;
