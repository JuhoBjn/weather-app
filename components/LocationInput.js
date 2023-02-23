import { StyleSheet, TextInput, Button, View } from "react-native";

const WeatherInput = ({
  locationName,
  setLocationName,
  fetchWeather,
  fetchWeatherCurrentLocation,
}) => {
  return (
    <View style={locationInputStyles.container}>
      <View style={locationInputStyles.textInputView}>
        <TextInput
          style={locationInputStyles.inputField}
          inputMode='text'
          placeholder={locationName}
          placeholderTextColor={"white"}
          clearTextOnFocus={true}
          onChangeText={setLocationName}
        />
      </View>
      <View style={locationInputStyles.buttonView}>
        <Button onPress={fetchWeather} title={"Fetch weather"}></Button>
      </View>
      <View style={locationInputStyles.buttonView}>
        <Button
          onPress={fetchWeatherCurrentLocation}
          title='Fetch for current location'
        />
      </View>
    </View>
  );
};

const locationInputStyles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#2D3142",
  },
  textInputView: {
    flex: 1,
    justifyContent: "center",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "white",
    height: 50,
    margin: 10,
    padding: 10,
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  buttonView: {
    flex: 0.5,
    justifyContent: "flex-start",
  },
});

export default WeatherInput;
