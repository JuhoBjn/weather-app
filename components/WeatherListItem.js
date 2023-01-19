import { StyleSheet, View, Text, Image } from "react-native";

const WeatherListItem = ({
  time,
  description,
  temperature,
  windSpeed,
  icon,
}) => {
  return (
    <View style={listItemStyles.container}>
      <Image
        style={listItemStyles.icon}
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
      />
      <Text style={listItemStyles.listItem}>Time: {time}</Text>
      <Text style={listItemStyles.listItem}>Description: {description}</Text>
      <Text style={listItemStyles.listItem}>Temperature: {temperature}</Text>
      <Text style={listItemStyles.listItem}>Wind speed: {windSpeed}</Text>
    </View>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "silver",
  },
  listItem: {
    fontSize: 16,
    "@media {min-width: 400px": {
      fontSize: 20,
    },
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WeatherListItem;
