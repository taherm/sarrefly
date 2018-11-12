import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Col, Row, Grid } from "react-native-easy-grid";

import { Constants } from "expo";
import { Header, Button } from "react-native-elements";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: "#ecf0f1"
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
        <Header
          rightComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => this.props.navigation.openDrawer()
          }}
          centerComponent={{
            text: "Map",
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
          leftComponent={{
            icon: "keyboard-arrow-left",
            color: "#fff",
            onPress: () => this.props.navigation.goBack()
          }}
          backgroundColor="#37A8D1"
        />
        <Grid style={{ paddingTop: 30, paddingHorizontal: 30 }}>
          <Row
            style={{
              paddingHorizontal: 30,

              backgroundColor: "#FCFCFC",
              height: 80
            }}
          >
            <Col style={{ width: 240 }}>
              <Text style={{ width: 140 }}>Some Text</Text>
              <Text style={{ width: 140, fontWeight: "bold" }}>
                Some Bold Text
              </Text>
            </Col>
            <Col>
              <Text style={{ color: "#37A8D1", fontSize: 50 }}>5</Text>
              <Text>دفاق</Text>
            </Col>
          </Row>
        </Grid>
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
