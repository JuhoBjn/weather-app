import { format } from "date-fns";
import { StyleSheet, View, Text, Image } from "react-native";

const WeatherListItem = ({
  time,
  description,
  temperature,
  windSpeed,
  icon,
}) => {
  time = Date.parse(time);
  let formattedTime = format(time, "MMMM do, yyyy H:mm");
  
  return (
    <View style={listItemStyles.container}>
      <View style={listItemStyles.iconView}>
        <Image
          style={listItemStyles.icon}
          source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        />
      </View>
      <View style={listItemStyles.infoView}>
        <Text style={listItemStyles.listItem}>{formattedTime}</Text>
        <Text style={listItemStyles.listItem}>{description}</Text>
        <Text style={listItemStyles.listItem}>{temperature} C</Text>
        <Text style={listItemStyles.listItem}>Wind speed: {windSpeed} m/s</Text>
      </View>
    </View>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 5,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "silver",
  },
  infoView: {
    flex: 4,
    flexDirection: "column",
  },
  listItem: {
    fontSize: 16,
    "@media {min-width: 400px": {
      fontSize: 20,
    },
  },
  iconView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 70,
    width: 70,
  },
});

export default WeatherListItem;
