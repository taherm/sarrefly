import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          height: 700,
          width: 500,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: 29.377108,
            longitude: 47.984638,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
export default Maps;
