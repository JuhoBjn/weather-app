import { useState } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
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

  const fetchWeather = async () => {
    // Fetch coordinates for location.
    console.log(`Fetching coordinates for ${locationName}`);
    let longitude, latitude;
    try {
      const locationResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${API_KEY}`
      );
      const locationData = await locationResponse.json();
      if(locationData.length === 0) {
        throw `Failed to find location ${locationName}`;
      }
      latitude = locationData[0].lat;
      longitude = locationData[0].lon;
    } catch (err) {
      console.log(err);
      Alert.alert("Could not find location. Please try again.");
      return;
    }

    console.log(`Fetching weather for ${locationName}`);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
      <View style={styles.refreshButton}>
        <LocationInput
          locationName={locationName}
          setLocationName={setLocationName}
          fetchWeather={fetchWeather}
        />
      </View>
    </View>
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
  refreshButton: {
    flex: 3,
  },
});

export default CurrentWeather;
