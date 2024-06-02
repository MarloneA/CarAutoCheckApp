import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Image } from "@rneui/themed";

const BASE_URI = "https://source.unsplash.com/random?sig=";

const ImageAPI = () => {
  return (
    <Image
      source={require("./vin-location.png")}
      containerStyle={styles.item}
      PlaceholderContent={<ActivityIndicator />}
      resizeMode="center"
    />
  );
};

const styles = StyleSheet.create({
  item: {
    // aspectRatio: "16/9",
    width: "220%",
    // height: "100%",
    flex: 1,
    // overfloww: "visible",
  },
});

export default ImageAPI;
