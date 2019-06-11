import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import MapView from "react-native-maps";
//const origin = { latitude: 29.3770704, longitude: 47.9847947 };
//const destination = { latitude: 29.389137, longitude: 47.9809055 };
const GOOGLE_MAPS_APIKEY = "AIzaSyADsl5lDKDlF_INIJx2v_-Ke6ottuLDssQ";
import Pusher from "pusher-js/react-native";

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      origin: { latitude: 29.3770704, longitude: 47.9847947 },
      destination: {
        latitude: navigation.getParam("latitude", 29.3770704),
        longitude: navigation.getParam("longitude", 47.9847947)
      }
    };

    Pusher.logToConsole = true;

    var pusher = new Pusher("71d738b559f95f3c22c2", {
      cluster: "ap1",
      forceTLS: true
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", data => {
      this.setState({ origin: data });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: 29.377108,
            longitude: 47.984638,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker coordinate={this.state.origin} />
          <MapView.Marker coordinate={this.state.destination} />
          <MapViewDirections
            origin={this.state.origin}
            destination={this.state.destination}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
