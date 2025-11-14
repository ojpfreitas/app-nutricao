import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { homeIcon, metricIcon, burguerIcon, supIcon, diaryIcon } from "../../assets";
import PropTypes from "prop-types";


export default function Footer({ navigation }) {
  const icons = [homeIcon, metricIcon, burguerIcon, supIcon, diaryIcon];


  const onPressHandlers = [
    () => navigation.navigate("Home"),
    () => navigation.navigate("Anthropometry"),
    () => navigation.navigate("Home"),
    () => navigation.navigate("Store"),
    () => navigation.navigate("Diary"),
  ];

  const imageSizes = [1.2, 1.38, 1.38, 1.3, 1.4];
  const imageOffsetsX = [0, 0, 0, 3, -2];
  const imageOffsetsY = [0, 3, 0, 0, 4];

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={onPressHandlers[index]}
          style={styles.button}
        >
          <Image
            source={icon}
            style={{
              width: 40 * imageSizes[index],
              height: 40 * imageSizes[index],
              transform: [
                { translateX: imageOffsetsX[index] },
                { translateY: imageOffsetsY[index] },
              ],
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

Footer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};