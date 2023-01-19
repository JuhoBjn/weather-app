import { StyleSheet, View, Text } from "react-native";

const Header = ({ cityName }) => {
  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.headerText}>{cityName}</Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#4F5D75",
  },
  headerText: {
    padding: 5,
    textAlign: "center",
    color: "white",
    fontSize: 30,
    "@media (min-width: 400px)": {
      fontSize: 35,
    },
  },
});

export default Header;
