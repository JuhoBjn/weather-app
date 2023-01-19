import { StyleSheet, View, Text, Image } from "react-native";

const WeatherView = ({ description, temperature, windSpeed }) => {
  return (
    <View style={weatherStyles.container}>
      <View style={weatherStyles.descriptionView}>
        <Text style={weatherStyles.descriptionText}>{description}</Text>
      </View>
      <View style={weatherStyles.lowerView}>
        <View style={weatherStyles.weatherIconView}>
          <Image
            style={weatherStyles.weatherIcon}
            source={require("../assets/favicon.png")}
          />
        </View>
        <View style={weatherStyles.lowerRightView}>
          <View style={weatherStyles.temperatureView}>
            <Text style={weatherStyles.temperatureText}>{temperature} C</Text>
          </View>
          <View style={weatherStyles.windSpeedView}>
            <Text style={weatherStyles.windSpeedText}>{windSpeed} m/s</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const weatherStyles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: "column",
  },
  descriptionView: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#2D3142",
    borderWidth: 1,
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 25,
  },
  lowerView: {
    flex: 4,
    flexDirection: "row",
  },
  weatherIconView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2D3142",
    borderWidth: 1,
  },
  weatherIcon: {
    resizeMode: "",
  },
  lowerRightView: {
    flex: 2,
    flexDirection: "column",
  },
  temperatureView: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#2D3142",
    borderWidth: 1,
  },
  temperatureText: {
    textAlign: "center",
    fontSize: 25,
  },
  windSpeedView: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#2D3142",
    borderWidth: 1,
  },
  windSpeedText: {
    textAlign: "center",
    fontSize: 25,
  },
});

export default WeatherView;
